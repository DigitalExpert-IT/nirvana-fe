import {
  Stack,
  Box,
  Text,
  Button,
  useNumberInput,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ButtonCustom } from "components/ui";
import { useAsyncCall } from "hooks";
import { useFounderCardMap, useFounder } from "hooks";
import { prettyBn } from "utils/format";

export const CardFounder = () => {
  const { data, isLoading } = useFounderCardMap();
  const { buyFounder } = useFounder();
  const totalSupply = isLoading ? (
    <Spinner size="sm" />
  ) : (
    Number(data?.maxMinted) - Number(data?.totalMinted)
  );

  const { exec, isLoading: loadingBuy } = useAsyncCall(buyFounder);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: Number(data?.maxMinted) - Number(data?.totalMinted),
      precision: 0,
    });

  const dec = getDecrementButtonProps();
  const inc = getIncrementButtonProps();
  const input = getInputProps();

  const handleBuy = async () => {
    await exec(input.value);
  };

  const totalBuy = input.value * Number(prettyBn(data?.price, 18));
  return (
    <Box display="flex" justifyContent="center" rounded="xl" overflow="hidden">
      <Box
        rounded="xl"
        color="white"
        mt="4rem"
        bgGradient="linear(130deg, purple, blue.500)"
        p="3px"
        maxW={{ base: "100%", md: "50%", xl: "30rem" }}
      >
        <Stack p="1.4rem" rounded="xl" bgColor="#26292d">
          <Stack>
            <Box as="video" autoPlay loop muted rounded="xl">
              <source
                src="https://ik.imagekit.io/jvt8yag1p/luncswap/NFT%20FOUNDER.mp4?updatedAt=1719315038438"
                type="video/mp4"
              />
            </Box>
            <Box py="0.5rem">
              <Text
                fontWeight="600"
                fontSize="2xl"
                textTransform="uppercase"
                textAlign={"left"}
              >
                nft founder card
              </Text>
              <Text color="#FF00FF" textAlign="left">
                Item Supply
              </Text>
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                <Text textAlign="left">{totalSupply}</Text>
              )}
              <Stack
                direction={{ base: "column", md: "row" }}
                maxW="100%"
                align="center"
                flex={1}
                pt="1rem"
              >
                <Stack
                  direction="row"
                  w={{ base: "100%", md: "50%" }}
                  bgColor="#1F227D"
                  border="1px"
                  borderColor="#FF00FF"
                  rounded="xl"
                  align="center"
                  justify="center"
                >
                  <Button variant="ghost" size="sm" {...dec}>
                    -
                  </Button>

                  <Input
                    bgColor="#1F227D"
                    textAlign="center"
                    variant="unstyled"
                    {...input}
                  />
                  <Button variant="ghost" size="sm" {...inc}>
                    +
                  </Button>
                </Stack>
                <ButtonCustom
                  typeButton={2}
                  size="sm"
                  borderRadius="lg"
                  boxShadow={"0px 0px 15px rgba(145, 83, 246, 0.5)"}
                  w="full"
                  isLoading={isLoading || loadingBuy}
                  onClick={handleBuy}
                >
                  <Text color={"yellow"}> Buy {totalBuy} USDT</Text>
                </ButtonCustom>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
