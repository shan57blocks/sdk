import type { PublicClient, WalletClient, Hex } from "viem";
import { createPublicClient, createWalletClient, getAddress } from "viem";

import { StoryConfig } from "../../src";
import { handleError } from "../../src/utils/errors";
import { chainStringToViemChain, parseToBigInt, waitTxAndFilterLog } from "../../src/utils/utils";
import {
  MockERC20Config,
  MockERC721Config,
  MockTokenGatedHookConfig,
} from "../integration/testABI";

export interface MintMockERC20Request {
  to: Hex;
  amount: string;
}

export interface ApproveMockERC20Request {
  spender: Hex;
  amount: string;
}

export interface AllowanceMockERC20Request {
  owner: Hex;
  spender: Hex;
}

export interface MintMockERC721Request {
  to: Hex;
  id?: bigint; // if provided, will try to mint this ID
}

export class MockAssetClient {
  private readonly wallet: WalletClient;
  private readonly rpcClient: PublicClient;
  private erc20DecimalsCached: bigint | undefined;
  public mockERC20Config = MockERC20Config;
  public mockERC721Config = MockERC721Config;
  public mockTokenGatedHookConfig = MockTokenGatedHookConfig;

  constructor(config: StoryConfig) {
    const clientConfig = {
      chain: chainStringToViemChain(config.chainId || "sepolia"),
      transport: config.transport,
    };

    this.wallet = createWalletClient({
      ...clientConfig,
      account: config.account,
    });
    this.rpcClient = createPublicClient(clientConfig);
  }

  public async erc20Decimals(): Promise<bigint> {
    try {
      if (this.erc20DecimalsCached) return this.erc20DecimalsCached;

      const { request: readDecimalsCall } = await this.rpcClient.simulateContract({
        ...this.mockERC20Config,
        functionName: "decimals",
        args: [],
        account: this.wallet.account,
      });
      this.erc20DecimalsCached = (await this.rpcClient.readContract(readDecimalsCall)) as bigint;
      return this.erc20DecimalsCached;
    } catch (error) {
      handleError(error, "Failed to read decimals from mock erc20");
    }
  }

  public async erc20Mint(request: MintMockERC20Request): Promise<{ txHash: string }> {
    try {
      const decimalAdjAmount = await this.convertAmountToDecimalAdj(request.amount);

      const { request: call } = await this.rpcClient.simulateContract({
        ...this.mockERC20Config,
        functionName: "mint",
        args: [getAddress(request.to), decimalAdjAmount],
        account: this.wallet.account,
      });

      const txHash = await this.wallet.writeContract(call);
      return { txHash };
    } catch (error) {
      handleError(error, "Failed to mint mock erc20");
    }
  }

  public async erc20Approve(request: ApproveMockERC20Request): Promise<{ txHash: string }> {
    try {
      const decimalAdjAmount = await this.convertAmountToDecimalAdj(request.amount);

      const { request: call } = await this.rpcClient.simulateContract({
        ...this.mockERC20Config,
        functionName: "approve",
        args: [getAddress(request.spender), decimalAdjAmount],
        account: this.wallet.account,
      });

      const txHash = await this.wallet.writeContract(call);
      return { txHash };
    } catch (error) {
      handleError(error, "Failed to approve mock erc20");
    }
  }

  public async erc20Allowance(request: AllowanceMockERC20Request): Promise<bigint> {
    try {
      const { request: call } = await this.rpcClient.simulateContract({
        ...this.mockERC20Config,
        functionName: "allowance",
        args: [getAddress(request.owner), getAddress(request.spender)],
        account: this.wallet.account,
      });

      return (await this.rpcClient.readContract(call)) as bigint;
    } catch (error) {
      handleError(error, "Failed to get allowance from mock erc20");
    }
  }

  private async convertAmountToDecimalAdj(amount: string): Promise<bigint> {
    // Example: 1 USDC input => in Solidity, it's represented as 1_000_000 since USDC has 6 decimals
    const expo = BigInt(10) ** BigInt(await this.erc20Decimals());
    return parseToBigInt(amount) * expo;
  }
}
