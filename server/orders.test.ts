import { describe, expect, it, vi, beforeEach } from "vitest";

// Mock the DB helpers so tests run without a real database
vi.mock("./orderDb", () => ({
  createOrder: vi.fn(async (data) => ({
    id: 1,
    ...data,
    stripeSessionId: null,
    stripePaymentIntentId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  getOrderBySessionId: vi.fn(async (sessionId: string) => {
    if (sessionId === "cs_test_valid") {
      return {
        id: 1,
        stripeSessionId: "cs_test_valid",
        stripePaymentIntentId: "pi_test_123",
        status: "paid",
        productName: "The Briefcase",
        quantity: 1,
        amountCents: 49900,
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        customerPhone: null,
        companyName: null,
        abn: null,
        shippingLine1: "1 Trade St",
        shippingLine2: null,
        shippingCity: "Melbourne",
        shippingState: "VIC",
        shippingPostcode: "3000",
        shippingCountry: "Australia",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return null;
  }),
  getOrderById: vi.fn(async (id: number) => {
    if (id === 1) {
      return {
        id: 1,
        stripeSessionId: "cs_test_valid",
        stripePaymentIntentId: null,
        status: "pending",
        productName: "The Briefcase",
        quantity: 1,
        amountCents: 49900,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerPhone: null,
        companyName: null,
        abn: null,
        shippingLine1: "2 Cable Ave",
        shippingLine2: null,
        shippingCity: "Sydney",
        shippingState: "NSW",
        shippingPostcode: "2000",
        shippingCountry: "Australia",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    return null;
  }),
}));

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkout: {
        sessions: {
          create: vi.fn(async () => ({
            id: "cs_test_mock_session",
            url: "https://checkout.stripe.com/pay/cs_test_mock_session",
          })),
        },
      },
    })),
  };
});

// Mock getDb for the inline update in createCheckout
vi.mock("./db", () => ({
  getDb: vi.fn(async () => ({
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(async () => undefined),
      })),
    })),
  })),
}));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function makeCtx(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { origin: "https://example.com" },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("orders.getBySessionId", () => {
  it("returns an order for a valid session ID", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.orders.getBySessionId({ sessionId: "cs_test_valid" });
    expect(result).not.toBeNull();
    expect(result?.customerName).toBe("Jane Smith");
    expect(result?.status).toBe("paid");
  });

  it("returns null for an unknown session ID", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.orders.getBySessionId({ sessionId: "cs_test_unknown" });
    expect(result).toBeNull();
  });
});

describe("orders.getById", () => {
  it("returns an order for a valid ID", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.orders.getById({ id: 1 });
    expect(result).not.toBeNull();
    expect(result?.productName).toBe("The Briefcase");
    expect(result?.amountCents).toBe(49900);
  });

  it("returns null for an unknown ID", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.orders.getById({ id: 9999 });
    expect(result).toBeNull();
  });
});

describe("orders.createCheckout", () => {
  it("returns a checkout URL and order ID", async () => {
    const caller = appRouter.createCaller(makeCtx());
    const result = await caller.orders.createCheckout({
      customerName: "Test User",
      customerEmail: "test@example.com",
      shippingLine1: "1 Test St",
      shippingCity: "Brisbane",
      shippingState: "QLD",
      shippingPostcode: "4000",
      shippingCountry: "Australia",
    });
    expect(result.checkoutUrl).toContain("stripe.com");
    expect(result.orderId).toBe(1);
  });
});
