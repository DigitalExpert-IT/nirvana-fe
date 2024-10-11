import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Carousel } from "components/ui/carousel";

interface HeaderProps {
  typeDaps: string;
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = props => {
  return (
    <Box>
      <Grid templateColumns="repeat(12,1fr)">
        <GridItem colSpan={12}>
          <Stack
            direction={{ xl: "row", md: "column", base: "column" }}
            align="center"
          >
            <Box
              justifyContent="center"
              w={{ xl: "50%", md: "100%" }}
              px={{ base: "3rem", xl: "0.5rem" }}
            >
              <Text
                bgGradient="linear(to-t, rgba(8,196,71,1) 0%, rgba(0,56,255,1) 100%)"
                fontWeight="bold"
                bgClip="text"
              >
                {props.typeDaps}
              </Text>
              <Heading color="white" fontSize={{ base: "xl", md: "5xl" }}>
                {props.title}
              </Heading>
              <Text color="gray.100" mb="1rem">
                {props.description}
              </Text>
              <Box mt="3rem">
                <Text>NFTN Contract Address</Text>
                <Flex
                  border="1px"
                  borderColor="white"
                  rounded="md"
                  p={{ base: "0,5rem", xl: "1rem", md: "0.5rem" }}
                >
                  <Box
                    display="inline-block"
                    borderRight="1px"
                    borderColor="white"
                    px="1rem"
                  >
                    <Text>BEP20</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
            <Box
              flex="1"
              zIndex={0}
              w={{ xl: "50%", md: "100%", sm: "85%" }}
              p={{ xl: "1rem", base: "3rem" }}
            >
              <Carousel />
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};
