import { useMediaQuery } from "@chakra-ui/react";

export const useScreen = () => {
  const [isMobileScreen] = useMediaQuery("(max-width: 45px)");

  return { isMobileScreen };
};
