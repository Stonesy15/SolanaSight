import { Lightbulb, TrendingUp, Users, AlertTriangle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InsightData } from "@/types/solana";

interface InsightsPanelProps {
  insights: InsightData[];
  isLoading?: boolean;
}

export default function InsightsPanel({ insights, isLoading = false }: InsightsPanelProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trending-up":
        return TrendingUp;
      case "users":
        return Users;
      case "alert-triangle":
        return AlertTriangle;
      case "activity":
        return Activity;
      default:
        return Lightbulb;
    }
  };

  const getInsightStyles = (type: InsightData["type"]) => {
    switch (type) {
      case "positive":
        return {
          border: "border-l-green-400",
          iconColor: "text-green-400",
          titleColor: "text-green-400",
        };
      case "negative":
        return {
          border: "border-l-red-400",
          iconColor: "text-red-400",
          titleColor: "text-red-400",
        };
      case "warning":
        return {
          border: "border-l-yellow-400",
          iconColor: "text-yellow-400",
          titleColor: "text-yellow-400",
        };
      default:
        return {
          border: "border-l-blue-400",
          iconColor: "text-blue-400",
          titleColor: "text-blue-400",
        };
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
            Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="p-4 bg-gray-800 rounded-lg border-l-4 border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-20"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-600 rounded w-full"></div>
                    <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = getIcon(insight.icon);
            const styles = getInsightStyles(insight.type);
            
            return (
              <div
                key={index}
                className={`p-4 bg-gray-800 rounded-lg border-l-4 ${styles.border} hover:bg-gray-700 transition-colors`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Icon className={`h-4 w-4 ${styles.iconColor}`} />
                  <span className={`text-sm font-medium ${styles.titleColor}`}>
                    {insight.title}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{insight.message}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-500 flex items-center">
            <Activity className="h-3 w-3 mr-2" />
            AI-generated insights updated every 5 minutes
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
