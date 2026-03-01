import { eq } from "drizzle-orm";
import { InsertOrder, orders } from "../drizzle/schema";
import { getDb } from "./db";

export async function createOrder(data: InsertOrder) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(data);
  const insertId = (result as unknown as [{ insertId: number }])[0].insertId;
  const rows = await db.select().from(orders).where(eq(orders.id, insertId)).limit(1);
  return rows[0];
}

export async function getOrderBySessionId(stripeSessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, stripeSessionId))
    .limit(1);
  return rows[0] ?? null;
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const rows = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function markOrderPaid(
  stripeSessionId: string,
  stripePaymentIntentId: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(orders)
    .set({ status: "paid", stripePaymentIntentId })
    .where(eq(orders.stripeSessionId, stripeSessionId));
}
