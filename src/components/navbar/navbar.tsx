import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { NAVIGATION } from "constant/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState, useEffect } from "react";
import { MobileNav, NavbarMenu, WalletButton } from "components/navbar";
import {
  Select,
  FormControl,
  Box,
  Flex,
  Stack,
  useDisclosure,
  IconButton,
  Container,
  AspectRatio,
} from "@chakra-ui/react";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setScrolled(prevScrollPos > 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    if (prevScrollPos === 0) {
      setScrolled(false);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, scrolled]);

  return (
    <Box
      pt={{ base: "2", lg: "2" }}
      pb={{ base: "2", lg: "2" }}
      px={3}
      w="full"
      zIndex={1000}
      bg={isOpen ? "#212428" : scrolled ? "#212428" : "#2124282e"}
      boxShadow={scrolled ? "dark-lg" : "none"}
      pos="fixed"
      transition="0.5s"
    >
      <Container maxW="container.xxl">
        <Flex alignItems="center" justify="space-around">
          <Stack
            direction="row"
            align="center"
            flex={1}
            justify="space-between"
            pos={"relative"}
          >
            <MobileNav data={NAVIGATION} isOpen={isOpen} onClose={onClose} />
            <Link href="/">
              <AspectRatio
                w={{ base: 200, lg: 300 }}
                ratio={11 / 2}
                my={2}
                mx={{ sm: "auto" }}
                pos={{ base: "absolute", lg: "sticky" }}
                right={"0"}
                left={"0"}
                top={"-2"}
              >
                <Image
                  src="/crowd1.svg"
                  alt="logo-image"
                  width={500}
                  loading="lazy"
                  height={500}
                />
              </AspectRatio>
            </Link>
            <IconButton
              color="white"
              variant="ghost"
              fontSize="xl"
              icon={<GiHamburgerMenu />}
              aria-label="open-menu"
              display={{ base: "flex", md: "flex", lg: "none" }}
              onClick={onOpen}
            />
          </Stack>
          <Stack
            direction="row"
            spacing="5"
            display={{ base: "none", md: "none", lg: "flex" }}
            justify="center"
            align="center"
            flex={1}
          >
            <NavbarMenu data={NAVIGATION} />
          </Stack>
          <Flex
            alignItems="center"
            gap={2}
            flex={1}
            justify="right"
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <WalletButton />
            <Box display="flex" justifyContent="center">
              <FormControl display="flex">
                <Select
                  bg="blackAlpha.500"
                  size="md"
                  border="none"
                  onChange={e => changeLanguage(e.target.value)}
                >
                  <option value="en">En</option>
                  <option value="cn">Cn</option>
                </Select>
              </FormControl>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
