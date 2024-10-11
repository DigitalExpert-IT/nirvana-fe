import "locales";
import theme from "styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { getActiveChain } from "lib/chain";
import { Text, Button, Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import type { Chain } from "@thirdweb-dev/chains";
import { ThirdwebProvider, coinbaseWallet, localWallet, metamaskWallet, safeWallet, trustWallet, useChain, useSwitchChain, useWallet, walletConnect } from "@thirdweb-dev/react";
import { t } from "i18next";

const targetChain : Chain = getActiveChain();

const ChainBanner = () => {
  const chain = useChain();
  const switchChain = useSwitchChain();
  const wallet = useWallet();
  const isConnectThroughIncorrectChain =
    wallet && chain && chain.chainId && chain?.chainId !== targetChain.chainId;

    const handleSwitchChain = () => {
      try {
        switchChain(targetChain?.chainId);
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
  const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";


  return (
    <ThirdwebProvider
      supportedChains={[targetChain]}
      supportedWallets={[
        metamaskWallet(),
        trustWallet(),
        walletConnect(),
        coinbaseWallet(),
        safeWallet(),
        localWallet(),
      ]}
      activeChain={targetChain}
      clientId={CLIENT_ID}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ChainBanner/>
    </ChakraProvider>
    </ThirdwebProvider>
  );
}
