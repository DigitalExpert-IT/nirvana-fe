import "locales";
import ee from "ee";
import { t } from "i18next";
import theme from "styles/theme";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { getActiveChain } from "lib/chain";
import { ChakraProvider } from "@chakra-ui/react";
import type { Chain } from "@thirdweb-dev/chains";
import { Text, Button, Box } from "@chakra-ui/react";
import { useCrowdNetContract, useSwapContract } from "hooks";
import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  safeWallet,
  trustWallet,
  useChain,
  useSwitchChain,
  useWallet,
  walletConnect,
} from "@thirdweb-dev/react";

const targetChain: Chain = getActiveChain();

const ChainBanner = () => {
  const chain = useChain();
  const switchChain = useSwitchChain();
  const swap = useSwapContract();
  const crowdContract = useCrowdNetContract();
  const wallet = useWallet();
  const isConnectThroughIncorrectChain =
    wallet && chain && chain.chainId && chain?.chainId !== targetChain.chainId;

  const handleSwitchChain = () => {
    try {
      switchChain(targetChain?.chainId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  useEffect(() => {
    if (!crowdContract.contract || !swap.contract) return;

    const unsubscribeCrowdEvents =
      crowdContract.contract?.events?.listenToAllEvents(event => {
        ee.emit(`bullrun-${event.eventName}`, event.data);
      });

    const unsubscribeSwapEvents = swap.contract?.events?.listenToAllEvents(
      event => {
        ee.emit(`swap-${event.eventName}`, event.data);
      }
    );

    return () => {
      unsubscribeCrowdEvents();
      unsubscribeSwapEvents();
    };
  }, [crowdContract.contract]);

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
  );
};

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
      clientId={CLIENT_ID}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ChainBanner />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}
