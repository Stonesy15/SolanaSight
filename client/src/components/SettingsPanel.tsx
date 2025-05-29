import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, Globe, Palette, Download, Trash2 } from "lucide-react";

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-400">Manage your dashboard preferences and account settings</p>
      </div>

      {/* Notifications */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Price Alerts</Label>
              <p className="text-sm text-gray-400">Get notified when SOL price changes significantly</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Transaction Notifications</Label>
              <p className="text-sm text-gray-400">Receive alerts for wallet transactions</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Weekly Reports</Label>
              <p className="text-sm text-gray-400">Get weekly portfolio performance summaries</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
              Enable 2FA
            </Button>
          </div>
          
          <Separator className="bg-gray-700" />
          
          <div>
            <Label className="text-white">Auto-lock Timeout</Label>
            <p className="text-sm text-gray-400 mb-2">Automatically lock dashboard after inactivity</p>
            <Select defaultValue="30">
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Display Preferences */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Display
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Currency</Label>
            <p className="text-sm text-gray-400 mb-2">Display prices in your preferred currency</p>
            <Select defaultValue="usd">
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-white">Language</Label>
            <p className="text-sm text-gray-400 mb-2">Choose your preferred language</p>
            <Select defaultValue="en">
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Compact Mode</Label>
              <p className="text-sm text-gray-400">Show more data in less space</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">RPC Endpoint</Label>
            <p className="text-sm text-gray-400 mb-2">Custom Solana RPC endpoint for faster data fetching</p>
            <Input
              placeholder="https://api.mainnet-beta.solana.com"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <Label className="text-white">Helius API Key</Label>
            <p className="text-sm text-gray-400 mb-2">For enhanced wallet analytics and transaction data</p>
            <Input
              type="password"
              placeholder="Enter your Helius API key"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save API Settings
          </Button>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Export Portfolio Data</Label>
              <p className="text-sm text-gray-400">Download your portfolio history as CSV</p>
            </div>
            <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
              Export
            </Button>
          </div>
          
          <Separator className="bg-gray-700" />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white text-red-400">Clear All Data</Label>
              <p className="text-sm text-gray-400">This will reset all your dashboard preferences</p>
            </div>
            <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-900">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}