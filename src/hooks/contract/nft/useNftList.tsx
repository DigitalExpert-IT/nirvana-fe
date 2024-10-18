import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { FalconDefi } from "falcon-lite/typechain-types";
import {
  useNftCrowdContract,
  useCrowdTokenContract,
  useAccountMap,
} from "hooks";

type BaseCardType = Awaited<ReturnType<FalconDefi["list"]>>;
type NFTType = BaseCardType & {
  id: BigNumber;
};

export const useNftList = () => {
  const address = useAddress();
  const crowd = useCrowdTokenContract();
  const account = useAccountMap();
  const nft = useNftCrowdContract();
  const nftBuyWith = useContractWrite(nft.contract, "buyNftWith");
  const approveCrowd = useContractWrite(crowd.contract, "approve");
  const [data, setData] = useState<NFTType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!nft.contract) return;

    try {
      const nftList = await Promise.all(
        new Array(6).fill(null).map(async (_, cardId) => {
          const nftItem = await nft.contract!.call("list", [cardId]);
          return {
            ...nftItem,
            id: BigNumber.from(cardId),
          };
        })
      );
      setData(nftList);
    } catch (error) {
      console.log("Error fetching NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (addressToken: string, listId: number) => {
    if (!address || !nft.contract || !crowd.contract) return;
    const card = data[listId];
    const cardPrice = card.price;
    const crowdBalance = await crowd.contract?.call("balanceOf", [address]);
    const allowanceCrowd = await crowd.contract?.call("allowance", [
      address,
      nft.contract.getAddress(),
    ]);

    if (!account.data?.isRegistered) {
      throw {
        code: "RegistrationRequired",
      };
    }

    if (cardPrice.gt(crowdBalance)) {
      throw {
        code: "NotEnoughWangBalance",
      };
    }

    if (cardPrice.gte(allowanceCrowd)) {
      await approveCrowd.mutateAsync({
        args: [nft.contract?.getAddress(), cardPrice.mul(10)],
      });
    }

    const receipt = await nftBuyWith.mutateAsync({
      args: [addressToken, listId],
    });
    return receipt;
  };

  useEffect(() => {
    fetchData();
  }, [nft.contract]);

  return {
    isLoading: isLoading || nft.isLoading,
    data,
    buy,
  };
};
