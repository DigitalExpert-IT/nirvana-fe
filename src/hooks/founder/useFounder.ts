import { useFounderContract } from "./useFounderContract";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { useUSDTContract } from "hooks/useUSDTContract";

export const useFounder = () => {
  const address = useAddress();
  const usdt = useUSDTContract();
  const founder = useFounderContract();
  const buyNft = useContractWrite(founder.contract, "buyNFTs");
  const approveUSDT = useContractWrite(usdt.contract, "increaseAllowance");

  const buyFounder = async (amount: number) => {
    if (!usdt.contract || !founder.contract || !address) return;
    const card = await founder.contract!.call("cardFounder");
    const cardPrice = card.price * amount;
    const usdtBalance = await usdt.contract!.call("balanceOf", [address]);
    const allowance = await usdt.contract!.call("allowance", [
      address,
      founder.contract.getAddress(),
    ]);

    if (cardPrice > usdtBalance) {
      throw {
        code: "NotEnoughUsdtBalance",
      };
    }

    if (card.price.gt(allowance)) {
      await approveUSDT.mutateAsync({
        args: [founder.contract.getAddress(), cardPrice.toString()],
      });
    }

    const receipt = await buyNft.mutateAsync({ args: [amount] });
    return receipt;
  };

  return {
    buyFounder,
  };
};
