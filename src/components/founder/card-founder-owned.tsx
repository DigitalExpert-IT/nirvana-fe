import { Box, Stack, Text, Spinner } from "@chakra-ui/react";
import { ButtonCustom } from "components/ui";
import { useAsyncCall, useFounderOwned } from "hooks";
import { useTranslation } from "react-i18next";

export const CardFounderOwned = () => {
  const { t } = useTranslation();
  const { isInitialize, data, claimRewardAsync, fetch } = useFounderOwned();

  const { exec: claim, isLoading } = useAsyncCall(
    claimRewardAsync,
    "Claim NFT Success"
  );

  const handleClaim = async () => {
    await claim();
    await fetch();
  };

  return (
    <Box display="flex" justifyContent="center" rounded="xl" overflow="hidden">
      <Stack
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack p="1.4rem" rounded="xl" bgColor="#26292d">
          {isInitialize ? (
            <Spinner />
          ) : Number(data?.length) !== 0 || undefined ? (
            <Stack>
              <Box as="video" autoPlay loop muted rounded="xl">
                <source
                  src="https://ik.imagekit.io/jvt8yag1p/luncswap/NFT%20FOUNDER.mp4?updatedAt=1719315038438"
                  type="video/mp4"
                />
              </Box>
              <Box py="1rem">
                <Text
                  fontWeight="600"
                  fontSize="2xl"
                  textTransform="uppercase"
                  textAlign="left"
                >
                  nft founder card
                </Text>
                <Text color="valhallPink.700" textAlign="left">
                  Amount
                </Text>
                <Text textAlign="left">{Number(data?.ownedNfts)}</Text>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  maxW="100%"
                  align="center"
                  flex={1}
                  pt="2rem"
                >
                  <ButtonCustom
                    typeButton={2}
                    size="sm"
                    borderRadius="lg"
                    boxShadow={"0px 0px 15px rgba(145, 83, 246, 0.5)"}
                    w="full"
                    isLoading={isLoading}
                    onClick={handleClaim}
                  >
                    <Text> {data?.nftReward.toString()} USDT Claim</Text>
                  </ButtonCustom>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack
              textAlign="center"
              align="center"
              justify="center"
              h={{ base: "55vh", md: "65vh", xl: "50vh" }}
            >
              <Box w="85%">
                <Text fontSize="xl">{t("pages.founder.youDontOwn")}</Text>
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
