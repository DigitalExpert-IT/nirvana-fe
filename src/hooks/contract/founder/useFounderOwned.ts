import ee from "ee";
import { fromBn } from "evm-bn";
import { useEffect, useState } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useFounderContract } from "hooks";
import { NFTFounderLUNC } from "luncswap-solidity/typechain-types/contracts/NFTFounderLUNC";

type BaseCardType = Awaited<ReturnType<NFTFounderLUNC["nftFounder"]>>;
type NFTOwnedType = BaseCardType & {
  nftReward: number;
};

export const useFounderOwned = () => {
  const [data, setData] = useState<NFTOwnedType>();
  const [isInitialize, setIsInitialize] = useState(false);
  const address = useAddress() ?? null;
  const founder = useFounderContract();
  const claimReward = useContractWrite(founder.contract, "claimRewards");

  const init = async () => {
    setIsInitialize(true);
    await fetch();
    setIsInitialize(false);
  };

  const fetch = async () => {
    if (!founder.contract) return;
    const nftFounderOwned = await founder.contract!.call("nftFounder", [
      address,
    ]);
    const nftRewards = await founder.contract.call("myNftRewards", [address]);
    setData({
      ...nftFounderOwned,
      nftReward: fromBn(nftRewards, 6),
    });
  };

  const claimRewardAsync = async () => {
    if (data?.nftReward == 0) {
      throw {
        code: "NoReward",
      };
    }
    const claimAsync = await claimReward.mutateAsync({});
    return claimAsync;
  };

  useEffect(() => {
    if (!address) return;
    init();
    ee.addListener("valhalla-Register", fetch);

    return () => {
      ee.removeListener("valhalla-Register", fetch);
    };
  }, [address, founder.contract]);

  return { data, isInitialize, fetch, claimRewardAsync };
};
