import { SWAP_CONTRACT } from "constant/address";
import { useContract } from "@thirdweb-dev/react";
import { CURRENT_CHAIN_ID } from "./useAccountBalance";
import swap from "crowd-contract/artifacts/contracts/Swap.sol/Swap.json";

const contractAddress = SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useSwapContract = () => {
  return useContract(contractAddress, swap.abi);
};
