import { useContractWrite } from "@thirdweb-dev/react";
import { useCrowdNetContract } from "./useCrowdNetContract";

export const useRegister = () => {
  const {contract} = useCrowdNetContract();

  const {mutateAsync, isLoading, error} = useContractWrite(
    contract, 
    "register"
  )

  return {
    mutateAsync,
    isLoading,
    error
  };
};
