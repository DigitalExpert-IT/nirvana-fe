import { Divider, Flex, Heading, Stack, Text, Box, useMediaQuery, Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ButtonCustom } from "components/ui";
import { useAsyncCall, useStartClaim } from "hooks";
import { useGetAccount } from "hooks";
import { fromBn } from "evm-bn";
import { useContractWrite } from "@thirdweb-dev/react";
import { useNftCrowdContract } from "hooks";

export const RewardSection = () => {
  const { t } = useTranslation();
  const {contract: nftContract} = useNftCrowdContract()
  const { leadership, sponsor, farmMatching} = useGetAccount();
  const {isStartClaim} = useStartClaim();
  const [isMobile] = useMediaQuery("(max-width: 800px)")
  const {mutateAsync: claimFarm, isLoading: farmLoading} = useContractWrite(nftContract, "claimMatchingReward")
  const {mutateAsync: claimSponsor, isLoading: sponsorLoading} = useContractWrite(nftContract, "claimSponsorReward")
  const {mutateAsync: claimLeadership, isLoading: leadershipLoading} = useContractWrite(nftContract, "claimLeadershipReward")

  const matchingBonus = useAsyncCall(
    claimFarm,
    t("form.message.claimSuccess"),
  );

  const sponsorClaim = useAsyncCall(
    claimSponsor,
    t("form.message.claimSuccess"),
  )

  const claimLeadershipBonus = useAsyncCall(
    claimLeadership,
    t("form.message.claimSuccess"),
  )


  return (
    <Flex
      position="relative"
      direction={{ base: "column", lg: "row" }}
      minW="100%"
      alignItems="center"
      justifyContent="space-around"
      border="2px solid white"
      borderRadius="3rem"
      mb="15vh"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage="/bg-banner-section.webp"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        filter="blur(8px)"
        zIndex={-1}
      />
      <Stack textAlign="center" gap={5} p={{ base: 10 }} zIndex={1}>
        <Text fontFamily={"Protest Strike, sans-serif"} fontSize="4xl">
          {t("common.farmReward")}
        </Text>
        <Heading
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 5px rgba(78, 251, 224, 0.5), -2px -2px 5px rgba(77, 176, 250, 0.6)"  // Glowing effect
        >
          {farmMatching && farmMatching ? fromBn(farmMatching, 18) : 0} CRWD
        </Heading>
        <ButtonCustom
          typeButton={2}
          size="md"
          borderRadius="lg"
          isLoading={farmLoading}
          onClick={() => matchingBonus.exec({})}
          boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
        >
          <Text color="yellow">{t("common.claim")}</Text>
        </ButtonCustom>
      </Stack>

      {isMobile == true ? (
        <Divider
          orientation="horizontal"
          minW="100%"
          borderWidth={"1.5px"}
          bgColor="white"
          zIndex={1}
        />
      ) : (
        <Divider
          orientation="vertical"
          minH="20vh"
          borderWidth={"1.5px"}
          bgColor="white"
          zIndex={1}
        />
      )}

      <Stack textAlign="center" gap={5} p={{ base: 10 }} zIndex={1}>
        <Text fontFamily={"Protest Strike, sans-serif"} fontSize="4xl">
          {t("common.sponsorReward")}
        </Text>
        <Heading
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 5px rgba(78, 251, 224, 0.5), -2px -2px 5px rgba(77, 176, 250, 0.6)"  // Glowing effect
        >
          {sponsor && sponsor ? fromBn(sponsor, 18) : 0} CRWD
        </Heading>
        <ButtonCustom
          typeButton={2}
          size="md"
          isLoading={sponsorLoading}
          onClick={() => sponsorClaim.exec({})}
          borderRadius="lg"
          boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
        >
          <Text color="yellow">{t("common.claim")}</Text>
        </ButtonCustom>
      </Stack>

      {isMobile == true ? (
        <Divider
          orientation="horizontal"
          minW="100%"
          borderWidth={"1.5px"}
          bgColor="white"
          zIndex={1}
        />
      ) : (
        <Divider
          orientation="vertical"
          minH="20vh"
          borderWidth={"1.5px"}
          bgColor="white"
          zIndex={1}
        />
      )}  

      <Stack textAlign="center" gap={5} p={{ base: 10 }} zIndex={1}>
        <Text fontFamily={"Protest Strike, sans-serif"} fontSize="4xl">
          {t("common.leaderShipreward")}
        </Text>
        <Heading
          fontWeight="bold"
          color="black"
          textShadow="2px 2px 5px rgba(78, 251, 224, 0.5), -2px -2px 5px rgba(77, 176, 250, 0.6)"  // Glowing effect
        >
          {leadership && leadership ? fromBn(leadership, 18) : 0} CRWD
        </Heading>
        <Tooltip hasArrow label={t("common.leaderShipreward")+" Disable"}>
          <ButtonCustom
            typeButton={2}
            disabled={!isStartClaim}
            size="md"
            isLoading={leadershipLoading}
            onClick={() => claimLeadershipBonus.exec({})}
            borderRadius="lg"
            boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
          >
            <Text color="yellow">{t("common.claim")}</Text>
          </ButtonCustom>
        </Tooltip>
      </Stack>
    </Flex>
  );
};
