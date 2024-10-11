import Image from "next/image";
import { chakra } from "@chakra-ui/react";

export const NextImage = chakra(Image, {
  shouldForwardProp: prop =>
    [
      "height",
      "width",
      "quality",
      "src",
      "alt",
      "fill",
      "layout",
      //   'style',
    ].includes(prop),
});
