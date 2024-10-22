import { Button, Stack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useAccountMap } from "hooks";

type Props = {
  direction?: "row" | "column";
};

export const WalletButton = (props: Props) => {
  const router = useRouter();
  const { data, isLoading, isFetched } = useAccountMap();
  const { t } = useTranslation();

  const handleNavigate = () => {
    router.push("/register");
  };

  return (
    <Stack spacing="4" direction={props.direction ?? "row"} align="center">
      {data?.isRegistered || data !== undefined ? null : (
        <Button
          isLoading={isLoading && !isFetched}
          bg="#9321dd"
          color="white"
          _hover={{ bg: "#61089c" }}
          borderRadius="xl"
          fontWeight="md"
          fontSize="md"
          onClick={() => handleNavigate}
        >
          {t("common.register")}
        </Button>
      )}
      <ConnectWallet theme="dark" className="button-connect-wallet" />
    </Stack>
  );
};
