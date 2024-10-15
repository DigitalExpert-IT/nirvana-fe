import { toBn } from "evm-bn";

export const getUsdtRate = (usdtAmount: string) => {
  const ratePerGnet = toBn("1", 18);
  const formatAmount = toBn(usdtAmount, 18);
  const unit = toBn("1", 18);
  const fldAmount = formatAmount.mul(unit).div(ratePerGnet);

  return fldAmount;
};

export const getCrwdRate = (fldAmount: string) => {
  const ratePerUsdt = toBn("1", 18);
  const unit = toBn("1", 18);
  const ratePerUnit = ratePerUsdt.div(unit);
  const usdtAmount = toBn(fldAmount, 18).div(ratePerUnit);

  return usdtAmount;
};
