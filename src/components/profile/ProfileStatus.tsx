import React from "react";
import { useTranslation } from "react-i18next";
import { ProfilePicture } from "./ProfilePicture";
import { AddressText } from "./AddressText";
import {
  Stack,
  Box,
  Heading,
  Text,
  useMediaQuery,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { CRWD_ADDRESS, BNB_ADDRESS, NFT_ADDRESS } from "constant/address";
import { getActiveChain } from "lib/chain";
import { createThirdwebClient } from "thirdweb";

const currentChainiId = process.env.NEXT_PUBLIC_CHAIN_ID;
const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB || "0";
const client = createThirdwebClient({
  clientId: `${CLIENT_ID}`
})
const targetChain = getActiveChain();

export const ProfileStatus = () => {
  const { t } = useTranslation();
  const crwdAddress = CRWD_ADDRESS[currentChainiId as "0x61"];
  const bnbAddress = BNB_ADDRESS[currentChainiId as "0x61"];
  const nftAddress = NFT_ADDRESS[currentChainiId as "0x61"];
  const [isLarge] = useMediaQuery("(min-width: 800px)");
  const address = useActiveAccount();
  const {data} = useWalletBalance({
    chain: targetChain,
    address: address?.address,
    client: client
  });

  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Stack w="100%" alignItems="center" justify="center">
        <ProfilePicture address={address?.address} position="relative" />
      </Stack>
      <Flex
        minW={"100%"}
        direction={{ base: "column", lg: "row" }}
        justifyContent={{ lg: "space-between", base: "center" }}
      >
        <Box minW={"50%"}>
          <Heading size="lg">{t("profile.my")}</Heading>
          <Text color="gray.500" fontSize="sm" my={2}>
            {isLarge
              ? `${t("profile.balanceCrwd")} : ` + data?.displayValue
              : `${t("profile.balanceCrwd")} : ` + data?.displayValue}
          </Text>
        </Box>

        <Box minW="100%">
          <HStack gap={"20%"}>
            <Text>BNB {t("common.address")}</Text>
            <AddressText
              shortenAddress
              boxProps={{
                color: "blue.500",
                fontSize: "sm",
                mt: "0.5rem",
              }}
            >
              {bnbAddress ?? ""}
            </AddressText>
          </HStack>
          <HStack gap={"18%"}>
            <Text>CRWD {t("common.address")}</Text>
            <AddressText
              shortenAddress
              boxProps={{
                color: "blue.500",
                fontSize: "sm",
                mt: "0.5rem",
              }}
            >
              {crwdAddress ?? ""}
            </AddressText>
          </HStack>
          <HStack gap={"20%"}>
            <Text>NFT {t("common.address")}</Text>
            <AddressText
              shortenAddress
              boxProps={{
                color: "blue.500",
                fontSize: "sm",
                mt: "0.5rem",
              }}
            >
              {nftAddress ?? ""}
            </AddressText>
          </HStack>
        </Box>
      </Flex>
    </Stack>
  );
};
