import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/solana";

interface PieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    tvl: string;
    color: string;
  }>;
  isLoading?: boolean;
}

export default function TVLPieChart({
  title,
  data,
  isLoading = false,
}: PieChartProps) {
  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-80 flex items-center justify-center">
              <div className="animate-pulse">
                <div className="w-64 h-64 bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                      <div className="h-4 bg-gray-600 rounded w-16"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 bg-gray-600 rounded w-12 mb-1"></div>
                      <div className="h-3 bg-gray-600 rounded w-8"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalTVL = data.reduce((sum, item) => sum + parseFloat(item.tvl), 0);

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
          <div className="text-sm text-gray-400">
            Total: <span className="text-white font-medium">{formatCurrency(totalTVL)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                    }}
                    formatter={(value: any, name: string) => [
                      formatPercentage(value),
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            {data.map((protocol, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: protocol.color }}
                  ></div>
                  <span className="font-medium text-white">{protocol.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">
                    {formatCurrency(parseFloat(protocol.tvl))}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatPercentage(protocol.value)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
