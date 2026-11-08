export interface CartLine {
  /** Unique per product + size combination. */
  key: string;
  productId: string;
  size: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
}

export interface DemoOrder {
  number: string;
  placedAt: string;
  email: string;
  name: string;
  city: string;
  paymentMethod: string;
  lines: CartLine[];
  totals: CartTotals;
}
