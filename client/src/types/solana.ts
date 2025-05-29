export interface SolanaMetrics {
  id: number;
  timestamp: Date;
  dailyTxCount: number;
  activeWallets: number;
  totalVolume: string;
  solPrice: string;
  priceChange24h: string;
}

export interface DefiProtocol {
  id: number;
  name: string;
  tvl: string;
  volume24h: string;
  change24h: string;
  users24h: number;
  lastUpdated: Date;
}

export interface WalletFlow {
  id: number;
  date: Date;
  inflow: string;
  outflow: string;
}

export interface TransactionVolume {
  id: number;
  date: Date;
  volume: string;
  txCount: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
    tension?: number;
  }[];
}

export interface InsightData {
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  title: string;
  message: string;
  icon: string;
}
