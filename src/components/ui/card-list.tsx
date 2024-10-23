import React, { useLayoutEffect, useRef } from "react";
import { t } from "i18next";
import { ButtonCustom } from "./button-custom";
import { CARD_IMAGE_MAP } from "constant/image";
import { Box, Stack, Text, Image, Flex } from "@chakra-ui/react";
import { useAsyncCall, useCardList } from "hooks";
import useClickConnectWallet from "hooks/useClickConnectWallet";
import { differenceInSeconds } from "date-fns";
import { BigNumber } from "ethers";
import { fromBn } from "evm-bn";

interface CardListNFTProps {
  title: string;
  price?: string;
  gacha?: number;
  id: number;
  cardId?: number;
  mintingPrice?: BigNumber;
  mintedDate?: number;
  maxGrind?: number;
  percentage?: BigNumber;
  lastGrindAt?: BigNumber;
  loadingClaim?: boolean;
  claim?: () => void; 
}

export const CardList: React.FC<CardListNFTProps> = props => {
  const {id, cardId, lastGrindAt, mintingPrice, percentage } = props
  const { buy } = useCardList();
  const { showModalConnectWallet, loading, isAbleToTransaction } =
    useClickConnectWallet();

  const intervalRef = useRef<number>();
  const farmTextRef = useRef<HTMLParagraphElement>(null);
  const lastFarmedAtRef = useRef<BigNumber>(lastGrindAt);

  const { exec, isLoading } = useAsyncCall(buy, t("common.succesBuyNft"));

  const handleBuy = () => {
    if (!isAbleToTransaction) return showModalConnectWallet();
    exec(props.id);
  };

  useLayoutEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (!farmTextRef.current) return;

      const farmPerDay = mintingPrice.mul(percentage.mul(10)).div(1000 * 10);
      const farmPerSec = farmPerDay.div(86400);

      const secDiff = differenceInSeconds(
        new Date(),
        new Date(lastFarmedAtRef.current.toNumber() * 1000)
      );

      const farmValue = farmPerSec.mul(secDiff);
      farmTextRef.current.innerText = parseFloat(fromBn(farmValue, 18)).toPrecision(5);
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [mintingPrice, percentage]);

  

  return (
    <Box rounded="xl" overflow="hidden">
      <Stack
        rounded="xl"
        color="white"
        bgGradient="linear(#8532EF, #C431E9)"
        p="3px"
      >
        <Stack bgColor="#26292d" p="1.4rem" rounded="xl">
          <Box as="video" autoPlay loop muted rounded="xl">
            <source src={CARD_IMAGE_MAP[percentage ? cardId as 0 : id as 0]} type="video/mp4" />
          </Box>
          <Box py="1rem">
            <Stack height="60px" direction="column" spacing={0}>
              <Flex direction={"row"} justifyContent={"space-between"}>
                <Box>
                  <Text
                    fontSize="sm"
                    textTransform="capitalize"
                    fontWeight="bold"
                    color="gray.500"
                  >
                    CROWD {t("common.product")} {parseInt(props.title)+1}
                  </Text>
                </Box>
                <Box>
                  <Image
                    src={"/nftFarming.png"}
                    alt={"farming"}
                    w="63px"
                    h="22px"
                    objectFit="cover"
                  />
                </Box>
              </Flex>
              {props.percentage ? (
                <Text
                  fontSize="sm"
                  textTransform="capitalize"
                  fontWeight="bold"
                  color="purple.500"
                  mb="20px"
                >
                  {t("common.gacha")} : {fromBn(percentage, 1).toString()}
                </Text>
              ) : (
                <Text
                  fontSize="sm"
                  textTransform="capitalize"
                  fontWeight="bold"
                  color="purple.500"
                  mb="20px"
                >
                  {t("common.gacha")} : <br /> 0.7%, 0.8%, 0.9%, 1%, 1.5%
                </Text>
              )}
            </Stack>
            <Stack
              direction="row"
              justify="space-between"
              pt="2rem"
              align="center"
            >
              {props.maxGrind ? (
                <ButtonCustom
                  typeButton={2}
                  size="md"
                  borderRadius="lg"
                  minW={"100%"}
                  isLoading={props.loadingClaim}
                  onClick={() => props.claim()}
                  boxShadow={"0px 0px 15px rgba(145, 83, 246, 0.5)"}
                >
                  <Text color={"yellow"} ref={farmTextRef}/> 
                </ButtonCustom>
              ) : (
                <>
                  <Box
                    borderRadius={"lg"}
                    px={"9px"}
                    py={"5px"}
                    bgGradient="linear(to-r, purpleMain.300, purpleMain.400)"
                    display={"flex"}
                  >
                    {props.maxGrind ?
                      <Text fontWeight="bold" fontSize="sm" mr={"3px"}>
                      {props.maxGrind}
                      </Text>
                    :
                      <Text fontWeight="bold" fontSize="sm" mr={"3px"}>
                        {props.price}
                      </Text>
                    }
                    <Text fontWeight="bold" fontSize="sm" color="teal.300">
                      CROWD
                    </Text>
                  </Box>
                  <ButtonCustom
                    typeButton={2}
                    size="sm"
                    borderRadius="lg"
                    boxShadow={"0px 0px 15px rgba(145, 83, 246, 0.5)"}
                    onClick={() => handleBuy()}
                    isLoading={isLoading || loading}
                  >
                    <Text color={"yellow"}>{t("common.buy")}</Text>
                  </ButtonCustom>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
