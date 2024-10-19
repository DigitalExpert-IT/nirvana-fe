import { Button, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useGetAccount } from "hooks/contract/crowd";
import { useAddress } from "@thirdweb-dev/react";

const RegisterButton = () => {
  const { t } = useTranslation();
  const { data, error } = useGetAccount(); 
  const address = useAddress();
  const router = useRouter();
  
  console.log("Account Data:", data);  

  const handleNavigate = () => {
    router.push("/register");
  };

  return (
    <Box>
      
      {data == null || !error || address == undefined ? (
        <Button
          background={"#9321DD"}
          color={"white"}
          _hover={{ bg: "#61089c" }}
          fontSize={"md"}
          borderRadius={"50px"}
          fontWeight={"400"}
          onClick={handleNavigate}  
        >
          {t("common.register")}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
};

export default RegisterButton;
