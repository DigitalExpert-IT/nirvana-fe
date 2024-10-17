import { CRWDNET_CONTRACT } from "constant/address";
import { useContract } from "@thirdweb-dev/react";
import { CURRENT_CHAIN_ID } from "./useAccountBalance";
import crowd from "falcon-lite/artifacts/contracts/roi.sol/Roi.json";

const contractAddress = CRWDNET_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useCrowdNetContract = () => {
  return useContract(contractAddress, crowd.abi);
};
