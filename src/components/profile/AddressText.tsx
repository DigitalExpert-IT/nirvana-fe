import React, { useEffect, useState } from 'react';
import {
    BoxProps,
    Text,
    Tooltip,
    useClipboard,
    useDisclosure,
    Stack,
    TextProps,
    useMediaQuery,
    Icon,
} from '@chakra-ui/react';
import { FaRegCopy } from 'react-icons/fa';
import { shorthenAddress } from 'utils/shortenAddress';
import { useRouter } from 'next/router';

export interface AddressTextProps {
    shortenAddress?: boolean;
    children: string;
    boxProps?: BoxProps;
    textProps?: TextProps;
    onlyAddress?: boolean;
}

export const AddressText = (props: AddressTextProps) => {
    const router = useRouter();
    const [isLarge] = useMediaQuery('(min-width: 800px)');
    const [defaultHost, setDefaultHost] = useState('');
    const { children, boxProps, textProps, onlyAddress } = props;
    const { onCopy, hasCopied } = useClipboard(
        onlyAddress ? children : defaultHost + children
    );
    const { onOpen, onClose, isOpen } = useDisclosure();

    useEffect(() => {
        // setResolution(isLarge);
        if (router.isReady) {
            setDefaultHost(`${window.location.protocol}//${window.location.host}/register?ref=`);
        }

    }, [router.isReady]);

    return (
        <Tooltip
            label={hasCopied ? 'Copied!' : 'Copy'}
            placement="top"
            isOpen={isOpen}
        >
            <Stack
                direction="row"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                onClick={onCopy}
                cursor="pointer"
                display="flex"
                // alignItems="center"
                {...boxProps}
            >
                <Text
                    color="gray.300"
                    _hover={{
                        color: 'gray.50',
                    }}
                    {...textProps}
                >
                    {isLarge ? children : shorthenAddress(children)}
                    {/* {shortenAddress ? shorthenAddress(children) : children} */}
                </Text>
                <Icon as={FaRegCopy} ml="10px" />
            </Stack>
        </Tooltip>
    );
};
