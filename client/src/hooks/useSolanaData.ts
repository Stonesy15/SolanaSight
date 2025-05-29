import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSolanaMetrics,
  fetchDefiProtocols,
  fetchWalletFlows,
  fetchTransactionVolume,
  refreshAllData,
} from "@/lib/api";
import type { SolanaMetrics, DefiProtocol, WalletFlow, TransactionVolume } from "@/types/solana";

export function useSolanaMetrics() {
  return useQuery<SolanaMetrics>({
    queryKey: ["/api/solana/metrics"],
    queryFn: fetchSolanaMetrics,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider stale after 2 minutes
  });
}

export function useDefiProtocols() {
  return useQuery<DefiProtocol[]>({
    queryKey: ["/api/defi/protocols"],
    queryFn: fetchDefiProtocols,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000, // Consider stale after 5 minutes
  });
}

export function useWalletFlows(days: number = 7) {
  return useQuery<WalletFlow[]>({
    queryKey: ["/api/wallet-flows", days],
    queryFn: () => fetchWalletFlows(days),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 10 * 60 * 1000, // Consider stale after 10 minutes
  });
}

export function useTransactionVolume(days: number = 30) {
  return useQuery<TransactionVolume[]>({
    queryKey: ["/api/transaction-volume", days],
    queryFn: () => fetchTransactionVolume(days),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 10 * 60 * 1000, // Consider stale after 10 minutes
  });
}

export function useRefreshData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: refreshAllData,
    onSuccess: () => {
      // Invalidate all relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["/api/solana/metrics"] });
      queryClient.invalidateQueries({ queryKey: ["/api/defi/protocols"] });
      queryClient.invalidateQueries({ queryKey: ["/api/wallet-flows"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transaction-volume"] });
    },
  });
}
