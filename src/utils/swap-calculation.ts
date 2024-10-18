import { toBn } from "evm-bn";

export const getUsdtRate = (usdtAmount: string) => {
  const ratePerGnet = toBn("1", 18).div(100); // 0.01 USDT
  const formatAmount = toBn(usdtAmount, 18);
  const unit = toBn("1", 18);
  const fldAmount = formatAmount.mul(unit).div(ratePerGnet);

  return fldAmount;
};

export const getCrwdRate = (crowdAmount: string) => {
  const usdtAmount = toBn(crowdAmount, 18)
    .mul(toBn("1", 18))
    .div(toBn("100", 18));

  return usdtAmount;
};
