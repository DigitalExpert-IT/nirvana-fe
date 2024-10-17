import { useContract } from "@thirdweb-dev/react";
import { NFTFOUNDER_CONTRACT } from "constant/address";
import founder from "luncswap-solidity/artifacts/contracts/NFTFounderLUNC.sol/NFTFounderLUNC.json";

export const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID ||
  "0x38") as "0x38";

const contractAddress = NFTFOUNDER_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useFounderContract = () => {
  return useContract(contractAddress, founder.abi);
};
