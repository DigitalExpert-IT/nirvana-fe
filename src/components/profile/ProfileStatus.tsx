import React from 'react';
import { useTranslation } from 'react-i18next';
import { useBnbBalance } from 'hooks/contract/bnb';
import {
  ProfilePicture,
} from './ProfilePicture';
import { AddressText } from './AddressText';
import {
  Stack,
  Box,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';

export const ProfileStatus = () => {
  const { t } = useTranslation();
  const [isLarge] = useMediaQuery('(min-width: 800px)');
  const address = useAddress();
  const {data: balance} = useBnbBalance();
  return (
    <Stack direction={{ base: 'column', md: 'row' }}>
      <Stack w="100%" alignItems="center" justify="center">
        <ProfilePicture address={address} position="relative" />
      </Stack>
      <Box w="100%">
        <Heading size="lg">{t("profile.my")}</Heading>
        <AddressText
          shortenAddress
          boxProps={{
            color: 'blue.500',
            fontSize: 'sm',
            mt: '0.5rem',
          }}
        >
          {address ?? ''}
        </AddressText>
        <Text color="gray.500" fontSize="sm" mt="0.5rem">
          {isLarge
            ? `${t('profile.balance')} : ` + balance?.value
            : `${t('profile.balance')} : ` + balance?.value
        }
        </Text>
      </Box>
    </Stack>
  );
};
