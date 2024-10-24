import { useContract } from "@thirdweb-dev/react";
import { NFT_CONTRACT } from "constant/address";
import { CURRENT_CHAIN_ID } from "hooks/useAccountBalance";
import nft from "crowd-contract/artifacts/contracts/NFT.sol/NFT.json";

const contractAddress = NFT_CONTRACT[CURRENT_CHAIN_ID as "0x38"];

export const useNftCrowdContract = () => {
  return useContract(contractAddress, nft.abi);
};
