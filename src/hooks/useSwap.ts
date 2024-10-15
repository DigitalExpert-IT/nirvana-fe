import ee from "ee";
import { fromBn } from "evm-bn";
import { useEffect } from "react";
import { BigNumber } from "ethers";
import { SWAP_CONTRACT } from "constant/address";
import { useUSDTContract } from "./useUSDTContract";
import { useSwapContract } from "./useSwapContract";
import { useCrowdContract } from "./useCrowdContract";
import { CURRENT_CHAIN_ID, useAccountBalance } from "./useAccountBalance";

export const useSwap = () => {
  const {
    contract: Crowd,
    refetch: refetchCrowd,
    isInitialLoading: isLoadingCrowd,
    isRefetching: isRefetchingCrowd,
  } = useCrowdContract();
  const {
    contract: usdt,
    refetch: refetchUSDT,
    isInitialLoading: isLoadingUSDT,
    isRefetching: isRefetchingUSDT,
  } = useUSDTContract();
  const { contract: swap, isInitialLoading: isLoadingSwap } = useSwapContract();

  const refetch = async () => {
    refetchCrowd();
    refetchUSDT();
  };

  useEffect(() => {
    ee.addListener("swap-SwapToken", refetch);

    return () => {
      ee.removeListener("swap-SwapToken", refetch);
    };
  }, [swap]);

  const {
    balanceCRWD,
    balanceUSDT,
    isLoading: isLoadingAccountBalance,
  } = useAccountBalance();

  const approveUSDT = async (amount: BigNumber) => {
    if (!usdt || !balanceUSDT) return;
    const allowance = await usdt.erc20.allowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
    );
    if (balanceUSDT.value.lt(amount)) {
      throw {
        code: "NotEnoughBalance",
      };
    }
    if (allowance.value.gt(amount)) return;
    const tx = await usdt.erc20.setAllowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"],
      fromBn(amount.mul(10), 18)
    );
    return tx.receipt;
  };

  const approveCrowd = async (amount: BigNumber) => {
    if (!Crowd || !balanceCRWD) return;
    const allowance = await Crowd.erc20.allowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"]
    );
    if (balanceCRWD.value.lt(amount)) {
      throw {
        code: "NotEnoughBalance",
      };
    }
    if (allowance.value.gt(amount)) return;
    const tx = await Crowd.erc20.setAllowance(
      SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"],
      fromBn(amount.mul(10), 18)
    );
    return tx.receipt;
  };

  const swapCrowd = async (amount: BigNumber) => {
    await approveUSDT(amount);
    const tx = await swap?.call("swapToCrowd", [amount]);
    return tx;
  };

  const swapUSDT = async (amount: BigNumber) => {
    await approveCrowd(amount);
    const tx = await swap?.call("swapToUSDT", [amount]);
    return tx;
  };

  return {
    swapCrowd,
    swapUSDT,
    isInitializing:
      isLoadingCrowd &&
      isLoadingSwap &&
      isLoadingUSDT &&
      isLoadingAccountBalance &&
      isRefetchingCrowd &&
      isRefetchingUSDT,
  };
};
