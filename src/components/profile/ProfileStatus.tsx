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
import { useAddress, useBalance } from "@thirdweb-dev/react";
import { CRWD_CONTRACT, BNB_ADDRESS, NFT_CONTRACT } from "constant/address";

const currentChainiId = process.env.NEXT_PUBLIC_CHAIN_ID;

export const ProfileStatus = () => {
  const { t } = useTranslation();
  const crwdAddress = CRWD_CONTRACT[currentChainiId as "0x61"];
  const bnbAddress = BNB_ADDRESS[currentChainiId as "0x61"];
  const nftAddress = NFT_CONTRACT[currentChainiId as "0x61"];
  const [isLarge] = useMediaQuery("(min-width: 800px)");
  const address = useAddress();
  const balances = useBalance();

  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Stack w="100%" alignItems="center" justify="center">
        <ProfilePicture address={address} position="relative" />
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
              ? `${t("profile.balanceCrwd")} : ` + balances.data?.value
              : `${t("profile.balanceCrwd")} : ` + balances.data?.value}
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
