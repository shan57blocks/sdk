import { Abi } from "viem";
import { defineConfig } from "@wagmi/cli";
import { actions, react } from "@wagmi/cli/plugins";

import { abi as ipAccountRegistryAbi } from "../protocol-core/out/IIPAccountRegistry.sol/IIPAccountRegistry.json";
import { abi as registrationModuleAbi } from "../protocol-core/out/RegistrationModule.sol/RegistrationModule.json";

export default defineConfig({
  out: "src/generated/generated.ts",
  contracts: [
    {
      name: "IPAccountImpl",
      abi: ipAccountRegistryAbi as Abi,
    },
    {
      name: "RegistrationModule",
      abi: registrationModuleAbi as Abi,
    },
  ],
  // plugins: [actions()],
  plugins: [actions(), react()],
});

// export default defineConfig({
//   out: "lib/generated.ts",
//   plugins: [
//     foundry({
//       project: "../protocol-core",
//       exclude: ["../protocol-core/lib/reference/src/interfaces/**"],
//     }),
//     actions({
//       getActionName({ contractName, type }) {
//         return `${contractName}__${type}`;
//       },
//     }),
//   ],
// });
