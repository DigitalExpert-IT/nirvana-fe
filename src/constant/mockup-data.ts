export interface IRankNetwork {
  rank: string;
  activeDownline: string;
  totalNftBuy: string;
  leadershipBonus: string;
}

export interface IRankSystem {
  share: string;
  percent: string;
}

export interface IFarmMatching {
  level: string;
  percent: string;
  requirement: string;
}

export const RANKSYSTEM: Array<IRankSystem> = [
  {
    share: "level 1",
    percent: "8%",
  },
  {
    share: "level 2",
    percent: "3%",
  },
  {
    share: "level 3",
    percent: "2%",
  },
  {
    share: "leadershop bonus",
    percent: "20%",
  },
  {
    share: "liquidity shiba",
    percent: "10%",
  },
  {
    share: "pool reward",
    percent: "40%",
  },
];

export const FARMMATCHING: Array<IFarmMatching> = [
  {
    level: "level 1",
    percent: "5%",
    requirement: "Buy 1 NFT"
  },
  {
    level: "level 2",
    percent: "5%",
    requirement: "Buy 1 NFT"
  },
  {
    level: "level 3",
    percent: "5%",
    requirement: "Buy 1 NFT"
  },
  {
    level: "level 4",
    percent: "5%",
    requirement: "Buy 1 NFT"
  },
  {
    level: "level 5",
    percent: "5%",
    requirement: "Buy 1 NFT"
  },
  {
    level: "level 6",
    percent: "5%",
    requirement: "Buy 1 NFT + Rare Rank"
  },
  {
    level: "level 7",
    percent: "5%",
    requirement: "Buy 1 NFT + Rare Rank"
  },
  {
    level: "level 8",
    percent: "5%",
    requirement: "Buy 1 NFT + Rare Rank"
  },
  {
    level: "level 9",
    percent: "5%",
    requirement: "Buy 1 NFT + Rare Rank"
  },{
    level: "level 10",
    percent: "5%",
    requirement: "Buy 1 NFT + Rare Rank"
  }
];

export const DATA_NFT = [
  {
    id: 1,
    title: "001",
    price: "1000",
  },
  {
    id: 2,
    title: "002",
    price: "10000",
  },
  {
    id: 3,
    title: "003",
    price: "50000",
  },
  {
    id: 4,
    title: "004",
    price: "200000",
  },
  {
    id: 5,
    title: "005",
    price: "1000000",
  },
  {
    id: 6,
    title: "006",
    price: "5000000",
  },
];

export const OWNED_NFT = [
  {
    id: 1,
    title: "1",
    price: "0",
    gacha: "0.5",
    mintedAt: new Date("2024-09-12"),
    claimedAt: Date.now()
  },
  {
    id: 2,
    title: "2",
    price: "0",
    gacha: "0.5",
    mintedAt: new Date("2024-09-12"),
    claimedAt: Date.now()
  },
  {
    id: 3,
    title: "3",
    price: "0",
    gacha: "0.5",
    mintedAt: new Date("2024-09-12"),
    claimedAt: Date.now()
  },
  {
    id: 4,
    title: "4",
    price: "0",
    gacha: "0.5",
    mintedAt: new Date("2024-09-12"),
    claimedAt: Date.now()
  },
  {
    id: 5,
    title: "5",
    price: "0",
    gacha: "0.5",
    mintedAt: new Date("2024-09-12"),
    claimedAt: Date.now()
  },
];

export const RANKNETWORK: Array<IRankNetwork> = [
  {
    rank: "Rare",
    activeDownline: "50",
    totalNftBuy: "100000",
    leadershipBonus: "5%",
  },
  {
    rank: "Super Rare",
    activeDownline: "250",
    totalNftBuy: "500000",
    leadershipBonus: "10%",
  },
  {
    rank: "Epic",
    activeDownline: "1000",
    totalNftBuy: "2000000",
    leadershipBonus: "15%",
  },
  {
    rank: "Legend",
    activeDownline: "3000",
    totalNftBuy: "6000000",
    leadershipBonus: "30%",
  },
  {
    rank: "Super Legend",
    activeDownline: "6000",
    totalNftBuy: "12000000",
    leadershipBonus: "40%",
  },
];
