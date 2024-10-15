import { SWAP_CONTRACT } from "constant/address";
import swap from "falcon-lite/artifacts/contracts/Swap.sol/Swap.json";
import { useContract } from "@thirdweb-dev/react";
import { CURRENT_CHAIN_ID } from "./useAccountBalance";

const contractAddress = SWAP_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useSwapContract = () => {
  return useContract(contractAddress, swap.abi);
};
