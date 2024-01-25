import { defineConfig } from "@wagmi/cli";
import { actions, foundry } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "lib/generated.ts",
  plugins: [
    foundry({
      project: "../protocol-core",
      exclude: ["../protocol-core/lib/reference/src/interfaces/**"],
    }),
    actions({
      getActionName({ contractName, type }) {
        return `${contractName}__${type}`;
      },
    }),
  ],
});
