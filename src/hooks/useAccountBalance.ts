import { useBalance } from "@thirdweb-dev/react";
import { CRWD_CONTRACT, USDT_CONTRACT } from "constant/address";
export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

export const useAccountBalance = () => {
  const { data: balanceUSDT, isLoading: isLoadingUSDT } = useBalance(
    USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
  );
  const { data: balanceCRWD, isLoading: isLoadingCRWD } = useBalance(
    CRWD_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
  );

  return {
    balanceCRWD,
    balanceUSDT,
    isLoading: isLoadingCRWD || isLoadingUSDT,
  };
};
