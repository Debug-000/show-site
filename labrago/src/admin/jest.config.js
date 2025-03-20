// jest.config.js
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        '^.+\\.ts?$': ['ts-jest', {
            tsconfig: './tsconfig.jest.json', // Use the custom tsconfig for Jest
        }],
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: './tsconfig.jest.json', // Use the custom tsconfig for Jest
        }],
        '^.+\\.js?$': ['babel-jest', {
            configFile: './babel-jest.config.json'
        }],
        '^.+\\.jsx?$': ['babel-jest', {
            configFile: './babel-jest.config.json'
        }],
        '^.+\\.css$': 'jest-scss-transform'
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    transformIgnorePatterns: ["node_modules/(?!change-case|@mui/material/utils|ssr-window|dom7).*/"]
}