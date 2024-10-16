import "locales";
import theme from "styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { getActiveChain } from "lib/chain";
import { Text, Button, Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { type Chain } from "thirdweb";
import { ThirdwebProvider, useSwitchActiveWalletChain, useActiveWalletChain, useActiveWallet } from "thirdweb/react";
import { t } from "i18next";

const targetChain : Chain = getActiveChain();

const ChainBanner = () => {
  const chain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const wallet = useActiveWallet();
  const isConnectThroughIncorrectChain =
    wallet && chain && chain.id && chain?.id !== targetChain.id;

    const handleSwitchChain = () => {
      try {
        switchChain(targetChain);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    };


  return (
    <>
    {isConnectThroughIncorrectChain ? (
      <Box
        bg="gray.800"
        w="full"
        py="4"
        textAlign="center"
        position="fixed"
        bottom="0"
        left="0"
        zIndex={99999}
      >
        <Text textAlign="center">
          {t("common.banner.invalidChainMessage")}
        </Text>{" "}
        <Button onClick={handleSwitchChain} mt="2">
          {t("common.banner.switchChain", { name: targetChain?.name })}
        </Button>
      </Box>
    ) : null}
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {


  return (
    <ThirdwebProvider>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ChainBanner/>
    </ChakraProvider>
    </ThirdwebProvider>
  );
}
