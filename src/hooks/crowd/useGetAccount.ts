import { useAddress } from "@thirdweb-dev/react";
import { useCrowdNetContract } from "./useCrowdNetContract";
import { Network } from "crowd-contract/typechain-types/contracts/Network";
import {NFT} from "crowd-contract/typechain-types/contracts/NFT";
import { useEffect, useState } from "react";
import { useNFTContract } from "./useNFTContract";

type AccountType = Awaited<ReturnType<Network["getAccount"]>>;
type RankType = Awaited<ReturnType<Network["getRank"]>>;
type FarmMatchingType = Awaited<ReturnType<NFT["rewardMatchingMap"]>>;
type SponsorMap = Awaited<ReturnType<NFT["rewardSponsorMap"]>>;

export const useGetAccount = () => {
    const {contract: netContract} = useCrowdNetContract();
    const nftContract = useNFTContract();
    const address = useAddress();
    const [data, setData] = useState<AccountType>();
    const [rank, setRank] = useState<RankType>()
    const [sponsor, setSponsor] = useState<SponsorMap>()
    const [error, setError] = useState<Error>();
    const [farmMatching, setFarmMatching] = useState<FarmMatchingType>()

    useEffect(() => {
        const checkUser = async () => {
            if (!netContract || !address) return;  

            try {
                const result = await netContract.call("getAccount", [address]);
                const sponsor = await nftContract.call("rewardSponsorMap", [address]);
                const rank = await nftContract.call("getMyRankReward", [address])
                const farmMatching = await nftContract.call("rewardMatchingMap", [address])
                setData(result as AccountType);
                setRank(rank as RankType)
                setFarmMatching(farmMatching as FarmMatchingType)
                setSponsor(sponsor as SponsorMap)
            } catch (err) {
                setError(err as Error);  
                console.error(err);
            }
        };

        checkUser();
    }, [netContract, address]);  
    return { data, farmMatching, rank, sponsor, error };  
};
