import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSolanaMetrics, useRefreshData } from "@/hooks/useSolanaData";
import { formatCurrency, formatPercentage, getTimeAgo } from "@/lib/solana";

export default function Header() {
  const { data: metrics, isLoading } = useSolanaMetrics();
  const refreshMutation = useRefreshData();
  const { toast } = useToast();

  const handleRefresh = async () => {
    try {
      await refreshMutation.mutateAsync();
      toast({
        title: "Data refreshed",
        description: "All dashboard data has been updated with the latest information.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-xl font-bold text-white">Solana Analytics</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* SOL Price Ticker */}
          <div className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <div className="flex flex-col">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-600 rounded w-12 mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-8"></div>
                </div>
              ) : (
                <>
                  <span className="text-sm font-semibold text-white">
                    {metrics ? formatCurrency(parseFloat(metrics.solPrice)) : "--"}
                  </span>
                  <span className={`text-xs ${
                    metrics && parseFloat(metrics.priceChange24h) >= 0 
                      ? "text-green-400" 
                      : "text-red-400"
                  }`}>
                    {metrics ? formatPercentage(metrics.priceChange24h) : "--"}
                  </span>
                </>
              )}
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="text-sm text-gray-400">
            Last updated: {metrics ? getTimeAgo(metrics.timestamp) : "--"}
          </div>
          
          {/* Refresh Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshMutation.isPending}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 ${refreshMutation.isPending ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>
    </header>
  );
}
