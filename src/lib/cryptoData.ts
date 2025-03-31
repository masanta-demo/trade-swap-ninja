
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  iconUrl: string;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  sparkline: number[];
  description?: string;
  website?: string;
  rank?: number;
}

// Mock data for cryptocurrencies
export const mockCoins: Coin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    iconUrl: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    price: 39578.42,
    marketCap: 778456000000,
    volume24h: 21872000000,
    change24h: 2.34,
    sparkline: [39000, 39200, 39500, 39100, 39300, 39600, 39578.42],
    description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    website: "https://bitcoin.org",
    rank: 1
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    price: 2156.78,
    marketCap: 259872000000,
    volume24h: 12458000000,
    change24h: -1.25,
    sparkline: [2200, 2180, 2150, 2120, 2140, 2160, 2156.78],
    description: "Ethereum is a decentralized, open-source blockchain featuring smart contract functionality. Ether is the native cryptocurrency of the platform.",
    website: "https://ethereum.org",
    rank: 2
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    iconUrl: "https://cryptologos.cc/logos/solana-sol-logo.png",
    price: 95.42,
    marketCap: 41982000000,
    volume24h: 3567000000,
    change24h: 4.78,
    sparkline: [90, 92, 94, 93, 95, 96, 95.42],
    description: "Solana is a highly functional open source project that implements a new, high-performance, permissionless blockchain.",
    website: "https://solana.com",
    rank: 5
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    iconUrl: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    price: 0.37,
    marketCap: 13021000000,
    volume24h: 345700000,
    change24h: -0.52,
    sparkline: [0.38, 0.375, 0.37, 0.368, 0.372, 0.371, 0.37],
    description: "Cardano is a proof-of-stake blockchain platform. The open-source project aims to redistribute power from unaccountable structures to individuals.",
    website: "https://cardano.org",
    rank: 8
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    iconUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    price: 0.62,
    marketCap: 33912000000,
    volume24h: 1267000000,
    change24h: 1.45,
    sparkline: [0.61, 0.615, 0.62, 0.625, 0.618, 0.622, 0.62],
    description: "XRP is the native cryptocurrency of the XRP Ledger, which is a distributed ledger platform developed by Ripple.",
    website: "https://ripple.com/xrp",
    rank: 6
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    iconUrl: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    price: 0.079,
    marketCap: 11392000000,
    volume24h: 567800000,
    change24h: -3.12,
    sparkline: [0.082, 0.081, 0.08, 0.079, 0.078, 0.0785, 0.079],
    description: "Dogecoin is a cryptocurrency featuring a likeness of the Shiba Inu dog from the 'Doge' Internet meme as its logo.",
    website: "https://dogecoin.com",
    rank: 11
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    iconUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    price: 5.28,
    marketCap: 6751000000,
    volume24h: 234500000,
    change24h: 2.87,
    sparkline: [5.1, 5.15, 5.2, 5.25, 5.3, 5.29, 5.28],
    description: "Polkadot is a sharded heterogeneous multi-chain architecture which enables external networks as well as customized layer one 'parachains' to communicate.",
    website: "https://polkadot.network",
    rank: 12
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    iconUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    price: 218.76,
    marketCap: 33456000000,
    volume24h: 789100000,
    change24h: 0.94,
    sparkline: [216, 217, 218, 219, 218.5, 218.8, 218.76],
    description: "BNB is the native token of the Binance Chain. It is used to pay for transaction fees on the Binance exchange.",
    website: "https://www.binance.com",
    rank: 3
  }
];

// Get trending coins (just a subset with positive change in this mock)
export const getTrendingCoins = (): Coin[] => {
  return mockCoins.filter(coin => coin.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, 4);
};

// Format large numbers to K, M, B, T format
export const formatNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
};

// Format price with appropriate precision
export const formatPrice = (price: number): string => {
  if (price < 0.01) {
    return '$' + price.toFixed(6);
  }
  if (price < 1) {
    return '$' + price.toFixed(4);
  }
  if (price < 10) {
    return '$' + price.toFixed(3);
  }
  if (price < 1000) {
    return '$' + price.toFixed(2);
  }
  return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Generate mock historical price data
export const generateHistoricalData = (days: number = 30, volatility: number = 0.05): number[] => {
  const data: number[] = [];
  let price = 1000 + Math.random() * 9000; // Starting price between 1000 and 10000
  
  for (let i = 0; i < days; i++) {
    // Random price change based on volatility
    const change = price * volatility * (Math.random() - 0.5);
    price += change;
    if (price < 100) price = 100; // Prevent price from going too low
    data.push(price);
  }
  
  return data;
};

// Find a coin by ID
export const getCoinById = (id: string): Coin | undefined => {
  return mockCoins.find(coin => coin.id === id);
};

// Get all coins
export const getAllCoins = (): Coin[] => {
  return [...mockCoins];
};
