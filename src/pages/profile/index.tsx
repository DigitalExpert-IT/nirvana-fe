// import Image from "next/image";
import { Box, Image, Container, Flex, Heading } from "@chakra-ui/react";
import { Layout } from "components/layout";
import { MyNftList, ProfileStatus, RewardSection } from "components/profile";

export default function Profile() {
  return (
    <Layout>
      <Box>
        <Image
          src="https://ik.imagekit.io/msxxxaegj/nirvana/bg-2.jpeg?updatedAt=1728007575311"
          w="full"
          position="absolute"
          h="15rem"
          objectFit="cover"
          alt="bg-profile"
          loading="lazy"
        />
        <Container py="16" mx="auto" maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "column", xl: "row" }}
            borderRadius="xl"
            w="100%"
            bg="gray.800"
            mt="8rem"
            mb={"2rem"}
            p="1rem"
            gap="2rem"
            pos="relative"
            align="center"
            boxShadow={"0px 0px 10px 5px rgb(145 83 246 / 30%)"}
          >
            <ProfileStatus />
          </Flex>
          <Box w="100%">
            <RewardSection />
            <Heading mb={10}>NFTs</Heading>

            <MyNftList />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
}
