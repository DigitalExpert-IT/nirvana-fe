import ee from "ee";
import { useEffect } from "react";
import { NIL_ADDRESS } from "constant/address";
import { Network } from "crowd-contract/typechain-types";
import { useContractRead, useAddress } from "@thirdweb-dev/react";
import { useCrowdNetContract } from "./useCrowdNetContract";

type AccountType = Awaited<ReturnType<Network["accounts"]>>;

export const useAccountMap = (byPassAddress?: string | null) => {
  const contract = useCrowdNetContract();
  let address = useAddress();

  if (byPassAddress) address = byPassAddress;

  const { data, ...rest } = useContractRead(contract.contract, "getAccount", [
    address ?? NIL_ADDRESS,
  ]);

  useEffect(() => {
    ee.addListener("crowd-register", rest.refetch);

    return () => {
      ee.removeListener("crowd-register", rest.refetch);
    };
  }, []);

  return {
    data: data as undefined | AccountType,
    ...rest,
  };
};
