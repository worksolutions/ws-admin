module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  moduleNameMapper: {
    "^libs/(.+)": "<rootDir>/src/libs/$1",
    "^primitives/(.+)": "<rootDir>/src/primitives/$1",
    "^store/(.+)": "<rootDir>/src/store/$1",
    "^components/(.+)": "<rootDir>/src/components/$1",
    "^api/(.+)": "<rootDir>/src/api/$1",
    "^state/(.+)": "<rootDir>/src/state/$1",
    "^types/(.+)": "<rootDir>/src/types/$1",
    "^projectLibs/(.+)": "<rootDir>/src/projectLibs/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
