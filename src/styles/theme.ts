import { extendTheme } from "@chakra-ui/react";
import { tableTheme } from "./component/table";
import "@fontsource/protest-strike";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#edf3f8",
      100: "#d5d8dc",
      200: "#bbbec2",
      300: "#a0a5aa",
      400: "#858b92",
      500: "#6b7179",
      600: "#53585f",
      700: "#3b3f44",
      800: "#23262a",
      900: "#070e13",
    },
    pink: {
      50: "#ffeafd",
      100: "#ecc6eb",
      200: "#dba3da",
      300: "#cd80cb",
      400: "#bd5bbb",
      500: "#a442a2",
      600: "#80327f",
      700: "#5c245b",
      800: "#391438",
      900: "#170417",
    },
    purpleMain: {
      50: "#f2e5ff",
      100: "#d2b5ff",
      200: "#b285fb",
      300: "#9355f7",
      400: "#7425f4",
      500: "#5a0bda",
      600: "#4608ab",
      700: "#32047b",
      800: "#1e024c",
      900: "#0c001e",
    },
  },
  components: { Table: tableTheme },
  styles: {
    global: {
      body: {
        bg: "#212428",
        color: "white",
      },
    },
  },
});

export default theme;
