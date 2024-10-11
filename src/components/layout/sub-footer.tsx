import React from 'react';
import Link from 'next/link';
import {
  Box,
  Text,
  Image,
  Wrap,
  ListItem,
  UnorderedList,
  WrapItem,
  Select,
  FormControl,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ModalDisclaimer } from './modal-disclaimer';

export const SubFooter: React.FC = () => {
  const { i18n } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Wrap justify="space-evenly" color="gray.500" my="80px">
      <WrapItem w={{ xl: '23%', md: '23%', base: '100%' }}>
        <Box>
          <Text
            fontSize="xl"
            color="white"
            fontWeight="bold"
            mb="30px"
            mt="15px"
          >
            Listed on
          </Text>
          <UnorderedList listStyleType="none" marginStart="none">
            <ListItem cursor="pointer" _hover={{ color: 'red' }}>
              <Link href="https://coinmarketcap.com/currencies/nftnetwork/" target='_blank'>
                Coinmarketcap
              </Link>
            </ListItem>
            <ListItem cursor="pointer" _hover={{ color: 'red' }}>
              <Link href="https://www.coingecko.com/en/coins/nftnetwork" target='_blank'>
                Coingecko
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </WrapItem>
      <WrapItem w={{ xl: '23%', md: '23%', base: '100%' }}>
        <Box>
          <Text
            fontSize="xl"
            color="white"
            fontWeight="bold"
            mb="30px"
            mt="15px"
          >
            Social
          </Text>
          <UnorderedList listStyleType="none" marginStart="none" mb="20px">
            <ListItem cursor="pointer" _hover={{ color: 'red' }}>
              <Link href="#" target='_blank'>
                Twitter
              </Link>
            </ListItem>
            <ListItem cursor="pointer" _hover={{ color: 'red' }}>
              <Link href="#" target='_blank'>
                Telegram
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
      </WrapItem>
      <WrapItem w={{ xl: '23%', md: '20%', base: '100%' }}>
        <Box>
          <Text
            fontSize="xl"
            color="white"
            fontWeight="bold"
            mb="30px"
            mt="15px"
          >
            T&C
          </Text>
          <UnorderedList listStyleType="none" marginStart="none">
            <ListItem
              cursor="pointer"
              _hover={{ color: 'red' }}
              onClick={onOpen}
            >
              <Box>Disclaimer</Box>
              <ModalDisclaimer
                isOpen={isOpen}
                onClose={onClose}
                onAccept={() => { }}
                withoutAccept
              />
            </ListItem>
          </UnorderedList>
        </Box>
      </WrapItem>
      <WrapItem
        display="flex"
        alignItems="center"
        w={{ xl: '23%', md: '30%', sm: '40%', base: '100%' }}
      >
        <Box>
          <Image src="/nft-logo.svg" alt="logo footer" mt="15px" />
          <Text align="center" fontSize="xs" color="white" fontWeight="regular">
            &copy; Copyright {new Date().getFullYear()} <br /> CROWD
          </Text>
          <Box display="flex" justifyContent="center" mt="1rem">
            <FormControl w="3.5rem" display="flex">
              <Select
                size="xs"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">En</option>
                <option value="tr">Tr</option>
                <option value="fr">Fr</option>
                <option value="cn">Cn</option>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </WrapItem>
    </Wrap>
  );
};
