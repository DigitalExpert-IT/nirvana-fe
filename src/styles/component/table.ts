import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const numericStyles = defineStyle({
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
});

const variantCrowd = definePartsStyle(props => {
  return {
    table: {
      borderCollapse: "separate",
      borderSpacing: "10px",
    },
    th: {
      color: mode("gray.600", "gray.300")(props),
      border: "1px",
      textAlign: "center",
      bgColor: "#0A1022",
      borderColor: "#0A1022",
      ...numericStyles,
    },
    td: {
      border: "1px",
      bgColor: "#0A1022",
      borderColor: "#0A1022",
      ...numericStyles,
    },
    caption: {
      color: mode("gray.600", "gray.100")(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
});

export const tableTheme = defineMultiStyleConfig({
  variants: { variantCrowd },
});
