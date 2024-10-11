import { Box, Button, ButtonProps, BoxProps } from "@chakra-ui/react";
import React from "react";

type buttonType = 1 | 2 | 3;
interface ButtonCustomProps extends ButtonProps {
  boxProps?: BoxProps;
  typeButton?: buttonType;
}

export const ButtonCustom: React.FC<ButtonCustomProps> = props => {
  const { typeButton, ...rest } = props;
  switch (typeButton) {
    case 3:
      return (
        <Button
          py={"15px"}
          variant="solid"
          size="sm"
          backgroundColor={"#000000"}
          border={"1px solid #8400CC"}
          _hover={
            rest.isDisabled
              ? {}
              : {
                  bgGradient: "linear(to-t, gray.800 20%, #0000 100%)",
                }
          }
          _active={
            rest.isDisabled
              ? {}
              : {
                  bgGradient:
                    "linear(to-r, purpleMain.600 20%, purpleMain.500 100%)",
                }
          }
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.215)"}
          {...rest}
        >
          {rest.children}
        </Button>
      );
    case 2:
      return (
        <Button
          py={"15px"}
          variant="solid"
          size="sm"
          bgGradient="linear(to-r, purpleMain.300, purpleMain.400)"
          border={"1px solid #8400CC"}
          _hover={
            rest.isDisabled
              ? {}
              : {
                  bgGradient:
                    "linear(to-r, purpleMain.400 20%,purpleMain.500 100%)",
                }
          }
          _active={
            rest.isDisabled
              ? {}
              : {
                  bgGradient:
                    "linear(to-r, purpleMain.600 20%, purpleMain.500 100%)",
                }
          }
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.215)"}
          {...rest}
        >
          {rest.children}
        </Button>
      );

    default:
      return (
        <Box
          p={"3px"}
          background={"red"}
          mt="1rem"
          borderRadius={"xl"}
          bgGradient="linear(purpleMain.300 20%,purpleMain.400 100%)"
          _hover={
            rest.isDisabled
              ? {}
              : {
                  bgGradient: "linear(purpleMain.400 20%,purpleMain.500 100%)",
                }
          }
          {...props.boxProps}
        >
          <Button
            bgGradient="linear(purpleMain.400 20%, purpleMain.300 100%)"
            variant="solid"
            p={"10px"}
            size="sm"
            w="100%"
            _hover={
              rest.isDisabled
                ? {}
                : {
                    bgGradient:
                      "linear(purpleMain.500 20%, purpleMain.400 100%)",
                  }
            }
            _active={
              rest.isDisabled
                ? {}
                : {
                    bgGradient:
                      "linear(purpleMain.600 20%, purpleMain.500 100%)",
                  }
            }
            {...rest}
          >
            {rest.children}
          </Button>
        </Box>
      );
  }
};
