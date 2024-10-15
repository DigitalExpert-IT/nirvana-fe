import { CRWD_CONTRACT } from "constant/address";
import { useContract } from "@thirdweb-dev/react";
import { CURRENT_CHAIN_ID } from "./useAccountBalance";
import crowd from "falcon-lite/artifacts/contracts/roi.sol/Roi.json";

const contractAddress = CRWD_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useCrowdContract = () => {
  return useContract(contractAddress, crowd.abi);
};
