import { useAddress } from "@thirdweb-dev/react";
import { useCrowdNetContract } from "./useCrowdNetContract";
import { Network } from "crowd-contract/typechain-types/contracts/Network";
import {NFT} from "crowd-contract/typechain-types/contracts/NFT"
import { useEffect, useState } from "react";
import { useNftCrowdContract } from "hooks/nft";

type AccountType = Awaited<ReturnType<Network["getAccount"]>>;
type RankType = Awaited<ReturnType<Network["getRank"]>>;
type LeaderType = Awaited<ReturnType<NFT["getLeadershipReward"]>>;
type FarmMatchingType = Awaited<ReturnType<NFT["matchingPoolMap"]>>;
type SponsorMap = Awaited<ReturnType<NFT["sponsorPoolMap"]>>;

export const useGetAccount = () => {
    const {contract: netContract} = useCrowdNetContract();
    const {contract: nftContract} = useNftCrowdContract();
    const address = useAddress();
    const [data, setData] = useState<AccountType>();
    const [rank, setRank] = useState<RankType>()
    const [sponsor, setSponsor] = useState<SponsorMap>()
    const [leadership, setLeadership] = useState<LeaderType>()
    const [error, setError] = useState<Error>();
    const [farmMatching, setFarmMatching] = useState<FarmMatchingType>()

    useEffect(() => {
        const checkUser = async () => {
            if (!netContract || !address) return;  

            try {
                const result = await netContract.call("getAccount", [address]);
                const rank = await nftContract.call("getRank", [address]);
                const sponsor = await nftContract.call("sponsorPoolMap", [address]);
                const leader = await nftContract.call("getLeadershipReward", [address]);
                const farmMatching = await nftContract.call("matchingPoolMap", [address]);
                setData(result as AccountType);
                setRank(rank as RankType)
                setFarmMatching(farmMatching as FarmMatchingType)
                setSponsor(sponsor as SponsorMap)
                setLeadership(leader)
            } catch (err) {
                setError(err as Error);  
                console.error(err);
            }
        };

        checkUser();
    }, [netContract, address]);  
    return { data, farmMatching, rank, sponsor, leadership, error };  
};
