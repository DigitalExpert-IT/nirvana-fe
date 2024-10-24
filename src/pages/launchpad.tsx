import React from "react";
import { Layout } from "components";
import {
  Box,
  Heading,
  Flex,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { CardFounder, CardFounderOwned } from "components";
import { t } from "i18next";

const nftLaunchpad = () => {
  return (
    <Layout>
      <Box bgGradient={"radial(#330066, #1d1d1b)"}>
        <Flex
          pos={"relative"}
          flexDir={"column"}
          minH={"90vh"}
          px={"4"}
          pb={"10"}
          placeContent={"center"}
          bgGradient="linear(rgba(17,17,17,1), rgba(17,17,17,0.3),rgba(17,17,17,1))"
          overflow="hidden"
          align="center"
        >
          <Box zIndex="1">
            <Heading
              fontWeight="black"
              fontSize={{ base: "2xl", md: "7xl" }}
              textAlign="center"
              textTransform="uppercase"
              mt={"40"}
              zIndex={"1"}
              _after={{
                content: `'${t("common.launchpad").toUpperCase()}'`,
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
              {t("common.launchpad").toUpperCase()}
            </Heading>

            <Box w={{ base: "100%", md: "85vw" }}>
              <Box textAlign="center" my="5rem">
                <Tabs isFitted mt="2rem" isLazy>
                  <TabList>
                    <Tab>
                      <Text textTransform="uppercase" fontSize="xl">
                        Buy Launchpad
                      </Text>
                    </Tab>
                    <Tab>
                      <Text textTransform="uppercase" fontSize="xl">
                        Claim Launchpad
                      </Text>
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <CardFounder />
                    </TabPanel>
                    <TabPanel>
                      <CardFounderOwned />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Layout>
  );
};
export default nftLaunchpad;
