import { AxiosInstance } from "axios";
import { PublicClient } from "viem";

// import { handleError } from "../utils/errors";
// import {
//   GetDisputeRequest,
//   GetDisputeResponse,
//   ListDisputeRequest,
//   ListDisputeResponse,
// } from "../types/resources/dispute";

/**
 * DisputeReadOnlyClient allows you to view and search IP Assets on Story Protocol.
 */
export class DisputeReadOnlyClient {
  protected readonly httpClient: AxiosInstance;
  protected readonly rpcClient: PublicClient;

  constructor(httpClient: AxiosInstance, rpcClient: PublicClient) {
    this.httpClient = httpClient;
    this.rpcClient = rpcClient;
  }

  /**
   * Get disputes.
   *
   * @returns the response object that contains results from get tag query.
   */
  // public get(request: GetDisputeRequest): Promise<GetDisputeResponse> {
  //   try {
  //     // const response = await this.httpClient.get(`/disputes/${request.id}`);
  //     // return response.data as GetDisputeResponse;
  //     return { dispute: { id: request.id } } as GetDisputeResponse;
  //   } catch (error) {
  //     handleError(error, "Failed to get disputes.");
  //   }
  // }
  /**
   * List disputes.
   *
   * @returns the response object that contains results from list disputes query.
   */
  // public async list(request?: ListDisputeRequest): Promise<ListDisputeResponse> {
  //   try {
  //     // const response = await this.httpClient.post(`/disputes`, request || {});
  //     // return response.data as ListDisputeResponse;
  //     return {} as ListDisputeResponse;
  //   } catch (error) {
  //     handleError(error, "Failed to list disputes.");
  //   }
  // }
}
