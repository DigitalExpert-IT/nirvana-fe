import { t } from "i18next";
import { Layout, FormSwap } from "components";
import { Card, CardBody, Flex, Heading, Image, Stack } from "@chakra-ui/react";

const Swap = () => {
  return (
    <Layout>
      <Flex
        pos={"relative"}
        flexDir={"column"}
        minH={"80vh"}
        px={"4"}
        pb={"10"}
        placeContent={"center"}
        bgGradient="linear-gradient(180deg, #0A1022 0%, #1d1d1b  100%)"
        overflow="hidden"
      >
        <Heading
          fontWeight="black"
          fontSize={{ base: "3xl", md: "7xl" }}
          textAlign="center"
          textTransform="uppercase"
          mt={"40"}
          zIndex={"1"}
          _after={{
            content: `'${t("common.swap").toUpperCase()}'`,
            alignSelf: "center",
            display: "block",
            fontWeight: "black",
            transform: {
              md: "scale(3.5) translateY(-1rem)",
              base: "scale(3) translateY(-8px)",
            },
            color: "whiteAlpha.100",
            textAlign: "center",
            textTransform: "uppercase",
          }}
          mb={{ md: "2rem", base: "1rem" }}
        >
          {t("common.swap").toUpperCase()}
        </Heading>
        <Card
          bgGradient="linear-gradient(91deg, #61089c 5.23%, #000000 99.35%)"
          mx="auto"
          w={"full"}
          px={{ sm: "8" }}
          rounded={"3xl"}
          maxW="4xl"
          shadow={"none"}
          zIndex={"3"}
          mb="10rem"
          p={{ base: 0, md: "2rem" }}
        >
          <CardBody>
            <FormSwap />
          </CardBody>
        </Card>
        <Stack
          justifyContent={"center"}
          pos={"absolute"}
          top={"40"}
          bottom={"0"}
          right={"0"}
          left={"0"}
          zIndex={"0"}
        >
          <Image
            src="/BgSwap.png"
            alt="Bg Swap"
            w={"full"}
            h={"full"}
            minH={"xl"}
            objectFit={"cover"}
          />
        </Stack>
      </Flex>
    </Layout>
  );
};

export default Swap;
