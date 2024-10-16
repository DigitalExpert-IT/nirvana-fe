import { useWalletBalance } from "thirdweb/react";
import { CRWD_ADDRESS, USDT_ADDRESS } from "constant/address";
export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

export const useAccountBalance = () => {
  const { data: balanceUSDT, isLoading: isLoadingUSDT } = useWalletBalance(
    USDT_ADDRESS[CURRENT_CHAIN_ID as "0x38"]
  );
  const { data: balanceCRWD, isLoading: isLoadingCRWD } = useWalletBalance(
    CRWD_ADDRESS[CURRENT_CHAIN_ID as "0x38"]
  );

  return {
    balanceCRWD,
    balanceUSDT,
    isLoading: isLoadingCRWD || isLoadingUSDT,
  };
};
