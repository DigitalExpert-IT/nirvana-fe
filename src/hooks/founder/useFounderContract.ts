import { useContract } from "@thirdweb-dev/react";
import { NFTFOUNDER_CONTRACT } from "constant/address";
import { CURRENT_CHAIN_ID } from "hooks/useAccountBalance";
import founder from "luncswap-solidity/artifacts/contracts/NFTFounderLUNC.sol/NFTFounderLUNC.json";

const contractAddress = NFTFOUNDER_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useFounderContract = () => {
  return useContract(contractAddress, founder.abi);
};
