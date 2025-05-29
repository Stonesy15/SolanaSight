import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, formatCurrency, formatPercentage } from "@/lib/solana";

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number | string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  isLoading?: boolean;
  prefix?: string;
  suffix?: string;
  changeLabel?: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  iconBgColor,
  isLoading = false,
  prefix = "",
  suffix = "",
  changeLabel = "vs yesterday",
}: StatCardProps) {
  const isPositiveChange = change !== undefined && parseFloat(change.toString()) >= 0;
  
  const formatValue = (val: number | string) => {
    if (prefix === "$") {
      return formatCurrency(parseFloat(val.toString()));
    }
    return prefix + formatNumber(val) + suffix;
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div className="h-5 bg-gray-700 rounded w-12"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-7 bg-gray-700 rounded w-20 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-28"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          {change !== undefined && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              isPositiveChange 
                ? "text-green-400 bg-green-400/10" 
                : "text-red-400 bg-red-400/10"
            }`}>
              {formatPercentage(change)}
            </span>
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white mb-2">{formatValue(value)}</p>
        {change !== undefined && (
          <p className="text-xs text-gray-500">
            <span className={isPositiveChange ? "text-green-400" : "text-red-400"}>
              {isPositiveChange ? "+" : ""}{formatPercentage(change)}
            </span>
            {" "}
            {changeLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
