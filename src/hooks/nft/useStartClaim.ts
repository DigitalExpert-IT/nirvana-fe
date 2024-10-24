import { useContractRead } from "@thirdweb-dev/react";
import { useNftCrowdContract } from "./useNftCrowdContract";


export const useStartClaim = () => {
    const { contract } = useNftCrowdContract()
    const {data: isStartClaim, ...rest} = useContractRead(contract, "isStartedClaim")


  return {isStartClaim, ...rest}
};
