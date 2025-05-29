import { 
  SolanaMetrics, 
  InsertSolanaMetrics,
  DefiProtocol,
  InsertDefiProtocol,
  WalletFlow,
  InsertWalletFlow,
  TransactionVolume,
  InsertTransactionVolume
} from "@shared/schema";

export interface IStorage {
  // Solana Metrics
  getLatestSolanaMetrics(): Promise<SolanaMetrics | undefined>;
  createSolanaMetrics(metrics: InsertSolanaMetrics): Promise<SolanaMetrics>;
  
  // DeFi Protocols
  getAllDefiProtocols(): Promise<DefiProtocol[]>;
  getDefiProtocolByName(name: string): Promise<DefiProtocol | undefined>;
  createOrUpdateDefiProtocol(protocol: InsertDefiProtocol): Promise<DefiProtocol>;
  
  // Wallet Flows
  getWalletFlows(days: number): Promise<WalletFlow[]>;
  createWalletFlow(flow: InsertWalletFlow): Promise<WalletFlow>;
  
  // Transaction Volume
  getTransactionVolume(days: number): Promise<TransactionVolume[]>;
  createTransactionVolume(volume: InsertTransactionVolume): Promise<TransactionVolume>;
}

export class MemStorage implements IStorage {
  private solanaMetrics: Map<number, SolanaMetrics>;
  private defiProtocols: Map<number, DefiProtocol>;
  private walletFlows: Map<number, WalletFlow>;
  private transactionVolumes: Map<number, TransactionVolume>;
  private currentId: number;

  constructor() {
    this.solanaMetrics = new Map();
    this.defiProtocols = new Map();
    this.walletFlows = new Map();
    this.transactionVolumes = new Map();
    this.currentId = 1;
  }

  async getLatestSolanaMetrics(): Promise<SolanaMetrics | undefined> {
    const metrics = Array.from(this.solanaMetrics.values());
    return metrics.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  }

  async createSolanaMetrics(insertMetrics: InsertSolanaMetrics): Promise<SolanaMetrics> {
    const id = this.currentId++;
    const metrics: SolanaMetrics = {
      ...insertMetrics,
      id,
      timestamp: new Date(),
    };
    this.solanaMetrics.set(id, metrics);
    return metrics;
  }

  async getAllDefiProtocols(): Promise<DefiProtocol[]> {
    return Array.from(this.defiProtocols.values());
  }

  async getDefiProtocolByName(name: string): Promise<DefiProtocol | undefined> {
    return Array.from(this.defiProtocols.values()).find(p => p.name === name);
  }

  async createOrUpdateDefiProtocol(insertProtocol: InsertDefiProtocol): Promise<DefiProtocol> {
    const existing = await this.getDefiProtocolByName(insertProtocol.name);
    
    if (existing) {
      const updated: DefiProtocol = {
        ...existing,
        ...insertProtocol,
        lastUpdated: new Date(),
      };
      this.defiProtocols.set(existing.id, updated);
      return updated;
    } else {
      const id = this.currentId++;
      const protocol: DefiProtocol = {
        ...insertProtocol,
        id,
        lastUpdated: new Date(),
      };
      this.defiProtocols.set(id, protocol);
      return protocol;
    }
  }

  async getWalletFlows(days: number): Promise<WalletFlow[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return Array.from(this.walletFlows.values())
      .filter(flow => new Date(flow.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async createWalletFlow(insertFlow: InsertWalletFlow): Promise<WalletFlow> {
    const id = this.currentId++;
    const flow: WalletFlow = {
      ...insertFlow,
      id,
    };
    this.walletFlows.set(id, flow);
    return flow;
  }

  async getTransactionVolume(days: number): Promise<TransactionVolume[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return Array.from(this.transactionVolumes.values())
      .filter(volume => new Date(volume.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  async createTransactionVolume(insertVolume: InsertTransactionVolume): Promise<TransactionVolume> {
    const id = this.currentId++;
    const volume: TransactionVolume = {
      ...insertVolume,
      id,
    };
    this.transactionVolumes.set(id, volume);
    return volume;
  }
}

export const storage = new MemStorage();
