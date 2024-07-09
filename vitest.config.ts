import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		isolate: false,
		coverage: {
			include: ["src/**"],
			exclude: ["**/index.ts", ...coverageConfigDefaults.exclude],
			thresholds: {
				100: true,
			},
		},
	},
});
