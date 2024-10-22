import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { FalconDefi } from "falcon-lite/typechain-types";
import { useNftCrowdContract } from "hooks";
import { useAccountMap, useCrowdTokenContract } from "../crowd";

type BaseCardType = Awaited<ReturnType<FalconDefi["list"]>>;
type NFTType = BaseCardType & {
  id: BigNumber;
};

export const useCardList = () => {
  const address = useAddress();
  const crowd = useCrowdTokenContract();
  const account = useAccountMap();
  const nft = useNftCrowdContract();
  const nftBuy = useContractWrite(nft.contract, "buyCard");
  const approveCrowd = useContractWrite(crowd.contract, "approve");
  const [data, setData] = useState<NFTType[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!nft.contract) return;

    try {
      const nftList = await Promise.all(
        new Array(6).fill(null).map(async (_, cardId) => {
          const nftItem = await nft.contract!.call("cardMap", [cardId]);
          return {
            ...nftItem,
            id: BigNumber.from(cardId),
          };
        }),
      );
      setData(nftList);
    } catch (error) {
      console.log("Error fetching NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (listId: number) => {
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
        code: "NotEnoughBalance",
      };
    }

    if (cardPrice.gte(allowanceCrowd)) {
      await approveCrowd.mutateAsync({
        args: [nft.contract?.getAddress(), cardPrice.mul(10)],
      });
    }

    const receipt = await nftBuy.mutateAsync({
      args: [listId],
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
