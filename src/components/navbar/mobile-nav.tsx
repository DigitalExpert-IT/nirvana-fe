import React from "react";
import Link from "next/link";
import { INavigation } from "constant/navigation";
// import { ButtonConnectWallet } from "components";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  Select,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Text,
  Flex,
  Icon,
  useDisclosure,
  Collapse,
  Heading,
  DrawerFooter,
} from "@chakra-ui/react";
import { WalletButton } from "./wallet-button";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: INavigation[];
}

export const MobileNav: React.FC<MobileDrawerProps> = props => {
  const { isOpen, onClose, data } = props;
  const { isOpen: openChild, onToggle } = useDisclosure();
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  // const connectionStatus = useConnectionStatus();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgColor="#212428">
        <DrawerCloseButton />
        <DrawerHeader justifyContent="center" display="flex">
          <Heading fontSize="6xl">CROWD</Heading>
        </DrawerHeader>
        <DrawerBody p="0">
          <Stack spacing="5">
            {data.map((item, idx) => {
              // if (item.name === "myNetwork" && connectionStatus !== "connected")
              //   return null;
              //
              return (
                <Stack key={idx} onClick={item.children && onToggle}>
                  <Flex
                    justify="space-between"
                    align="center"
                    justifyContent="center"
                    display="flex"
                  >
                    <Link href={`${item.href}`}>
                      <Text
                        fontWeight="400"
                        textTransform="uppercase"
                        fontSize="xl"
                      >
                        {t(`common.navigation.${item.name}`)}
                      </Text>
                    </Link>
                    {item.children && (
                      <Icon
                        as={ChevronDownIcon}
                        transition="all .25s ease-in-out"
                        transform={openChild ? "rotate(180deg)" : ""}
                        w={6}
                        h={6}
                      />
                    )}
                  </Flex>
                  <Collapse
                    in={openChild}
                    style={{ marginTop: "0!important" }}
                    animateOpacity
                  >
                    <Stack bg="whiteAlpha.100" spacing="0">
                      {item.children &&
                        item.children.map((obj, id) => (
                          <Link
                            key={id}
                            href={obj.link}
                            style={{
                              width: "100%",
                              textAlign: "center",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                              textTransform: "uppercase",
                            }}
                          >
                            <Text>{t(`common.navigation.${obj.title}`)}</Text>
                          </Link>
                        ))}
                    </Stack>
                  </Collapse>
                </Stack>
              );
            })}
          </Stack>
          <Stack
            direction="row"
            w="full"
            justify="center"
            p="2"
            my="2"
            h="30%"
            alignItems={"center"}
          >
            <WalletButton />
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Box display="flex" justifyContent="center" mb="5">
            <FormControl display="flex" w="full">
              <Select
                bg="blackAlpha.500"
                size="sm"
                border="none"
                onChange={e => changeLanguage(e.target.value)}
              >
                <option value="en">En</option>
                <option value="cn">Cn</option>
              </Select>
            </FormControl>
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
