import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import { SubFooter } from './sub-footer';

const FooterBase: React.FC = () => {
  return (
    <Box w="full">
      <Box as="footer" width="full" bg="#26292d">
        <Container maxW="container.xl">
          <Box p={3}>
            <SubFooter />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const Footer = React.memo(FooterBase);
