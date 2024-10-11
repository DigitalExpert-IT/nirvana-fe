import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "constant/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState, useEffect } from "react";
import { MobileNav, NavbarMenu } from "components/navbar";
import {
  Box,
  Flex,
  Stack,
  useDisclosure,
  IconButton,
  Container,
  AspectRatio,
} from "@chakra-ui/react";
import WalletButton from "./wallet-button";
// import { ButtonConnectWallet } from "components/button";

const NavbarButtons = () => {
  return (
    <Flex
      flexDirection={{ base: "column", sm: "row" }}
      gap={{ base: 6, sm: 2 }}
      mt={{ base: 8, sm: "unset" }}
    >
      <WalletButton />
    </Flex>
  );
};

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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
                w={{ base: 200, lg: 250 }}
                ratio={16 / 4}
                my={2}
                mx={{ sm: "auto" }}
                pos={{ base: "absolute", lg: "sticky" }}
                right={"0"}
                left={"0"}
                top={"-2"}
              >
                <Image
                  src="/nft-logo.svg"
                  alt="logo-image"
                  width={100}
                  loading="lazy"
                  height={100}
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
          <Stack
            flex={1}
            justify={"end"}
            align={"center"}
            direction={"row"}
            spacing={"4rem"}
            display={{ base: "none", lg: "flex" }}
          >
            <NavbarButtons />
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};
