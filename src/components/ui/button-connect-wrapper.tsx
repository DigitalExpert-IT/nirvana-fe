import { ButtonProps } from "@chakra-ui/react";
import { createThirdwebClient } from "thirdweb";
import { useConnectedWallets, ConnectButton } from "thirdweb/react";

type Props = ButtonProps & {
  children?: React.ReactElement;
};

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";


export const ButtonConnectWrapper = (props: Props) => {
  const client = createThirdwebClient({
    clientId: `${CLIENT_ID}`
  })
  const wallet = useConnectedWallets();
  if (wallet) return props.children ?? null;
  return <ConnectButton client={client} theme="dark" />;
};
