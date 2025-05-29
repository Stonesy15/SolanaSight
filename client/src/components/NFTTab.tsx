import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, List, Flame, Plus, ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/solana";

interface NFT {
  id: number;
  name: string;
  collection: string;
  image: string;
  price: number;
  rarity: string;
}

export default function NFTTab() {
  // Generate placeholder NFT data
  const nfts: NFT[] = [
    {
      id: 1,
      name: "DeGods #1234",
      collection: "DeGods",
      image: "🔥",
      price: 45.6,
      rarity: "Legendary",
    },
    {
      id: 2,
      name: "SMB #5678",
      collection: "Solana Monkey Business",
      image: "🐒",
      price: 12.3,
      rarity: "Rare",
    },
    {
      id: 3,
      name: "Okay Bears #9012",
      collection: "Okay Bears",
      image: "🐻",
      price: 8.7,
      rarity: "Common",
    },
    {
      id: 4,
      name: "Famous Fox #3456",
      collection: "Famous Fox Federation",
      image: "🦊",
      price: 15.2,
      rarity: "Epic",
    },
  ];

  const totalValue = nfts.reduce((sum, nft) => sum + nft.price, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "text-orange-400";
      case "Epic": return "text-purple-400";
      case "Rare": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Digital Collectibles</h2>
          <p className="text-gray-400">Manage your NFT portfolio</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Total Value</div>
          <div className="text-xl font-bold text-white">{formatCurrency(totalValue)}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Browse Collections
        </Button>
        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
          <ExternalLink className="h-4 w-4 mr-2" />
          View on Magic Eden
        </Button>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <Card key={nft.id} className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors">
            <CardHeader className="p-4">
              <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center text-6xl mb-3">
                {nft.image}
              </div>
              <div>
                <CardTitle className="text-lg text-white truncate">{nft.name}</CardTitle>
                <p className="text-sm text-gray-400">{nft.collection}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${getRarityColor(nft.rarity)}`}>
                  {nft.rarity}
                </span>
                <span className="text-lg font-bold text-white">
                  {formatCurrency(nft.price)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Send className="h-3 w-3 mr-1" />
                  Transfer
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-gray-600 text-white hover:bg-gray-800">
                  <List className="h-3 w-3 mr-1" />
                  List
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-900">
                  <Flame className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Collection Stats */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Collection Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{nfts.length}</div>
              <div className="text-sm text-gray-400">Total NFTs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{new Set(nfts.map(n => n.collection)).size}</div>
              <div className="text-sm text-gray-400">Collections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
              <div className="text-sm text-gray-400">Portfolio Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">+12.5%</div>
              <div className="text-sm text-gray-400">24h Change</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}