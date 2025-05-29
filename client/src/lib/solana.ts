import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

// Initialize Solana connection
const connection = new Connection(
  import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl("mainnet-beta"),
  "confirmed"
);

export async function getCurrentSlot(): Promise<number> {
  try {
    return await connection.getSlot();
  } catch (error) {
    console.error("Error fetching current slot:", error);
    throw error;
  }
}

export async function getAccountInfo(publicKey: string) {
  try {
    const pubKey = new PublicKey(publicKey);
    return await connection.getAccountInfo(pubKey);
  } catch (error) {
    console.error("Error fetching account info:", error);
    throw error;
  }
}

export async function getTransactionCount(): Promise<number> {
  try {
    const slot = await connection.getSlot();
    const block = await connection.getBlock(slot);
    return block?.transactions?.length || 0;
  } catch (error) {
    console.error("Error fetching transaction count:", error);
    throw error;
  }
}

export async function getRecentBlockhash() {
  try {
    return await connection.getRecentBlockhash();
  } catch (error) {
    console.error("Error fetching recent blockhash:", error);
    throw error;
  }
}

// Helper functions for data formatting
export function formatNumber(num: number | string): string {
  const value = typeof num === "string" ? parseFloat(num) : num;
  
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + "B";
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + "M";
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "K";
  }
  return value.toFixed(2);
}

export function formatCurrency(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(percent: number | string): string {
  const value = typeof percent === "string" ? parseFloat(percent) : percent;
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function getTimeAgo(timestamp: Date | string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
}
