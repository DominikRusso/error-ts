import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		isolate: false,
		coverage: {
			include: ["src/**"],
			exclude: ["**/index.ts"],
			thresholds: {
				100: true,
			},
		},
	},
});
