import _ from "lodash";
import {
  Box,
  Text,
  Icon,
  Stack,
  Button,
  SimpleGrid,
  AspectRatio,
  Image,
  HStack,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useAsyncCall } from "hooks";
import { useSwap } from "hooks/useSwap";
import { fromBn, toBn } from "evm-bn";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoCopyOutline } from "react-icons/io5";
import { AiOutlineArrowRight } from "react-icons/ai";
import { USDT_CONTRACT, CRWDTOKEN_CONTRACT } from "constant/address";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormInput, FormSelect } from "components/form/form-utils";
import { getCrwdRate, getUsdtRate, prettyBn, shortenAddress } from "utils";

import { useAccountBalance } from "hooks/useAccountBalance";
import { ButtonConnectWrapper, CopiableText } from "components/ui";

export const CURRENT_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;

interface ISwapToken {
  amountTop: string;
  amountBottom: string;
  currency: string;
}

export const FormSwap = () => {
  const { t } = useTranslation();
  const addressCrowd = CRWDTOKEN_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
  const addressUsdt = USDT_CONTRACT[CURRENT_CHAIN_ID as "0x38"];
  const [symbol, setSymbol] = useState(false);
  const [fee, setFee] = useState<BigNumber>(toBn("0", 18));
  const { handleSubmit, control, watch, getValues, setValue, resetField } =
    useForm<ISwapToken>();
  const watchCurrency = watch("currency");
  const watchAmountTop = watch("amountTop");

  const { balanceCRWD, balanceUSDT } = useAccountBalance();

  const swap = useSwap();

  const { exec, isLoading: isSwapLoading } = useAsyncCall(
    swap.swapCrowd,
    t("form.message.swapSucces")
  );

  const { exec: execUSDT, isLoading: isSwapLoadingUSDT } = useAsyncCall(
    swap.swapUSDT,
    t("form.message.swapSucces")
  );

  const inputMax = () => {
    const { currency } = getValues();
    let result;

    if (currency === "CROWD") {
      if (!balanceUSDT?.value) return setValue("amountTop", "0");

      result = balanceUSDT.value;
    } else {
      if (!balanceCRWD?.value || balanceCRWD?.value.isZero())
        return setValue("amountTop", "0");

      result = balanceCRWD.value.mul(toBn("9", 18)).div(toBn("10", 18));
    }

    setValue("amountTop", fromBn(result, 18));
    handleChangeInput("amountTop");
  };

  useEffect(() => {
    const currency = watchCurrency;
    if (currency === "CROWD") setSymbol(true);
    else setSymbol(false);

    // should reset amountTop and amountBottom
    // after change the currency
    resetField("amountTop");
    resetField("amountBottom");
    setFee(toBn("0", 18));
  }, [watchCurrency]);

  const handleChangeInput = useCallback(
    _.debounce((field: string) => {
      const { amountTop, amountBottom, currency } = getValues();
      const value = field === "amountTop" ? amountTop : amountBottom;

      // define what the top and bottom fields are
      const fieldTarget = field === "amountTop" ? "amountBottom" : "amountTop";

      let swapResult = "";

      if (!value) {
        setFee(toBn("0", 18));
      }

      let swapFee = toBn("0", 18);

      if (currency === "CROWD") {
        swapResult = fromBn(getUsdtRate(value ? value : "0"), 18);
      } else {
        if (fieldTarget === "amountTop") {
          if (value) {
            swapFee = toBn(value, 18).mul(toBn("1", 18)).div(toBn("99", 18));
            setFee(swapFee);
          }

          swapResult = fromBn(
            getCrwdRate(value ? value : "0").add(swapFee),
            18
          );
        } else {
          if (value) {
            swapFee = toBn(value, 18).mul(toBn("1", 18)).div(toBn("100", 18));
            setFee(swapFee);
          }

          swapResult = fromBn(
            getCrwdRate(value ? value : "0").sub(swapFee),
            18
          );
        }
      }

      setValue(fieldTarget, swapResult);
    }, 200),
    []
  );

  const isDisableButtonSwap = useMemo(() => {
    const { amountTop } = getValues();

    if (!amountTop) return false;

    return toBn(amountTop, 18) <= toBn("0", 18);
  }, [watchAmountTop]);

  const onSubmit = handleSubmit(async (data: ISwapToken) => {
    const { amountTop } = getValues();

    if (data.currency === "CROWD") {
      exec(toBn(amountTop, 18));
    } else {
      execUSDT(toBn(amountTop, 18));
    }
  });

  const usdtBalance = fromBn(balanceUSDT?.value ?? toBn("0", 18), 18);
  const formattedBalance =
    Number(usdtBalance) < 1 ? usdtBalance : prettyBn(balanceUSDT?.value, 18);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={{ base: "8", md: "20" }}
      pos={"relative"}
    >
      <Stack
        as="form"
        onSubmit={onSubmit}
        align="center"
        order={{ base: 2, md: 1 }}
      >
        <Stack alignItems="center" mb="5" spacing={"3"}>
          <HStack w="full">
            <Box
              position={"relative"}
              border={"1px"}
              borderColor="#091E2A"
              borderRadius={"lg"}
              overflow={"hidden"}
              w="100%"
            >
              <Text
                position={"absolute"}
                textAlign={"center"}
                fontWeight={"bold"}
                bg="#091E2A"
                py={"2"}
                px={"6"}
                borderLeftRadius="lg"
                zIndex={"3"}
              >
                {t("form.label.from")}
              </Text>
              <FormInput
                flex={1}
                ml={"10"}
                textAlign="center"
                textColor={"white"}
                borderRadius={"3xl"}
                bg="#091e2abd"
                _focus={{
                  border: "none",
                  bg: "whiteAlpha.200",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.300",
                }}
                control={control}
                onKeyUp={() => handleChangeInput("amountTop")}
                name="amountTop"
                placeholder={"0.0"}
                type="number"
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
              />
            </Box>
            <Button
              backgroundColor={"#091E2A"}
              rounded="lg"
              _hover={{
                opacity: 0.6,
              }}
              onClick={inputMax}
            >
              {t("common.max")}
            </Button>
          </HStack>
          <Text
            as={"span"}
            fontSize={"sm"}
            color={"whiteAlpha.700"}
            textAlign={"center"}
          >
            {t("form.helperText.fee", {
              value: fromBn(fee, 18),
              symbol: symbol ? "USDT" : "CROWD",
            })}
          </Text>

          <Stack py={"2"} w={"full"}>
            <SimpleGrid
              columns={2}
              placeItems={"center"}
              bg={"#091E2A"}
              w={"full"}
              rounded={"xl"}
              overflow={"hidden"}
              pos={"relative"}
            >
              <Text fontWeight={"bold"}>{t("form.label.swap")}</Text>
              <Icon pos={"absolute"} zIndex={"3"} fontSize={"xl"} color="white">
                <AiOutlineArrowRight />
              </Icon>
              <FormSelect
                bg={"#091e2abd"}
                textAlign={"center"}
                control={control}
                _focus={{
                  border: "none",
                  bg: "gray.700",
                }}
                _hover={{
                  border: "none",
                  bg: "gray.600",
                }}
                name="currency"
                value={watchCurrency}
                option={[
                  { value: "USDT", label: "USDT" },
                  { value: "CROWD", label: "CROWD" },
                ]}
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
              />
            </SimpleGrid>
          </Stack>

          <Stack w={"full"} pt={"4"}>
            <Box
              position={"relative"}
              w={"full"}
              border={"1px"}
              borderColor="#091E2A"
              borderRadius={"lg"}
              overflow={"hidden"}
            >
              <Text
                position={"absolute"}
                textAlign={"center"}
                fontWeight={"bold"}
                py={"2"}
                px={"6"}
                borderRadius={"md"}
                bg="#091E2A"
                zIndex={"3"}
              >
                {t("form.label.to")}
              </Text>
              <FormInput
                ml={"10"}
                textAlign="center"
                textColor={"gray.100"}
                borderRadius={"3xl"}
                bg="#091e2abd"
                _focus={{
                  border: "none",
                  bg: "whiteAlpha.200",
                }}
                _hover={{
                  border: "none",
                  bg: "whiteAlpha.300",
                }}
                control={control}
                onKeyUp={() => handleChangeInput("amountBottom")}
                name="amountBottom"
                placeholder={"0.0"}
                type="number"
                isDisabled={isSwapLoading || isSwapLoadingUSDT}
              />
            </Box>
          </Stack>
          <ButtonConnectWrapper>
            <Button
              type="submit"
              w="100%"
              isLoading={isSwapLoading || isSwapLoadingUSDT}
              bgGradient="linear-gradient(92deg, #1D76CD 4.65%, #06C196 96.4%)"
              _hover={{
                bg: "linear-gradient(92deg, #135186 4.65%, #0B4649 96.4%)",
              }}
              isDisabled={isDisableButtonSwap}
            >
              {t("common.swap")}
            </Button>
          </ButtonConnectWrapper>
        </Stack>
      </Stack>
      <Box
        display={{ base: "none", md: "block" }}
        pos={"absolute"}
        right={"0"}
        left={"0"}
        my={"8"}
        w={"0.5"}
        h={"40"}
        mx={"auto"}
        borderRight={"1px"}
        borderColor="gray.400"
      />
      <Stack
        height={"fit-content"}
        pos="relative"
        mb={{ base: 10, md: 0 }}
        px="3"
        order={{ base: 1, md: 2 }}
      >
        <Box zIndex={1}>
          <Stack
            direction="column"
            p={2}
            rounded="xl"
            backgroundColor="#091E2A"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={1} width="24px">
                <Image src="/crowd.png" alt="logo-image" />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {Number(fromBn(balanceCRWD?.value ?? toBn("0", 18), 18)) < 1
                  ? fromBn(balanceCRWD?.value ?? toBn("0", 18), 18)
                  : prettyBn(balanceCRWD?.value, 18)}{" "}
                CROWD
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import CROWD</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressCrowd}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressCrowd)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
          <Stack
            direction="column"
            rounded="xl"
            p={2}
            backgroundColor="#091E2A"
            my="4"
            boxShadow="lg"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              w="full"
              px="8"
              pt="3"
            >
              <AspectRatio ratio={1} width="24px">
                <Image src="/tether-logo-white.png" alt="logo-image" />
              </AspectRatio>
              <Text
                as={"span"}
                fontSize={"sm"}
                color={"whiteAlpha.700"}
                textAlign={"center"}
              >
                {formattedBalance} USDT
              </Text>
            </Stack>
            <HStack
              borderTop="1px"
              borderColor="gray.500"
              textAlign="center"
              p="3"
              justifyContent="space-between"
            >
              <Text fontSize="sm">Import USDT</Text>
              <Box display="flex" alignItems="center">
                <CopiableText
                  value={addressUsdt}
                  display="flex"
                  alignItems="center"
                  gap="2"
                >
                  {shortenAddress(addressUsdt)}
                  <IoCopyOutline />
                </CopiableText>
              </Box>
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </SimpleGrid>
  );
};
