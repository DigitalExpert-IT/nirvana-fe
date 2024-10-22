import { useContractWrite } from "@thirdweb-dev/react";
import { useNftCrowdContract } from "./useNftCrowdContract";
import { useAsyncCall } from "hooks/useAsyncCall";
import { useTranslation } from "react-i18next";

export const useGrindNFT = () => {
  const { t } = useTranslation();
  const { contract } = useNftCrowdContract();
  const { mutateAsync } = useContractWrite(contract, "grindingCard");

  const claim = useAsyncCall(mutateAsync, t("form.message.claimSuccess"));

  return { claim };
};

