import { describe, it, expect } from "vitest";
import { sTry, aTry, isError } from "./error.js";

describe("isError", () => {
	it("should return true for an error", () => {
		const result: number | Error = new Error("failed");
		expect(isError(result)).toBe(true);
	});
	it("should return false for a non-error result", () => {
		const result: number | Error = 42;
		expect(isError(result)).toBe(false);
	});
});

describe("sTry", () => {
	it("should return the result of a successful function call", () => {
		const fn = () => 42;
		const result = sTry(fn);
		expect(result).toBe(42);
	});

	it("should return an error if the function throws an error", () => {
		const fn = () => {
			throw Error("failed");
		};
		const result = sTry(fn);

		expect(isError(result)).toBe(true);
	});

	it("should return an error if the function throws a non-error", () => {
		const fn = (): number => {
			throw "a string";
		};
		const result = sTry(fn);

		expect(isError(result)).toBe(true);
		if (!isError(result)) {
			// explicit narrowing
			throw "unreachable";
		}
		expect(result).toEqual(Error("caught non-Error"));
		expect(result.cause).toEqual("a string");
	});
});

describe("aTry", () => {
	it("should return the result of a successful function call", async () => {
		const fn = async () => 42;
		const result = await aTry(fn);

		expect(result).toBe(42);
	});

	it("should return an error if the function throws an error", async () => {
		const fn = async (): Promise<number> => {
			throw Error("failed");
		};
		const result = await aTry(fn);

		expect(isError(result)).toBe(true);
	});

	it("should return an error if the function throws a non-error", async () => {
		const fn = async (): Promise<number> => {
			throw "a string";
		};
		const result = await aTry(fn);

		expect(isError(result)).toBe(true);
		if (!isError(result)) {
			// explicit narrowing
			throw "unreachable";
		}
		expect(result).toEqual(Error("caught non-Error"));
		expect(result.cause).toEqual("a string");
	});

	it("should return an error if the function rejects", async () => {
		const fn = async (): Promise<number> => {
			return Promise.reject("rejection");
		};
		const result = await aTry(fn);

		expect(isError(result)).toBe(true);
		if (!isError(result)) {
			// explicit narrowing
			throw "unreachable";
		}
		expect(result).toEqual(Error("caught non-Error"));
		expect(result.cause).toEqual("rejection");
	});
});
