import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { formatCurrency } from "@/lib/solana";

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StakingModal({ isOpen, onClose }: StakingModalProps) {
  const [amount, setAmount] = useState("");
  const [validatorType, setValidatorType] = useState("native");

  const stakingAmount = parseFloat(amount) || 0;
  
  // APY rates
  const apy = validatorType === "native" ? 7.2 : 8.5;
  
  // Calculate projected earnings
  const dailyEarnings = (stakingAmount * apy / 100) / 365;
  const monthlyEarnings = (stakingAmount * apy / 100) / 12;
  const yearlyEarnings = stakingAmount * apy / 100;

  const validators = [
    { name: "Solana Foundation", apy: 7.2, commission: "5%" },
    { name: "Figment Networks", apy: 7.1, commission: "8%" },
    { name: "Shinobi Systems", apy: 7.3, commission: "6%" },
  ];

  const liquidStakingPools = [
    { name: "Marinade Finance", apy: 8.5, token: "mSOL" },
    { name: "Jito", apy: 8.3, token: "jitoSOL" },
    { name: "Lido", apy: 8.1, token: "stSOL" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Stake SOL</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Staking Amount */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Staking Amount</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount" className="text-gray-300">Amount (SOL)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white mt-1"
                />
                <div className="text-sm text-gray-400 mt-1">
                  Available: 45.67 SOL
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAmount("10")}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  10 SOL
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAmount("25")}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  25 SOL
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAmount("45.67")}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Max
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Validator Type Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Staking Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={validatorType} onValueChange={setValidatorType}>
                <div className="flex items-center space-x-2 p-4 border border-gray-600 rounded-lg hover:border-purple-500 transition-colors">
                  <RadioGroupItem value="native" id="native" className="border-gray-400" />
                  <div className="flex-1">
                    <label htmlFor="native" className="text-white font-medium cursor-pointer">
                      Native Staking
                    </label>
                    <p className="text-sm text-gray-400">
                      Stake directly with validators. Higher security, 21-day unstaking period.
                    </p>
                    <div className="text-sm text-green-400 mt-1">~7.2% APY</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-4 border border-gray-600 rounded-lg hover:border-purple-500 transition-colors">
                  <RadioGroupItem value="liquid" id="liquid" className="border-gray-400" />
                  <div className="flex-1">
                    <label htmlFor="liquid" className="text-white font-medium cursor-pointer">
                      Liquid Staking
                    </label>
                    <p className="text-sm text-gray-400">
                      Receive liquid staking tokens. Instant liquidity, DeFi compatibility.
                    </p>
                    <div className="text-sm text-green-400 mt-1">~8.5% APY</div>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Validator/Pool Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">
                {validatorType === "native" ? "Select Validator" : "Select Liquid Staking Pool"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(validatorType === "native" ? validators : liquidStakingPools).map((option, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 border border-gray-600 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
                  >
                    <div>
                      <div className="text-white font-medium">{option.name}</div>
                      {validatorType === "native" ? (
                        <div className="text-sm text-gray-400">Commission: {(option as any).commission}</div>
                      ) : (
                        <div className="text-sm text-gray-400">Receive: {(option as any).token}</div>
                      )}
                    </div>
                    <div className="text-green-400 font-medium">{option.apy}% APY</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Projected Earnings */}
          {stakingAmount > 0 && (
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Projected Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">{formatCurrency(dailyEarnings)}</div>
                    <div className="text-sm text-gray-400">Daily</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">{formatCurrency(monthlyEarnings)}</div>
                    <div className="text-sm text-gray-400">Monthly</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-white">{formatCurrency(yearlyEarnings)}</div>
                    <div className="text-sm text-gray-400">Yearly</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600 rounded-lg">
                  <div className="text-sm text-blue-300">
                    <strong>Important:</strong> Staking rewards are estimates and may vary based on network conditions. 
                    {validatorType === "native" && " Native staking has a 21-day unstaking period."}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-white hover:bg-gray-800">
              Cancel
            </Button>
            <Button 
              disabled={!stakingAmount || stakingAmount <= 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Stake {amount} SOL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}