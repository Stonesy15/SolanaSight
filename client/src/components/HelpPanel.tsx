import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, MessageSquare, Book, ExternalLink, Mail } from "lucide-react";

export default function HelpPanel() {
  const faqItems = [
    {
      question: "How do I connect my Solana wallet?",
      answer: "Click on the wallet icon in the top right corner and select your preferred wallet provider (Phantom, Solflare, etc.). Make sure you have a Solana wallet extension installed in your browser."
    },
    {
      question: "What is liquid staking and how does it work?",
      answer: "Liquid staking allows you to stake SOL while receiving a liquid staking token (like mSOL, jitoSOL) that represents your staked position. You can use these tokens in DeFi while still earning staking rewards."
    },
    {
      question: "How are the portfolio values calculated?",
      answer: "Portfolio values are calculated using real-time price data from multiple sources including CoinGecko and on-chain price feeds. Token balances are fetched directly from your connected wallet."
    },
    {
      question: "Can I export my transaction history?",
      answer: "Yes, you can export your portfolio data and transaction history from the Settings panel. The data is exported in CSV format for easy analysis."
    },
    {
      question: "What fees are involved in staking?",
      answer: "Native staking typically has validator commission fees (5-10%), while liquid staking protocols may have additional protocol fees (0.5-2%). Always check the specific terms before staking."
    },
    {
      question: "How do I enable price alerts?",
      answer: "Go to Settings > Notifications and toggle on Price Alerts. You can set custom thresholds for SOL and other tokens in your portfolio."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Help & Support</h2>
        <p className="text-gray-400">Find answers to common questions and get support</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Documentation</h3>
            <p className="text-sm text-gray-400">Complete user guide and tutorials</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Community</h3>
            <p className="text-sm text-gray-400">Join our Discord community</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-700 hover:border-green-500 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Contact Support</h3>
            <p className="text-sm text-gray-400">Get help from our team</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-700 rounded-lg px-4"
              >
                <AccordionTrigger className="text-white hover:text-purple-400">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Name</label>
              <Input 
                placeholder="Your name"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <Input 
                type="email"
                placeholder="your@email.com"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Subject</label>
            <Input 
              placeholder="How can we help?"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="text-sm text-gray-300 mb-1 block">Message</label>
            <Textarea 
              placeholder="Describe your issue or question..."
              rows={5}
              className="bg-gray-800 border-gray-600 text-white resize-none"
            />
          </div>
          
          <Button className="bg-purple-600 hover:bg-purple-700">
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
            <div>
              <div className="text-white font-medium">Solana Documentation</div>
              <div className="text-sm text-gray-400">Learn about Solana blockchain fundamentals</div>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
            <div>
              <div className="text-white font-medium">Staking Guide</div>
              <div className="text-sm text-gray-400">Complete guide to Solana staking</div>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
            <div>
              <div className="text-white font-medium">DeFi Safety Tips</div>
              <div className="text-sm text-gray-400">Best practices for DeFi interactions</div>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors">
            <div>
              <div className="text-white font-medium">API Documentation</div>
              <div className="text-sm text-gray-400">For developers and advanced users</div>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}