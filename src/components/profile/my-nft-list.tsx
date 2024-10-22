import React from "react";
import {
  Box,
  Container,
  Heading,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useGrindNFT, useNFT } from "hooks";
import { CardList } from "components/ui";
import { fromBn } from "evm-bn";
import { useTranslation } from "react-i18next";

export const MyNftList = () => {
  const { t } = useTranslation();
  const { isLoading, mergedData } = useNFT();
  const { claim } = useGrindNFT();

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
          {mergedData.length === 0 && !isLoading ? (
            <Heading color={"gray"}>{t("common.notHaveNFT")}</Heading>
          ) : (
            mergedData.map((e, idx) => (
              <WrapItem w={{ md: "25%", sm: "45%", base: "100%" }} key={idx}>
                <CardList
                  lastGrindAt={e.blockChainData.lastGrindedAt}
                  percentage={e.blockChainData.percentage}
                  mintingPrice={e.blockChainData.mintingPrice}
                  title={e.blockChainData.cardId.toString()}
                  claim={() => claim.exec({ args: [e.blockChainData.cardId] })}
                  maxGrind={parseInt(fromBn(e.blockChainData.maxGrind, 1))}
                  cardId={parseInt(fromBn(e.blockChainData.cardId, 1))}
                  loadingClaim={claim.isLoading}
                  id={idx}
                />
              </WrapItem>
            ))
          )}
        </Wrap>
      </Container>
    </>
  );
};
