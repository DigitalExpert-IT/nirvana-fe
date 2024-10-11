import React, { useState } from "react";
import { Box, Container, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { CardList } from "components/ui";
import { OWNED_NFT } from "constant/mockup-data";

export const MyNftList = () => {
  const [isLoading] = useState<boolean>(false);
  return (
    <>
      <Container maxW={"container.xxl"}>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <Spinner size="xl" />
          </Box>
        ) : null}

        <Wrap
          justifyContent="space-between"
          spacing="20"
          align="center"
          justify="center"
        >
          {OWNED_NFT.map((e, idx) => (
            <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
              <CardList title={e.title} gacha={e.gacha} price={e.price} id={idx} />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </>
  );
};
