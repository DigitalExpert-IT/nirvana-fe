import {
  useConnectedWallet,
  useConnectionStatus,
  useSetIsWalletModalOpen,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

const useClickConnectWallet = () => {
  const wallet = useConnectedWallet();
  const modal = useSetIsWalletModalOpen();
  const connectionStatus = useConnectionStatus();
  const [loading, setIsLoading] = useState(true);
  const [isAbleToTransaction, setIsAbleToTransaction] = useState(false);

  useEffect(() => {
    if (connectionStatus === "connecting") {
      setIsLoading(true);
      setIsAbleToTransaction(false);
      return;
    }

    if (!wallet && connectionStatus === "disconnected") {
      setIsLoading(false);
      setIsAbleToTransaction(false);
      return;
    }
    setIsLoading(false);
    setIsAbleToTransaction(true);
  }, [connectionStatus, wallet]);

  const showModalConnectWallet = () => {
    modal(true);
  };

  return { loading, showModalConnectWallet, isAbleToTransaction };
};

export default useClickConnectWallet;
