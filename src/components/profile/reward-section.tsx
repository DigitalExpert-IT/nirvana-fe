import { Divider, Flex, Heading, Stack, Text, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ButtonCustom } from "components/ui";
import { useScreen } from "hooks";

export const RewardSection = () => {
  const { t } = useTranslation();
  const isMobileScreen = useScreen();

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
          textShadow="0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)" // Glowing effect
        >
          {123435634634} CRWD
        </Heading>
        <ButtonCustom
          typeButton={2}
          size="md"
          borderRadius="lg"
          boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
        >
          <Text color="yellow">{t("common.claim")}</Text>
        </ButtonCustom>
      </Stack>

      {isMobileScreen ? (
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
          {t("common.leaderReward")}
        </Text>
        <Heading
          fontWeight="bold"
          color="black"
          textShadow="0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)" // Glowing effect
        >
          {123435634634} CRWD
        </Heading>
        <ButtonCustom
          typeButton={2}
          size="md"
          borderRadius="lg"
          boxShadow="0px 0px 15px rgba(145, 83, 246, 0.5)"
        >
          <Text color="yellow">{t("common.claim")}</Text>
        </ButtonCustom>
      </Stack>
    </Flex>
  );
};
