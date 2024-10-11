import { BNB_ADDRESS } from "constant/address";
import { getActiveChain } from "lib/chain";
import { useContract } from "@thirdweb-dev/react"

const ACTIVE_CHAIN = getActiveChain() as "0x61";

export const useBnbContract = () => {
  const bnbContract = useContract(BNB_ADDRESS[ACTIVE_CHAIN])
  return bnbContract;
}