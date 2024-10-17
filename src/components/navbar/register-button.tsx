import { Button, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterButton = () => {
  const { t } = useTranslation();
  const router = useRouter();
//   const address = useAddress(); get address to check to check is registered or not
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isRegistered, setIsRegistered] = useState<boolean>(false) //mock output for registered testing

    const handleNavigate = () => {
        router.push("/register")
    }

  return (
    <Box>
        {!isRegistered ? 
        <Button
            as={"button"}
            background={"#9321DD"}
            color={"white"}
            _hover={{ bg: "#61089c" }}
            fontSize={"md"}
            borderRadius={"50px"}
            fontWeight={"400"}
            onClick={() => handleNavigate()}
        >
            {t("common.register")}
        </Button>
        : ""}
     </Box>
  );
};

export default RegisterButton;



