import { QueryOptions, TxOptions } from "../options";

export type Dispute = {
  id: string;
};

export type GetDisputeRequest = {
  id: string;
};

export type ListDisputeRequest = {
  options?: QueryOptions;
};

export type GetDisputeResponse = {
  dispute: Dispute;
};

export type ListDisputeResponse = {
  disputes: Dispute[];
};

export type RaiseDisputeRequest = {
  txOptions?: TxOptions;
};
