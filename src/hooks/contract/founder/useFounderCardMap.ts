import ee from "ee";
import { useEffect } from "react";
import { useContractRead } from "@thirdweb-dev/react";
import { useFounderContract } from "./useFounderContract";
import { NFTFounderLUNC } from "luncswap-solidity/typechain-types/contracts/NFTFounderLUNC";

type BaseCardType = Awaited<ReturnType<NFTFounderLUNC["cardFounder"]>>;

export const useFounderCardMap = () => {
  const founder = useFounderContract();
  const { data, ...rest } = useContractRead(founder.contract, "cardFounder");

  useEffect(() => {
    ee.addListener("founder-BuyNFTs", rest.refetch);

    return () => {
      ee.removeListener("founder-BuyNFTs", rest.refetch);
    };
  }, []);

  return { data: data as undefined | BaseCardType, ...rest };
};
