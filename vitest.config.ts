import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		isolate: false,
		coverage: {
			include: ["src/**"],
			exclude: ["**/index.ts"],
			ignoreEmptyLines: true,
			thresholds: {
				100: true,
			},
		},
	},
});
