import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Orders table — captures each purchase of The Briefcase cable stand.
 * Stripe is the source of truth for payment status; we store only the
 * identifiers needed for fulfilment and the shipping/contact details
 * collected during checkout.
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),

  // Stripe identifiers
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).unique(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),

  // Order status driven by Stripe webhook
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded"])
    .default("pending")
    .notNull(),

  // Product
  productName: varchar("productName", { length: 255 }).notNull().default("The Briefcase"),
  quantity: int("quantity").notNull().default(1),
  amountCents: int("amountCents").notNull().default(49900),

  // Customer contact
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 64 }),

  // Shipping address
  shippingLine1: varchar("shippingLine1", { length: 255 }).notNull(),
  shippingLine2: varchar("shippingLine2", { length: 255 }),
  shippingCity: varchar("shippingCity", { length: 128 }).notNull(),
  shippingState: varchar("shippingState", { length: 128 }).notNull(),
  shippingPostcode: varchar("shippingPostcode", { length: 20 }).notNull(),
  shippingCountry: varchar("shippingCountry", { length: 64 }).notNull().default("Australia"),

  // Optional: company / ABN for trade customers
  companyName: varchar("companyName", { length: 255 }),
  abn: varchar("abn", { length: 32 }),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;