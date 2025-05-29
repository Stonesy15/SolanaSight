import { apiRequest } from "./queryClient";

export async function fetchSolanaMetrics() {
  const response = await apiRequest("GET", "/api/solana/metrics");
  return response.json();
}

export async function fetchDefiProtocols() {
  const response = await apiRequest("GET", "/api/defi/protocols");
  return response.json();
}

export async function fetchWalletFlows(days: number = 7) {
  const response = await apiRequest("GET", `/api/wallet-flows?days=${days}`);
  return response.json();
}

export async function fetchTransactionVolume(days: number = 30) {
  const response = await apiRequest("GET", `/api/transaction-volume?days=${days}`);
  return response.json();
}

export async function refreshAllData() {
  const response = await apiRequest("POST", "/api/refresh");
  return response.json();
}
