import { useBalance } from "@thirdweb-dev/react"
import { useBnbContract } from "./useBnbContract";

export const useBnbBalance = () => {
  const { contract } = useBnbContract();
  const balance = useBalance(contract?.getAddress())
  return balance;
}