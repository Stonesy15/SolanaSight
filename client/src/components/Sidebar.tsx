import { Home, Image, Coins, Settings, HelpCircle, Twitter, Github, MessageCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";

interface SidebarProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export default function Sidebar({ onTabChange, activeTab }: SidebarProps) {
  const [location] = useLocation();

  const navItems = [
    {
      label: "Overview",
      id: "overview",
      icon: Home,
      active: activeTab === "overview",
    },
    {
      label: "NFT",
      id: "nft",
      icon: Image,
      active: activeTab === "nft",
    },
    {
      label: "Staking",
      id: "staking",
      icon: Coins,
      active: activeTab === "staking",
    },
    {
      label: "Settings",
      id: "settings",
      icon: Settings,
      active: activeTab === "settings",
    },
    {
      label: "Help",
      id: "help",
      icon: HelpCircle,
      active: activeTab === "help",
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full md:w-64 w-16 bg-gray-900 border-r border-gray-700 z-40 transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 md:p-6 p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-white">Solana Analytics</h1>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 md:p-4 p-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 md:px-4 px-2 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-purple-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium hidden md:block">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="p-4 md:p-4 p-2 border-t border-gray-700">
          <div className="hidden md:block text-xs text-gray-400 mb-3">Connect with us</div>
          <div className="flex md:flex-row flex-col md:space-x-3 space-y-2 md:space-y-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                title={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-4 p-2 border-t border-gray-700">
          <div className="text-xs text-gray-500 space-y-1 hidden md:block">
            <p>Version 1.0.0</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}