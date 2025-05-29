import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Solana connection
  const connection = new Connection(
    process.env.SOLANA_RPC_URL || clusterApiUrl("mainnet-beta"),
    "confirmed"
  );

  // Get current Solana metrics
  app.get("/api/solana/metrics", async (req, res) => {
    try {
      const metrics = await storage.getLatestSolanaMetrics();
      
      if (!metrics) {
        // Fetch fresh data if none exists
        const freshMetrics = await fetchCurrentSolanaMetrics(connection);
        const savedMetrics = await storage.createSolanaMetrics(freshMetrics);
        return res.json(savedMetrics);
      }
      
      // Check if data is stale (older than 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      if (new Date(metrics.timestamp) < fiveMinutesAgo) {
        const freshMetrics = await fetchCurrentSolanaMetrics(connection);
        const savedMetrics = await storage.createSolanaMetrics(freshMetrics);
        return res.json(savedMetrics);
      }
      
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching Solana metrics:", error);
      res.status(500).json({ error: "Failed to fetch Solana metrics" });
    }
  });

  // Get DeFi protocols data
  app.get("/api/defi/protocols", async (req, res) => {
    try {
      let protocols = await storage.getAllDefiProtocols();
      
      if (protocols.length === 0) {
        // Fetch fresh protocol data
        const protocolData = await fetchDefiProtocolsData();
        protocols = await Promise.all(
          protocolData.map(protocol => storage.createOrUpdateDefiProtocol(protocol))
        );
      }
      
      res.json(protocols);
    } catch (error) {
      console.error("Error fetching DeFi protocols:", error);
      res.status(500).json({ error: "Failed to fetch DeFi protocols data" });
    }
  });

  // Get wallet flows data
  app.get("/api/wallet-flows", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 7;
      let flows = await storage.getWalletFlows(days);
      
      if (flows.length === 0) {
        // Fetch fresh wallet flows data
        const flowsData = await fetchWalletFlowsData(days);
        flows = await Promise.all(
          flowsData.map(flow => storage.createWalletFlow(flow))
        );
      }
      
      res.json(flows);
    } catch (error) {
      console.error("Error fetching wallet flows:", error);
      res.status(500).json({ error: "Failed to fetch wallet flows data" });
    }
  });

  // Get transaction volume data
  app.get("/api/transaction-volume", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      let volumes = await storage.getTransactionVolume(days);
      
      if (volumes.length === 0) {
        // Fetch fresh transaction volume data
        const volumeData = await fetchTransactionVolumeData(days);
        volumes = await Promise.all(
          volumeData.map(volume => storage.createTransactionVolume(volume))
        );
      }
      
      res.json(volumes);
    } catch (error) {
      console.error("Error fetching transaction volume:", error);
      res.status(500).json({ error: "Failed to fetch transaction volume data" });
    }
  });

  // Refresh all data endpoint
  app.post("/api/refresh", async (req, res) => {
    try {
      // Fetch and store fresh data
      const [metrics, protocols, flows, volumes] = await Promise.all([
        fetchCurrentSolanaMetrics(connection),
        fetchDefiProtocolsData(),
        fetchWalletFlowsData(7),
        fetchTransactionVolumeData(30)
      ]);

      await storage.createSolanaMetrics(metrics);
      await Promise.all(protocols.map(p => storage.createOrUpdateDefiProtocol(p)));
      await Promise.all(flows.map(f => storage.createWalletFlow(f)));
      await Promise.all(volumes.map(v => storage.createTransactionVolume(v)));

      res.json({ message: "Data refreshed successfully" });
    } catch (error) {
      console.error("Error refreshing data:", error);
      res.status(500).json({ error: "Failed to refresh data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions for fetching external data
async function fetchCurrentSolanaMetrics(connection: Connection) {
  try {
    // Fetch SOL price from CoinGecko
    const priceResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true"
    );
    const priceData = await priceResponse.json();
    const solPrice = priceData.solana.usd;
    const priceChange24h = priceData.solana.usd_24h_change;

    // Fetch blockchain data using Solana RPC
    const slot = await connection.getSlot();
    const blockTime = await connection.getBlockTime(slot);
    
    // For demo purposes, calculate approximate daily metrics
    // In production, you'd use historical data or specialized APIs
    const dailyTxCount = Math.floor(Math.random() * 1000000) + 2000000; // 2-3M range
    const activeWallets = Math.floor(Math.random() * 500000) + 800000; // 800K-1.3M range
    const totalVolume = (Math.random() * 500 + 500) * 1000000; // $500M-$1B range

    return {
      dailyTxCount,
      activeWallets,
      totalVolume: totalVolume.toString(),
      solPrice: solPrice.toString(),
      priceChange24h: priceChange24h.toString(),
    };
  } catch (error) {
    console.error("Error fetching Solana metrics:", error);
    throw error;
  }
}

async function fetchDefiProtocolsData() {
  try {
    // In production, integrate with actual DeFi protocol APIs
    // For now, return structured data that would come from Raydium, Serum, etc.
    return [
      {
        name: "Raydium",
        tvl: "1200000000",
        volume24h: "234000000",
        change24h: "8.1",
        users24h: 45678,
      },
      {
        name: "Serum",
        tvl: "897000000",
        volume24h: "189000000",
        change24h: "5.3",
        users24h: 32156,
      },
      {
        name: "Marinade",
        tvl: "756000000",
        volume24h: "98000000",
        change24h: "-2.1",
        users24h: 18923,
      },
      {
        name: "Orca",
        tvl: "567000000",
        volume24h: "145000000",
        change24h: "12.4",
        users24h: 28456,
      },
    ];
  } catch (error) {
    console.error("Error fetching DeFi protocols data:", error);
    throw error;
  }
}

async function fetchWalletFlowsData(days: number) {
  try {
    // In production, integrate with Helius API for wallet analytics
    const flows = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      flows.push({
        date,
        inflow: (Math.random() * 200 + 300).toString() + "000000", // $300-500M
        outflow: (Math.random() * 150 + 250).toString() + "000000", // $250-400M
      });
    }
    
    return flows;
  } catch (error) {
    console.error("Error fetching wallet flows data:", error);
    throw error;
  }
}

async function fetchTransactionVolumeData(days: number) {
  try {
    const volumes = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      volumes.push({
        date,
        volume: (Math.random() * 300 + 500).toString() + "000000", // $500-800M
        txCount: Math.floor(Math.random() * 1000000) + 2000000, // 2-3M transactions
      });
    }
    
    return volumes;
  } catch (error) {
    console.error("Error fetching transaction volume data:", error);
    throw error;
  }
}
