import { useBalance } from "@thirdweb-dev/react";
import { CRWDTOKEN_CONTRACT, USDT_CONTRACT } from "constant/address";

export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x61") as "0x61";

export const useAccountBalance = () => {
  const { data: balanceUSDT, isLoading: isLoadingUSDT } = useBalance(
    USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
  );

  const { data: balanceCRWD, isLoading: isLoadingCRWD } = useBalance(
    CRWDTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
  );

  return {
    balanceCRWD,
    balanceUSDT,
    isLoading: isLoadingCRWD || isLoadingUSDT,
  };
};
