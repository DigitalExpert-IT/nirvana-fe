import { useContractRead } from "@thirdweb-dev/react";
import { Valhalla } from "valhalla-erc20/typechain-types/contracts/Valhalla";
import { useNirvanaContract } from "./useNirvanaContract";

type DataType = Awaited<ReturnType<Valhalla["getRegistrationFee"]>>;

export const useRegistrationFee = () => {
  const contract = useNirvanaContract();

  const { data, ...rest } = useContractRead(
    contract.contract,
    "getRegistrationFee"
  );

  return {
    data: data as undefined | DataType,
    ...rest,
  };
};
