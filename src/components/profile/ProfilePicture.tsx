import React, { useMemo } from 'react';
import { AspectRatio, AspectRatioProps, Box, Image } from '@chakra-ui/react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { NIL_ADDRESS } from 'constant/address';

interface ProfilePictureProps extends AspectRatioProps {
  address?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rank?: any;
}

const RankAssetMap = {
  Common: 'common.png',
  Rare: 'rare.png',
  SuperRare: 'super-rare.png',
  Epic: 'epic.png',
  Legend: 'legend.png',
  SuperLegend: 'super-legend.png',
};

export const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
  const { rank, ...rest } = props;
  const usedAddress = props.address ?? NIL_ADDRESS;

  const rankAsset = useMemo(() => {
    return RankAssetMap[rank as 'Common'] ?? RankAssetMap.Common;
  }, [rank]);

  return (
    <Box position="relative" {...rest}>
      <AspectRatio
        ratio={1}
        w="80px"
        position="absolute"
        top="-15px"
        right="-25px"
        zIndex={2}
      >
        <Box
          p={2}
          bg="radial-gradient(ellipse at center, rgba(241,111,92,1) 0%, rgba(149,93,148,1) 0%, rgba(149,93,148,0) 64%, rgba(149,93,148,0) 100%)"
          borderRadius="full"
        >
          <Image src={`/rank/${rankAsset}`} alt={rank} loading="lazy" />
        </Box>
      </AspectRatio>
      <AspectRatio borderRadius="full" overflow="hidden" ratio={1} w="100px">
        <Jazzicon diameter={150} seed={jsNumberForAddress(usedAddress)} />
      </AspectRatio>
    </Box>
  );
};
