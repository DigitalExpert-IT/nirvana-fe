import React, { useState } from "react";
import { CardList } from "components/ui";
import { Box, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import { useCardList } from "hooks";
import { prettyBn } from "utils";

export const SectionNftList = () => {
  const [isLoading] = useState<boolean>(false);
  const { data } = useCardList();

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
        {data.map((e, idx) => (
          <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
            <CardList
              title={e.id.toString()}
              price={prettyBn(e.price, 18)}
              id={Number(e.id)}
            />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
