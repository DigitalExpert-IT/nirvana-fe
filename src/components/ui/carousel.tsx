import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Box, Image, Flex } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { CARAOUSEL_IMAGE } from "constant/image";

export const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);

  return (
    <Box ref={emblaRef} overflow="hidden">
      <Flex>
        {CARAOUSEL_IMAGE.map((image, idx) => (
          <Box key={idx} flex="0 0 100%" rounded="xl" overflow="hidden">
            <Image
              src={image.url}
              alt={image.alt}
              objectFit="cover"
              borderRadius="md"
              w="100%"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
