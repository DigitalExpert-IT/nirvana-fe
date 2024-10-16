import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ConnectButton, useConnectModal, useConnectedWallets } from "thirdweb/react";
import { getActiveChain } from "lib/chain";
import { createThirdwebClient } from "thirdweb";

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";

const client = createThirdwebClient({
  clientId: `${CLIENT_ID}`
})

const targetChain = getActiveChain()

const WalletButton = () => {
  const { t } = useTranslation();
  const { connect } = useConnectModal();
  const wallet = useConnectedWallets();

  if (wallet) return <ConnectButton chain={targetChain}  client={client}/>;

  const handleConnect = async () => {
    const wallet = await connect({ client }); // opens the connect modal
    console.log("connected to", wallet);
  }

  return (
    <Button
      as={"button"}
      background={"#9321DD"}
      color={"white"}
      _hover={{ bg: "#61089c" }}
      fontSize={"md"}
      borderRadius={"50px"}
      fontWeight={"400"}
      onClick={() => handleConnect()}
    >
      {t("common.connectWallet")}
    </Button>
  );
};

export default WalletButton;
