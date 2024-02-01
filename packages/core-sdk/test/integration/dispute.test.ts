import { expect } from "chai";
import { StoryClient, StoryConfig, Client } from "../../src";
import { Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

describe("Dispute Functions", () => {
  let client: Client;
  let senderAddress: string;

  before(function () {
    const config: StoryConfig = {
      transport: http(process.env.RPC_PROVIDER_URL),
      account: privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as Hex),
    };

    senderAddress = config.account.address;
    client = StoryClient.newClient(config);
  });

  describe("Whitelist Dispute Tags", async function () {
    it.only("should be able to whitelist dispute tags and wait for transaction", async () => {
      const res = await client.dispute.whitelistDisputeTags({
        tag: "testTag",
        allowed: true,
        txOptions: {
          waitForTransaction: true,
        },
      });
      console.log("response", res);
      expect(response.txHash).to.be.a("string");
      expect(response.txHash).not.empty;
    });
  });
});
