import {
    Heading,
    Text,
    Card,
    CardBody,
    Box,
    Stack,
    Image,
  } from "@chakra-ui/react";
  import { Layout } from "components";
  import { FormRegister } from "components/form/form-register";
  import { Trans } from "react-i18next";
  
  const Register = () => {
    return (
      <Layout>
        <Stack
          bgGradient="linear-gradient(180deg, #0A1022 0%, #1a1a1a 80%)"
          overflow="hidden"
        >
          <Stack
            alignItems={"center"}
            minH={"100vh"}
            bgImage="url('https://ik.imagekit.io/msxxxaegj/nirvana/bgHeader_home.png?updatedAt=1729083755274')"
            gap={"8"}
            pb={"10"}
          >
            <Box
              as="header"
              textAlign="center"
              px={{ base: "8", lg: "4" }}
              letterSpacing={{ base: "normal", md: "0.2em" }}
            >
              <Heading
                pt={{ base: "24", sm: "36" }}
                as="h1"
                textAlign="center"
                textTransform={"uppercase"}
                color="white"
              >
                <Trans
                  i18nKey="register.title"
                  components={{
                    strong: (
                      <Text
                        as="span"
                        variant="gradient"
                        colorScheme="orange:pink"
                      />
                    ),
                  }}
                />
              </Heading>
              <Text mt="4" fontSize="2xl" fontWeight={"hairline"} color="gray.300">
                <Trans
                  i18nKey="register.subtitle"
                  components={{
                    strong: <Text as="span" />,
                  }}
                />
              </Text>
            </Box>
            <Card
              bg={"gray.800"}
              color="white"
              rounded={{ base: "3xl", lg: "50px" }}
              w="full"
              mx="auto"
              maxW="4xl"
              overflow={"hidden"}
            >
              <CardBody
                display={"flex"}
                flexDir={{ base: "column", lg: "row" }}
                p="0"
              >
                <Box
                  w={{ base: "full", lg: "50%" }}
                  borderRight={{ base: "none", lg: "8px" }}
                  color={"blackAlpha.300"}
                  zIndex={"1"}
                >
                  <Box
                    bg={"#682EFD"}
                    py={"20"}
                    zIndex={"99"}
                    bgImage="url('https://ik.imagekit.io/msxxxaegj/nirvana/img-register-clipPath.png?updatedAt=1729083754720')"
                    backgroundPosition={"center"}
                    backgroundSize={"contain"}
                  >
                    <Image
                      src="https://ik.imagekit.io/msxxxaegj/nirvana/image_register.png?updatedAt=1729083754919"
                      alt="pattern2"
                      mx={"auto"}
                    />
                  </Box>
                </Box>
                <Stack
                  w={{ base: "full", lg: "50%" }}
                  minH={"sm"}
                  px={{ base: "4", md: "12" }}
                  color={"whiteAlpha.900"}
                  borderLeft={{ base: "8px", lg: "none" }}
                  borderColor={"blackAlpha.300"}
                  pos={"relative"}
                  justifyContent={"center"}
                >
                  <FormRegister />
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </Stack>
      </Layout>
    );
  };
  
  export default Register;
  