import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/solana";

interface TokenBalance {
  id: number;
  asset: string;
  symbol: string;
  balance: number;
  price: number;
  value: number;
  logo?: string;
}

export default function BalancePanel() {
  // Generate placeholder token balances
  const tokenBalances: TokenBalance[] = [
    {
      id: 1,
      asset: "Solana",
      symbol: "SOL",
      balance: 45.67,
      price: 142.35,
      value: 45.67 * 142.35,
    },
    {
      id: 2,
      asset: "USD Coin",
      symbol: "USDC",
      balance: 1250.00,
      price: 1.00,
      value: 1250.00 * 1.00,
    },
    {
      id: 3,
      asset: "Raydium",
      symbol: "RAY",
      balance: 156.23,
      price: 8.45,
      value: 156.23 * 8.45,
    },
    {
      id: 4,
      asset: "Serum",
      symbol: "SRM",
      balance: 89.45,
      price: 0.67,
      value: 89.45 * 0.67,
    },
    {
      id: 5,
      asset: "Dogwifhat",
      symbol: "WIF",
      balance: 2340.12,
      price: 2.89,
      value: 2340.12 * 2.89,
    },
    {
      id: 6,
      asset: "Bonk",
      symbol: "BONK",
      balance: 123456.78,
      price: 0.000034,
      value: 123456.78 * 0.000034,
    },
  ];

  const totalValue = tokenBalances.reduce((sum, token) => sum + token.value, 0);

  const getTokenColor = (index: number) => {
    const colors = ["#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#ec4899"];
    return colors[index % colors.length];
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">Portfolio Balance</CardTitle>
          <div className="text-right">
            <div className="text-sm text-gray-400">Total Value</div>
            <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-sm font-medium text-gray-400">Asset</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Balance</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Price</th>
                <th className="pb-3 text-sm font-medium text-gray-400 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {tokenBalances.map((token, index) => (
                <tr
                  key={token.id}
                  className="border-b border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: getTokenColor(index) + "20" }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: getTokenColor(index) }}
                        >
                          {token.symbol.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{token.asset}</div>
                        <div className="text-sm text-gray-400">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-medium text-white">
                    {formatNumber(token.balance)}
                  </td>
                  <td className="py-4 text-right text-white">
                    {formatCurrency(token.price)}
                  </td>
                  <td className="py-4 text-right font-semibold text-white">
                    {formatCurrency(token.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Portfolio Performance (24h)</span>
            <span className="text-green-400">+$127.34 (+2.1%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}