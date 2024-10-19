import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Stack, Badge, Box, Center, FormLabel } from "@chakra-ui/react";
import { shortenAddress } from "utils";
import { useRouter } from "next/router";
import { useModal } from "@ebay/nice-modal-react";
import { validateRequired, validateAddress } from "utils";
import { useAsyncCall } from "hooks";
import { ButtonConnectWrapper, ModalDiscalimer, FormInput } from "components/ui";
import { useAddress } from "@thirdweb-dev/react";
import {
  NIL_ADDRESS,
} from "constant/address";
import { useRegister } from "hooks/contract/crowd";

type FormType = {
  referrer: string;
};

export const FormRegister = () => {
  const address = useAddress() ?? NIL_ADDRESS;
  const { t } = useTranslation();
  const {mutateAsync, isLoading} = useRegister();

  const register = useAsyncCall(
    mutateAsync,
    t("form.message.registrationSuccess"),
    () => router.replace("/profile")
  );
  const { control, setValue, handleSubmit } = useForm<FormType>();
  const disclaimerModal = useModal(ModalDiscalimer);
  const router = useRouter();

  useEffect(() => {
    setValue("referrer", router.query.ref as string);
  }, [router.query.ref, setValue]);

  const onSubmit = handleSubmit(data => {
    disclaimerModal.show().then(async () => {
      await register.exec({
        args: [data.referrer],
      });
    });
  });

  return (
    <Stack spacing="2" as="form" onSubmit={onSubmit}>
      <Box pos={"absolute"} top={{ base: "6", lg: "14" }} left={"-2"}>
        <Badge
          bg={"#682EFD"}
          minW={"48"}
          py={"2"}
          px={"6"}
          fontSize={"xl"}
          fontWeight={"semibold"}
          textAlign={"right"}
          roundedRight={"50px"}
          roundedLeft={"0"}
        >
          {shortenAddress(address)}
        </Badge>
      </Box>
      <FormLabel
        py={"8"}
        textAlign={"center"}
        fontSize={{ base: "xl", sm: "3xl" }}
      >
        {t("form.label.referrer")}*
      </FormLabel>
      <FormInput
        control={control}
        name="referrer"
        px={"0"}
        fontSize={{ base: "sm", sm: "medium" }}
        placeholder={t("form.placeholder.referrer") ?? ""}
        rules={{
          required: validateRequired(t("form.label.referrer")),
          validate: validateAddress,
        }}
        helpertext={t("form.helperText.referrer")}
        _placeholder={{ color: "brand.400", opacity: "0.5" }}
        rounded={"none"}
        borderBottom={"1px"}
        borderX={"none"}
        borderTop={"none"}
        _hover={{
          _placeholder: {
            color: "white",
          },
          borderBottomColor: "brand.500",
          borderBottom: "2px",
        }}
        _focus={{
          border: "none",
          borderBottom: "2px",
          color: "white",
          _placeholder: {
            color: "white",
          },
        }}
      />
      <Center pt={"10"}>
        <ButtonConnectWrapper type="submit" border={"1px"} px={"16"}>
          <Button
            isLoading={isLoading}
            type="submit"
            border={"1px"}
            px={"16"}
          >
            {t("common.register")}
          </Button>
        </ButtonConnectWrapper>
      </Center>
    </Stack>
  );
};
