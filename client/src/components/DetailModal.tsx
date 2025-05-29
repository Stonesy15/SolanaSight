import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatNumber, formatCurrency } from "@/lib/solana";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: "transactions" | "wallets" | "volume" | "tvl";
}

export default function DetailModal({ isOpen, onClose, title, type }: DetailModalProps) {
  // Generate random data for each metric type
  const generateDetailData = () => {
    const data = [];
    const days = 30;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      let value = 0;
      switch (type) {
        case "transactions":
          value = Math.floor(Math.random() * 1000000) + 2000000; // 2-3M range
          break;
        case "wallets":
          value = Math.floor(Math.random() * 500000) + 800000; // 800K-1.3M range
          break;
        case "volume":
          value = (Math.random() * 500 + 500) * 1000000; // $500M-$1B range
          break;
        case "tvl":
          value = (Math.random() * 1000 + 3000) * 1000000; // $3B-$4B range
          break;
      }
      
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        value: value,
      });
    }
    
    return data;
  };

  const detailData = generateDetailData();
  const currentValue = detailData[detailData.length - 1]?.value || 0;
  const previousValue = detailData[detailData.length - 2]?.value || 0;
  const change = ((currentValue - previousValue) / previousValue) * 100;

  const formatValue = (value: number) => {
    if (type === "volume" || type === "tvl") {
      return formatCurrency(value);
    }
    return formatNumber(value);
  };

  const getMetricInfo = () => {
    switch (type) {
      case "transactions":
        return {
          description: "Total number of transactions processed on the Solana network",
          average: formatNumber(detailData.reduce((sum, item) => sum + item.value, 0) / detailData.length),
          peak: formatNumber(Math.max(...detailData.map(item => item.value))),
        };
      case "wallets":
        return {
          description: "Number of unique wallet addresses that were active in the last 24 hours",
          average: formatNumber(detailData.reduce((sum, item) => sum + item.value, 0) / detailData.length),
          peak: formatNumber(Math.max(...detailData.map(item => item.value))),
        };
      case "volume":
        return {
          description: "Total USD value of transactions processed across all protocols",
          average: formatCurrency(detailData.reduce((sum, item) => sum + item.value, 0) / detailData.length),
          peak: formatCurrency(Math.max(...detailData.map(item => item.value))),
        };
      case "tvl":
        return {
          description: "Total Value Locked across all DeFi protocols on Solana",
          average: formatCurrency(detailData.reduce((sum, item) => sum + item.value, 0) / detailData.length),
          peak: formatCurrency(Math.max(...detailData.map(item => item.value))),
        };
    }
  };

  const metricInfo = getMetricInfo();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{title} - Detailed View</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{formatValue(currentValue)}</p>
                <p className={`text-sm ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {change >= 0 ? "+" : ""}{change.toFixed(2)}% vs yesterday
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400">30-Day Average</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{metricInfo.average}</p>
                <p className="text-sm text-gray-400">Rolling average</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400">30-Day Peak</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">{metricInfo.peak}</p>
                <p className="text-sm text-gray-400">Highest recorded</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="pt-6">
              <p className="text-gray-300">{metricInfo.description}</p>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">30-Day Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={detailData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickFormatter={(value) => type === "volume" || type === "tvl" ? `$${formatNumber(value)}` : formatNumber(value)}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                      }}
                      formatter={(value: any) => [formatValue(value), "Value"]}
                      labelStyle={{ color: "#9CA3AF" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, stroke: "#8b5cf6", strokeWidth: 2, fill: "#FFFFFF" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}