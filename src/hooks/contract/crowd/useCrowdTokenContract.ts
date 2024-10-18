import { CURRENT_CHAIN_ID } from "..";
import { useContract } from "@thirdweb-dev/react";
import { CRWDTOKEN_CONTRACT } from "constant/address";
import crowd from "crowd-contract/artifacts/contracts/Crowd.sol/Crowd.json";

const contractAddress = CRWDTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useCrowdTokenContract = () => {
  return useContract(contractAddress, crowd.abi);
};
