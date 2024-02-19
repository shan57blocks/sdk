import { getAddress } from "viem";

import IERC1155ABI from "../../src/abi/json/IERC1155.abi";
import AccessControllerABI from "../../src/abi/json/AccessController.abi";
import DisputeModuleABI from "../../src/abi/json/DisputeModule.abi";
import IPAccountImplABI from "../../src/abi/json/IPAccountImpl.abi";
import IPAssetRegistryABI from "../../src/abi/json/IIPAssetRegistry.abi";
import LicensingModuleABI from "../../src/abi/json/LicensingModule.abi";
import PILPolicyFrameworkManagerABI from "../../src/abi/json/PILPolicyFrameworkManager.abi";
import RegistrationModuleABI from "../../src/abi/json/RegistrationModule.abi";
import TaggingModuleABI from "../../src/abi/json/TaggingModule.abi";
import ErrorsABI from "../../src/abi/json/Errors.abi";
// mocks
import MockERC20ABI from "../../src/abi/json/mock/MockERC20.abi";
import MockERC721ABI from "../../src/abi/json/mock/MockERC721.abi";
import MockTokenGatedHookABI from "../../src/abi/json/mock/MockTokenGatedHook.abi";

export const tenderly = {
  AccessController: "0xECED813674F6aaa8961c6661d2d0EC59Cd6dA553",
  AncestorsVaultLAP: "0x30b3B575086F9Cc9B82E14673d134C48C0195E94",
  ArbitrationPolicySP: "0x507660BFB2840Ff7fE821110Faa7c3De0300a5Ac",
  DisputeModule: "0x6d4414b09168579f27FE0f1B1484f81938e6Df2a",
  Governance: "0x6CA8FEc96E14A1E3A2227e7B68Fa7a0D1e9452Ec",
  IPAccountImpl: "0x42f5Ae8BD9b2494c275009E89E57AE7977490719",
  IPAccountRegistry: "0x28E5fE0F0E8364d5aa8059D47281767309A0C7fB",
  IPAssetRegistry: "0xa3Bc908E70A1645Ef05409Eb6f8Ec378210651C9",
  IPAssetRenderer: "0x9CBB4ADd6Be174c0fC3e79D383623e05b606dCeC",
  IPMetadataProvider: "0x6E41e3B3A13E76813272F4e200d51dc21a84A72C",
  IPResolver: "0x14576E76B4D3b1328dD5C1a139f2E5a262D122Df",
  LicenseRegistry: "0xeD1291E52FE66b3ec232B480Ea1cD38d1595E075",
  LicensingModule: "0xe94265E06c80c2b3B03E382c51d46C551AD109ae",
  MockERC20: "0x15A7953dB6ec6E28ED81D1d2fAC4947A615F3783",
  MockERC721: "0x53196026078E2094Bc7db8408e2164ca442AC038",
  MockTokenGatedHook: "0x3B7c3A431Ebb3C86A85c205A9752461490Bcd990",
  ModuleRegistry: "0x5e4383E21BB7db74aaE09B85376E9ce0eacD2D65",
  PILPolicyFrameworkManager: "0xDD601bd922a3Fbb847f9b8696128ba1cF51A3a87",
  RegistrationModule: "0xadf96Ec7Ccd16AE43B8270A842f2735809954Ae9",
  RoyaltyModule: "0xA0F85f08267217aB36a323A54AD70eF91C3F0439",
  RoyaltyPolicyLAP: "0xF14656420100c6FeEf7539dEB24fef65505AEbb5",
  TaggingModule: "0x246A2B421A69A58Bc73358942fbCEdD3CD095b6C",
};

export const IPAccountABI = [...IPAccountImplABI, ...ErrorsABI];

export const IPAssetRegistryConfig = {
  abi: IPAssetRegistryABI,
  address: getAddress(tenderly.IPAssetRegistry),
};

export const AccessControllerConfig = {
  abi: [...AccessControllerABI, ...ErrorsABI],
  address: getAddress(tenderly.AccessController),
};

export const DisputeModuleConfig = {
  abi: [...DisputeModuleABI, ...ErrorsABI],
  address: getAddress(tenderly.DisputeModule),
};

export const LicenseRegistryConfig = {
  abi: IERC1155ABI,
  address: getAddress(tenderly.LicenseRegistry),
};

export const LicensingModuleConfig = {
  abi: LicensingModuleABI,
  //abi: [...LicensingModuleABI, ...ErrorsABI],
  address: getAddress(tenderly.LicensingModule),
};

export const RegistrationModuleConfig = {
  abi: RegistrationModuleABI,
  //abi: [...RegistrationModuleABI, ...ErrorsABI],
  address: getAddress(tenderly.RegistrationModule),
};

export const TaggingModuleConfig = {
  abi: [...TaggingModuleABI, ...ErrorsABI],
  address: getAddress(tenderly.TaggingModule),
};

export const PILPolicyFrameworkManagerConfig = {
  abi: PILPolicyFrameworkManagerABI,
  //abi: [...PILPolicyFrameworkManagerABI, ...ErrorsABI],
  address: getAddress(tenderly.PILPolicyFrameworkManager),
};

export const MockERC20Config = {
  abi: MockERC20ABI,
  address: getAddress(tenderly.MockERC20),
};

export const MockERC721Config = {
  abi: MockERC721ABI,
  address: getAddress(tenderly.MockERC721),
};

export const MockTokenGatedHookConfig = {
  abi: MockTokenGatedHookABI,
  address: getAddress(tenderly.MockTokenGatedHook),
};
