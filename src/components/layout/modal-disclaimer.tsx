import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    Checkbox,
  } from '@chakra-ui/react';
  import { useState } from 'react';
import { DisclaimerConst } from 'constant/discalimer';
 import { ButtonCustom } from 'components/ui';
  
  interface ModalDisclaimerProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
    withoutAccept?: boolean;
  }
  
  export const ModalDisclaimer: React.FC<ModalDisclaimerProps> = (props) => {
    const { onClose, isOpen, onAccept, withoutAccept } = props;
    const [agree, setAgree] = useState(false);
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg={'blackAlpha.500'}
          backdropFilter="blur(5px) hue-rotate(15deg)"
        />
        <ModalContent bg={'#212428'}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as="h2" size={'xl'} textAlign="center" mb={'1rem'}>
              Disclaimer
            </Heading>
            <Text fontSize={'sm'}>{DisclaimerConst.disclaimer}</Text>
          </ModalBody>
          {!withoutAccept && (
            <ModalFooter display={'block'}>
              <Checkbox
                my={3}
                onChange={(e) => {
                  setAgree(e.target.checked);
                }}
              >
                I agree and accept
              </Checkbox>
              <ButtonCustom
                boxProps={{ my: 1, onClick: onClose, w: 'full' }}
                onClick={onAccept}
                isDisabled={!agree}
              >
                Accept
              </ButtonCustom>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    );
  };
  