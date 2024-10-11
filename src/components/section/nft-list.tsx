import React, { useState } from "react";
import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { CardList } from "components/ui";
import { DATA_NFT } from "constant/mockup-data";

export const NftList = () => {
  const [isLoading] = useState<boolean>(false);
  return (
    <>
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
        py={10}
        mx={5}
      >
        {DATA_NFT.map((e, idx) => (
          <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
            <CardList title={e.title} price={e.price} id={idx} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
