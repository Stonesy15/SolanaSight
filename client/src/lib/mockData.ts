// Client-side data generation for UI demonstration
export function generateTransactionVolumeData(days: number = 30) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: (Math.random() * 300 + 500) * 1000000, // $500M-$800M
    });
  }
  
  return data;
}

export function generateWalletFlowData(days: number = 7) {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      inflow: (Math.random() * 200 + 300) * 1000000, // $300-500M
      outflow: -((Math.random() * 150 + 250) * 1000000), // $250-400M (negative for visualization)
    });
  }
  
  return data;
}

export function generateSolanaMetrics() {
  return {
    id: 1,
    timestamp: new Date(),
    dailyTxCount: Math.floor(Math.random() * 1000000) + 2000000, // 2-3M range
    activeWallets: Math.floor(Math.random() * 500000) + 800000, // 800K-1.3M range
    totalVolume: ((Math.random() * 500 + 500) * 1000000).toString(), // $500M-$1B range
    solPrice: (Math.random() * 50 + 100).toFixed(2), // $100-$150 range
    priceChange24h: ((Math.random() - 0.5) * 20).toFixed(2), // -10% to +10% range
  };
}

export function generateDefiProtocols() {
  const protocols = [
    { name: "Raydium", baseColor: "#8b5cf6" },
    { name: "Serum", baseColor: "#10b981" },
    { name: "Marinade", baseColor: "#f59e0b" },
    { name: "Orca", baseColor: "#ef4444" },
    { name: "Solend", baseColor: "#06b6d4" },
  ];

  return protocols.map((protocol, index) => ({
    id: index + 1,
    name: protocol.name,
    tvl: ((Math.random() * 800 + 400) * 1000000).toString(), // $400M-$1.2B range
    volume24h: ((Math.random() * 200 + 100) * 1000000).toString(), // $100M-$300M range
    change24h: ((Math.random() - 0.5) * 20).toFixed(1), // -10% to +10% range
    users24h: Math.floor(Math.random() * 40000) + 15000, // 15K-55K range
    lastUpdated: new Date(),
  }));
}

export function generatePieChartData() {
  const protocols = generateDefiProtocols();
  const colors = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
  const totalTVL = protocols.reduce((sum, protocol) => sum + parseFloat(protocol.tvl), 0);
  
  return protocols.map((protocol, index) => ({
    name: protocol.name,
    value: totalTVL > 0 ? (parseFloat(protocol.tvl) / totalTVL) * 100 : 0,
    tvl: protocol.tvl,
    color: colors[index % colors.length],
  }));
}

export function generateInsights(): Array<{
  type: 'positive' | 'negative' | 'neutral' | 'warning';
  title: string;
  message: string;
  icon: string;
}> {
  const metrics = generateSolanaMetrics();
  const protocols = generateDefiProtocols();
  const insights: Array<{
    type: 'positive' | 'negative' | 'neutral' | 'warning';
    title: string;
    message: string;
    icon: string;
  }> = [];

  const priceChange = parseFloat(metrics.priceChange24h);
  if (Math.abs(priceChange) > 3) {
    insights.push({
      type: priceChange > 0 ? "positive" : "negative",
      title: priceChange > 0 ? "Strong Price Movement" : "Price Decline",
      message: `SOL price ${priceChange > 0 ? "surged" : "dropped"} ${Math.abs(priceChange).toFixed(1)}% in 24h, ${priceChange > 0 ? "reaching" : "falling to"} $${metrics.solPrice}.`,
      icon: priceChange > 0 ? "trending-up" : "alert-triangle",
    });
  }

  const volume = parseFloat(metrics.totalVolume);
  if (volume > 700000000) {
    insights.push({
      type: "positive",
      title: "High Volume Activity",
      message: `Daily volume reached $${(volume / 1000000).toFixed(0)}M, indicating strong trading activity across DeFi protocols.`,
      icon: "activity",
    });
  }

  insights.push({
    type: "neutral",
    title: "Network Activity",
    message: `${(metrics.activeWallets / 1000).toFixed(0)}K active wallets with ${(metrics.dailyTxCount / 1000000).toFixed(1)}M transactions processed efficiently.`,
    icon: "users",
  });

  if (protocols.length > 0) {
    const topProtocol = protocols.reduce((prev, current) => 
      parseFloat(current.tvl) > parseFloat(prev.tvl) ? current : prev
    );
    
    const topChange = parseFloat(topProtocol.change24h);
    if (Math.abs(topChange) > 5) {
      insights.push({
        type: topChange > 0 ? "positive" : "warning",
        title: "TVL Movement",
        message: `${topProtocol.name} TVL ${topChange > 0 ? "increased" : "decreased"} by ${Math.abs(topChange).toFixed(1)}% to $${(parseFloat(topProtocol.tvl) / 1000000).toFixed(0)}M.`,
        icon: topChange > 0 ? "trending-up" : "alert-triangle",
      });
    }
  }

  return insights;
}