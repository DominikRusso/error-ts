/**
 * {@linkcode isError} checks whether a `Ok | Error` is an error.
 * It also performs type narrowing.
 */
export function isError<Ok>(result: Ok | Error): result is Error {
	return result instanceof Error;
}

/**
 * {@linkcode sTry} wraps a function that might throw an exception into
 * a function that returns an Error.
 *
 * Its async counterpart is {@linkcode aTry}.
 */
export function sTry<Ok>(fn: () => Ok): Ok | Error {
	try {
		const ok = fn();
		return ok;
	} catch (error) {
		if (isError(error)) {
			return error;
		}
		return Error("error", { cause: error });
	}
}

/**
 * {@linkcode aTry} wraps an async function that might throw an exception into
 * a function that returns an Error.
 *
 * Its non-async counterpart is {@linkcode sTry}.
 */
export async function aTry<Ok>(fn: () => Promise<Ok>): Promise<Ok | Error> {
	try {
		return await fn();
	} catch (error) {
		if (isError(error)) {
			return error;
		}
		return Error("error", { cause: error });
	}
}
