module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    EXPERIMENTAL_useProjectService: true,
  },
  extends: ["@story-protocol/eslint-config"],
};
