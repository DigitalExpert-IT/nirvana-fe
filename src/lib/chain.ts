import { Mumbai, Polygon, BinanceTestnet, Binance } from "@thirdweb-dev/chains";

const CURRENT_CHAIN_ID = (process.env.NEXT_PUBLIC_CHAIN_ID || "0x89") as "0x89";

type TChain = {
  chainId: number;
  chain: string;
  name: string;
  testnet: true,
  slug: string;
  shortName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  },
  rpc: string[];
}

const chainMap = {
  "0x13881": Mumbai,
  "0x89": Polygon,
  "0x38": Binance,
  "0x61": BinanceTestnet,
  "0x29a": {
    chainId: 666,
    chain: "Devnet",
    name: "Devnet",
    testnet: true,
    slug: "devnet",
    shortName: "dvn",
    nativeCurrency: {
      name: "DTH",
      symbol: "DTH",
      decimals: 18,
    },
    rpc: ["https://rpc.tuxinity.cloud"],
  },
};

export const getActiveChain = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return chainMap[CURRENT_CHAIN_ID] as TChain | any;
};
