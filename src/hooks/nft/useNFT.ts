import { useAddress, useOwnedNFTs } from "@thirdweb-dev/react"
import { CARD_IMAGE_MAP } from "constant/image";
import { NFT } from "crowd-contract/typechain-types";
import type { NFT as NFTType } from "@thirdweb-dev/react";
import { fromBn } from "evm-bn";
import { useNftCrowdContract } from "hooks/nft"
import { useEffect, useState } from "react";

type OwnedToken = Awaited<ReturnType<NFT["ownedTokenMap"]>>;

interface IMergedData {
    metadata: NFTType,
    blockChainData: OwnedToken,
    image: string;
}

export const useNFT = () => {
    const {contract} = useNftCrowdContract()
    const address = useAddress();
    const {data, isLoading, error} = useOwnedNFTs(contract, address)
    const [mergedData, setMergedData] = useState<IMergedData[]>([])


    const GetEachNFTData = (id: string) => {
        const data = contract.call("ownedTokenMap",[id]);
        
        return data as unknown as OwnedToken
    }

    useEffect(() => {
        if(data){
            const fetch = async () => {
                const fetchedData = await Promise.all(
                    data.map(async (item) => {
                        const blockChainData = await GetEachNFTData(item.metadata.id)
                        const image = CARD_IMAGE_MAP[fromBn(blockChainData?.cardId, 1)]

                        return {
                            metadata: {...item},
                            blockChainData,
                            image
                        }
                    })
                )
                setMergedData(fetchedData)
            }
            fetch()
        }
    }, [data])

    

    return {mergedData, isLoading, error}
}