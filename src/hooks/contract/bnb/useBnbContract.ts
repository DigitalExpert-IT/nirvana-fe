import { useBalance } from "@thirdweb-dev/react"
import { BNB_ADDRESS } from "constant/address";

const currentChainiId = process.env.NEXT_PUBLIC_CHAIN_ID;

export const useBnbBalance = () => {
  // const { bnbContract } = useBnbContract();
  const bnbAddress = BNB_ADDRESS[currentChainiId as "0x61"]

  const balance = useBalance(bnbAddress)
  return balance;
}