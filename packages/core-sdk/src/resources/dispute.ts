import { AxiosInstance } from "axios";
import { PublicClient, WalletClient } from "viem";
import { Config } from "@wagmi/core";

import { handleError } from "../utils/errors";
import {
  simulateDisputeModuleRaiseDispute,
  simulateDisputeModuleWhitelistArbitrationPolicy,
  simulateWhitelistDisputeTags,
  writeWhitelistDisputeTags,
} from "../generated/disputeModule";
import { DisputeReadOnlyClient } from "./disputeReadOnly";
import { RaiseDisputeRequest } from "../types/resources/dispute";
import { TxOptions } from "../types/options";

export class DisputeClient extends DisputeReadOnlyClient {
  private readonly wallet: WalletClient;
  private readonly wagmiConfig: Config;

  constructor(
    httpClient: AxiosInstance,
    rpcClient: PublicClient,
    wallet: WalletClient,
    wagmiConfig: Config,
  ) {
    super(httpClient, rpcClient);
    this.wallet = wallet;
    this.wagmiConfig = wagmiConfig;
  }

  public async raiseDispute(request: RaiseDisputeRequest): Promise<RaiseDisputeResponse> {
    try {
      const { request: call } = await simulateDisputeModuleRaiseDispute(this.wagmiConfig, [
        request.tag,
        request.ipId,
      ]);
      console.log(call);
      const txHash = await this.wallet.writeContract(call);

      return { txHash: txHash };
    } catch (error) {
      handleError(error, "Failed to set tag");
    }
  }

  public async whitelistPolicy(request: WhitelistPolicyRequest): Promise<WhitelistPolicyResponse> {
    try {
      const { request: call } = await this.rpcClient.simulateContract({
        ...TaggingModuleConfig,
        functionName: "whitelistPolicy",
        args: [request.tag, request.allowed],
      });

      const txHash = await this.wallet.writeContract(call);

      return { txHash: txHash };
    } catch (error) {
      handleError(error, "Failed to set tag");
    }
  }

  public async whitelistDisputeTags(
    request: WhitelistDisputeTagsRequest,
  ): Promise<WhitelistPolicyResponse> {
    try {
      const simulateResults = await writeWhitelistDisputeTags(this.wagmiConfig, [
        request.tag,
        request.allowed,
      ]);
      // const simulateResults = await simulateWhitelistDisputeTags(this.wagmiConfig, [
      //   request.tag,
      //   request.allowed,
      // ]);
      const txHash = await this.wallet.writeContract(simulateResults.call);

      return { txHash: txHash };
    } catch (error) {
      handleError(error, "Failed to whitelist dispute tags");
    }
  }
}

type WhitelistPolicyRequest = {
  arbitrationPolicy: `0x${string}`;
  allowed: boolean;
  txOptions?: TxOptions;
};

type WhitelistPolicyResponse = {
  txHash: string;
};

type WhitelistDisputeTagsRequest = {
  tag: string;
  allowed: boolean;
  txOptions?: TxOptions;
};
