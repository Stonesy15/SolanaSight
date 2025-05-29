import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const solanaMetrics = pgTable("solana_metrics", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  dailyTxCount: integer("daily_tx_count").notNull(),
  activeWallets: integer("active_wallets").notNull(),
  totalVolume: decimal("total_volume", { precision: 15, scale: 2 }).notNull(),
  solPrice: decimal("sol_price", { precision: 10, scale: 6 }).notNull(),
  priceChange24h: decimal("price_change_24h", { precision: 5, scale: 2 }).notNull(),
});

export const defiProtocols = pgTable("defi_protocols", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tvl: decimal("tvl", { precision: 15, scale: 2 }).notNull(),
  volume24h: decimal("volume_24h", { precision: 15, scale: 2 }).notNull(),
  change24h: decimal("change_24h", { precision: 5, scale: 2 }).notNull(),
  users24h: integer("users_24h").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const walletFlows = pgTable("wallet_flows", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  inflow: decimal("inflow", { precision: 15, scale: 2 }).notNull(),
  outflow: decimal("outflow", { precision: 15, scale: 2 }).notNull(),
});

export const transactionVolume = pgTable("transaction_volume", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  volume: decimal("volume", { precision: 15, scale: 2 }).notNull(),
  txCount: integer("tx_count").notNull(),
});

export const insertSolanaMetricsSchema = createInsertSchema(solanaMetrics).omit({
  id: true,
  timestamp: true,
});

export const insertDefiProtocolSchema = createInsertSchema(defiProtocols).omit({
  id: true,
  lastUpdated: true,
});

export const insertWalletFlowSchema = createInsertSchema(walletFlows).omit({
  id: true,
});

export const insertTransactionVolumeSchema = createInsertSchema(transactionVolume).omit({
  id: true,
});

export type SolanaMetrics = typeof solanaMetrics.$inferSelect;
export type InsertSolanaMetrics = z.infer<typeof insertSolanaMetricsSchema>;
export type DefiProtocol = typeof defiProtocols.$inferSelect;
export type InsertDefiProtocol = z.infer<typeof insertDefiProtocolSchema>;
export type WalletFlow = typeof walletFlows.$inferSelect;
export type InsertWalletFlow = z.infer<typeof insertWalletFlowSchema>;
export type TransactionVolume = typeof transactionVolume.$inferSelect;
export type InsertTransactionVolume = z.infer<typeof insertTransactionVolumeSchema>;
