import { createJsWithTsPreset, type JestConfigWithTsJest } from "ts-jest"

const presetConfig = createJsWithTsPreset({
	//...options
})

console.log(presetConfig)

module.exports = {
	...presetConfig,
	testEnvironment: "node",
	transform: {
		// "^.+.tsx?$": ["ts-jest", {}],//
	},
	preset: "ts-jest",
	setupFilesAfterEnv: ["./src/test/setup.ts"],
	moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
	collectCoverage: true,
	collectCoverageFrom: ["**/*.{ts,js}", "!**/node_modules/**", "!**/build/**", "!**/coverage/**"],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	coverageReporters: ["text", "text-summary"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)x?$",
	testPathIgnorePatterns: ["/node_modules/", "/build/", "/coverage/"],
} as JestConfigWithTsJest
