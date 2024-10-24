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
import { CRWDNET_CONTRACT, BNB_ADDRESS, NFT_CONTRACT } from "constant/address";
import { useGetAccount } from "hooks";

const currentChainiId = process.env.NEXT_PUBLIC_CHAIN_ID;

export const ProfileStatus = () => {
  const { t } = useTranslation();
  const crwdAddress = CRWDNET_CONTRACT[currentChainiId as "0x61"];
  const bnbAddress = BNB_ADDRESS[currentChainiId as "0x61"];
  const nftAddress = NFT_CONTRACT[currentChainiId as "0x61"];
  const [isLarge] = useMediaQuery("(min-width: 800px)");
  const {data} = useGetAccount();
  const {rank} = useGetAccount();
  const address = useAddress();
  const balances = useBalance();

  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Stack w="100%" alignItems="center" justify="center">
        <ProfilePicture address={address} rank={rank} position="relative" />
      </Stack>
      <Flex
        minW={"100%"}
        direction={{ base: "column", lg: "row" }}
        justifyContent={{ lg: "space-between", base: "center" }}
      >
        <Box minW={"40%"}>
          <Heading size="lg">{t("profile.my")}</Heading>
          <Text color="gray.500" fontSize="sm" my={2}>
            {isLarge
              ? `${t("profile.balanceCrwd")} : ` + balances.data?.value
              : `${t("profile.balanceCrwd")} : ` + balances.data?.value}
          </Text>
          <Text color="gray.500" fontSize="sm" my={2}>
            {data?.totalDownline === undefined
              ? `${t("profile.downline")} : ` + 0
              : `${t("profile.downline")} : ` + data?.totalDownline || 0}
          </Text>
        </Box>

        <Box minW="75%">
          <HStack display={"flex"} justifyContent={"space-between"}>
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
          <HStack display={"flex"} justifyContent={"space-between"}>
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
          <HStack display={"flex"} justifyContent={"space-between"}>
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
