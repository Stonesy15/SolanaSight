import { ArrowUpDown, Wallet, BarChart3, Lock } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import InsightsPanel from "@/components/InsightsPanel";
import DetailModal from "@/components/DetailModal";
import BalancePanel from "@/components/BalancePanel";
import NFTTab from "@/components/NFTTab";
import StakingModal from "@/components/StakingModal";
import SettingsPanel from "@/components/SettingsPanel";
import HelpPanel from "@/components/HelpPanel";
import { formatNumber, formatCurrency } from "@/lib/solana";
import { 
  generateTransactionVolumeData,
  generateWalletFlowData,
  generateSolanaMetrics,
  generateDefiProtocols,
  generatePieChartData,
  generateInsights
} from "@/lib/mockData";
import type { InsightData } from "@/types/solana";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"transactions" | "wallets" | "volume" | "tvl">("transactions");
  const [modalTitle, setModalTitle] = useState("");
  const [stakingModalOpen, setStakingModalOpen] = useState(false);

  // Use mock data for UI demonstration
  const metrics = generateSolanaMetrics();
  const protocols = generateDefiProtocols();
  const volumeChartData = generateTransactionVolumeData(30);
  const walletFlowChartData = generateWalletFlowData(7);
  const pieChartData = generatePieChartData();
  const insights: InsightData[] = generateInsights();
  
  const totalTVL = protocols.reduce((sum, protocol) => sum + parseFloat(protocol.tvl), 0);

  const handleCardClick = (type: "transactions" | "wallets" | "volume" | "tvl", title: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "staking") {
      setStakingModalOpen(true);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "nft":
        return <NFTTab />;
      case "settings":
        return <SettingsPanel />;
      case "help":
        return <HelpPanel />;
      default:
        return (
          <>
            {/* Overview Cards */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  onClick={() => handleCardClick("transactions", "Daily Transactions")}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <StatCard
                    title="Daily Transactions"
                    value={metrics.dailyTxCount}
                    change={12.5}
                    icon={ArrowUpDown}
                    iconColor="text-blue-400"
                    iconBgColor="bg-blue-400/10"
                  />
                </div>
                <div 
                  onClick={() => handleCardClick("wallets", "Active Wallets")}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <StatCard
                    title="Active Wallets (24h)"
                    value={metrics.activeWallets}
                    change={8.1}
                    icon={Wallet}
                    iconColor="text-purple-400"
                    iconBgColor="bg-purple-400/10"
                  />
                </div>
                <div 
                  onClick={() => handleCardClick("volume", "Volume (24h)")}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <StatCard
                    title="Volume (24h)"
                    value={parseFloat(metrics.totalVolume)}
                    change={-3.2}
                    icon={BarChart3}
                    iconColor="text-cyan-400"
                    iconBgColor="bg-cyan-400/10"
                    prefix="$"
                  />
                </div>
                <div 
                  onClick={() => handleCardClick("tvl", "Total TVL")}
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                >
                  <StatCard
                    title="Total TVL"
                    value={totalTVL}
                    change={15.7}
                    icon={Lock}
                    iconColor="text-green-400"
                    iconBgColor="bg-green-400/10"
                    prefix="$"
                  />
                </div>
              </div>
            </section>

            {/* Balance Panel */}
            <section className="mb-8">
              <BalancePanel />
            </section>

            {/* Charts Section */}
            <section className="mb-8" id="analytics">
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <LineChart
                  title="Transaction Volume (30 days)"
                  data={volumeChartData}
                  color="#8b5cf6"
                  valuePrefix="$"
                />
                <BarChart
                  title="Net Wallet Flows (7 days)"
                  data={walletFlowChartData}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <PieChart
                    title="TVL Distribution by Protocol"
                    data={pieChartData}
                  />
                </div>
                <div>
                  <InsightsPanel
                    insights={insights}
                  />
                </div>
              </div>
            </section>

            {/* Protocols Table */}
            <section id="protocols">
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-6">Top DeFi Protocols</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-3 text-sm font-medium text-gray-400">Protocol</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">TVL</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">24h Change</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Volume (24h)</th>
                        <th className="pb-3 text-sm font-medium text-gray-400">Users (24h)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {protocols.map((protocol, index) => {
                        const protocolColors = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
                        return (
                          <tr
                            key={protocol.id}
                            className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                          >
                            <td className="py-4">
                              <div className="flex items-center space-x-3">
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: protocolColors[index % protocolColors.length] + "20" }}
                                >
                                  <span
                                    className="text-sm font-bold"
                                    style={{ color: protocolColors[index % protocolColors.length] }}
                                  >
                                    {protocol.name.charAt(0)}
                                  </span>
                                </div>
                                <span className="font-medium text-white">{protocol.name}</span>
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-white">
                              {formatCurrency(parseFloat(protocol.tvl))}
                            </td>
                            <td className="py-4">
                              <span
                                className={`${
                                  parseFloat(protocol.change24h) >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {parseFloat(protocol.change24h) >= 0 ? "+" : ""}
                                {parseFloat(protocol.change24h).toFixed(1)}%
                              </span>
                            </td>
                            <td className="py-4 text-white">
                              {formatCurrency(parseFloat(protocol.volume24h))}
                            </td>
                            <td className="py-4 text-white">
                              {formatNumber(protocol.users24h)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar onTabChange={handleTabChange} activeTab={activeTab} />
      <div className="md:ml-64 ml-16">
        <Header />
        
        <main className="max-w-7xl mx-auto px-6 py-8" id="overview">
          {/* Overview Cards */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div 
                onClick={() => handleCardClick("transactions", "Daily Transactions")}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <StatCard
                  title="Daily Transactions"
                  value={metrics.dailyTxCount}
                  change={12.5}
                  icon={ArrowUpDown}
                  iconColor="text-blue-400"
                  iconBgColor="bg-blue-400/10"
                />
              </div>
              <div 
                onClick={() => handleCardClick("wallets", "Active Wallets")}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <StatCard
                  title="Active Wallets (24h)"
                  value={metrics.activeWallets}
                  change={8.1}
                  icon={Wallet}
                  iconColor="text-purple-400"
                  iconBgColor="bg-purple-400/10"
                />
              </div>
              <div 
                onClick={() => handleCardClick("volume", "Volume (24h)")}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <StatCard
                  title="Volume (24h)"
                  value={parseFloat(metrics.totalVolume)}
                  change={-3.2}
                  icon={BarChart3}
                  iconColor="text-cyan-400"
                  iconBgColor="bg-cyan-400/10"
                  prefix="$"
                />
              </div>
              <div 
                onClick={() => handleCardClick("tvl", "Total TVL")}
                className="cursor-pointer transform hover:scale-105 transition-transform"
              >
                <StatCard
                  title="Total TVL"
                  value={totalTVL}
                  change={15.7}
                  icon={Lock}
                  iconColor="text-green-400"
                  iconBgColor="bg-green-400/10"
                  prefix="$"
                />
              </div>
            </div>
          </section>

          {/* Charts Section */}
          <section className="mb-8" id="analytics">
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <LineChart
                title="Transaction Volume (30 days)"
                data={volumeChartData}
                color="#8b5cf6"
                valuePrefix="$"
              />
              <BarChart
                title="Net Wallet Flows (7 days)"
                data={walletFlowChartData}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PieChart
                  title="TVL Distribution by Protocol"
                  data={pieChartData}
                />
              </div>
              <div>
                <InsightsPanel
                  insights={insights}
                />
              </div>
            </div>
          </section>

          {/* Protocols Table */}
          <section id="protocols">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Top DeFi Protocols</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-3 text-sm font-medium text-gray-400">Protocol</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">TVL</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">24h Change</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Volume (24h)</th>
                      <th className="pb-3 text-sm font-medium text-gray-400">Users (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {protocols.map((protocol, index) => {
                      const protocolColors = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
                      return (
                        <tr
                          key={protocol.id}
                          className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: protocolColors[index % protocolColors.length] + "20" }}
                              >
                                <span
                                  className="text-sm font-bold"
                                  style={{ color: protocolColors[index % protocolColors.length] }}
                                >
                                  {protocol.name.charAt(0)}
                                </span>
                              </div>
                              <span className="font-medium text-white">{protocol.name}</span>
                            </div>
                          </td>
                          <td className="py-4 font-semibold text-white">
                            {formatCurrency(parseFloat(protocol.tvl))}
                          </td>
                          <td className="py-4">
                            <span
                              className={`${
                                parseFloat(protocol.change24h) >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {parseFloat(protocol.change24h) >= 0 ? "+" : ""}
                              {parseFloat(protocol.change24h).toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-4 text-white">
                            {formatCurrency(parseFloat(protocol.volume24h))}
                          </td>
                          <td className="py-4 text-white">
                            {formatNumber(protocol.users24h)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
        
        <DetailModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={modalTitle}
          type={modalType}
        />
      </div>
    </div>
  );
}