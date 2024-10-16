import { useWalletBalance } from "thirdweb/react";
import { BNB_ADDRESS } from "constant/address";
import { getActiveChain } from "lib/chain";
import { createThirdwebClient } from "thirdweb";

const currentChainiId = process.env.NEXT_PUBLIC_CHAIN_ID;
const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";
const client = createThirdwebClient({
  clientId: `${CLIENT_ID}`
})
const targetChain = getActiveChain()

export const useBnbBalance = () => {
  // const { bnbContract } = useBnbContract();
  const bnbAddress = BNB_ADDRESS[currentChainiId as "0x61"]

  const balance = useWalletBalance({
    client: client,
    address: bnbAddress,
    chain: targetChain
  })
  return balance;
}