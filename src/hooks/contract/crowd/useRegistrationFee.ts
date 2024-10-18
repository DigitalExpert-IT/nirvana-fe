import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types/contracts/Valhalla";
import { useCrowdNetContract } from "./useCrowdNetContract";

type DataType = Awaited<ReturnType<Valhalla["getRegistrationFee"]>>;

export const useRegistrationFee = () => {
  const contract = useCrowdNetContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getRegistrationFee"
  );

  return {
    data: data as undefined | DataType,
    ...rest,
  };
};
