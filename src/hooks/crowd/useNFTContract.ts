import { useContract } from "@thirdweb-dev/react";
import { NFT_CONTRACT } from "constant/address"
import nft from "crowd-contract/artifacts/contracts/NFT.sol/NFT.json"
export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

const nftAddress = NFT_CONTRACT[CURRENT_CHAIN_ID as "0x61"]

export const useNFTContract = () => {
  const { contract } = useContract(nftAddress, nft.abi)
  return contract
}
