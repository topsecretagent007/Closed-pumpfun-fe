export type ChartTable = {
  table: {
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
  }[];
};

export type Chart = {
  time: number;
  opens: number[];
  highs: number[];
  lows: number[];
  closes: number[];
};

export interface userInfo {
  _id?: string;
  name: string;
  wallet: string;
  avatar?: string;
  isLedger?: Boolean;
  signature?: string;
}

export interface metadataInfo {
  name: string,
  symbol: string,
  image: string,
  description: string,
  presale: number,
  createdOn: string,
  twitter?: string,
  website?: string,
  instagram?: string,
  telegram?: string,
}

export interface coinInfo {
  progressMcap: number;
  progressCurve: number;
  lamportReserves: number;
  tokenReserves: any;
  commit: any;
  _id?: string;
  name: string;
  creator: string | userInfo;
  ticker: string;
  url: string;
  reserveOne: number;
  reserveTwo: number;
  token: string;
  tokenSupply?: number;
  marketcap?: number;
  presale?: number;
  replies?: number;
  description?: string;
  twitter?: string;
  website?: string;
  telegram?: string;
  date?: Date;
  bondingCurve: boolean;
  volume?: number;
}

export interface createCoinInfo {
  name: string,
  ticker: string,
  url: string,
  description: string,
  presale: number,
  tokenSupply: number,
  virtualReserves: number,
  twitter?: string,
  website?: string,
  instagram?: string,
  telegram?: string,
  decimals?: number,
}

export interface launchDataInfo {
  presale: number;
  virtualReserves: number;
  tokenSupply: number;
  name: string,
  symbol: string,
  uri: string,
  decimals: number
}

export interface tradeInfo {
  creator: string | coinInfo;
  record: recordInfo[];
}

export interface holderInfo {
  account: string;
  owner: string;
  percentage: number;
  amount: number;
  slice: string
}

export interface recordInfo {
  swapDirection: number;
  holder: userInfo;
  time: Date;
  amount: number;
  tokenAmount: number;
  price: number;
  tx: string;
  amountIn: number;
  amountOut: number;
}

export interface CharTable {
  table: {
    time: number;
    low: number;
    high: number;
    open: number;
    close: number;
    volume: number;
  }[];
}
export interface Bar {
  time: number;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
}

export interface PeriodParamsInfo {
  from: number;
  to: number;
  countBack: number;
  firstDataRequest: boolean;
}

export type SwapInfo = {
  creator: string;
  solAmountInLamports: number;
  direction: "Bought" | "Sold";
  mintAddress: string;
  mintName: string;
  mintSymbol: string;
  mintUri: string;
};
