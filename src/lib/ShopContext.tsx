"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Items = Record<number, number>;
type Ctx = {
  items: Items; count: number; add: (id: number) => void; setQty: (id: number, q: number) => void;
  cartOpen: boolean; setCartOpen: (o: boolean) => void;
  cat: number; setCat: (c: number) => void;
};
const ShopContext = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Items>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cat, setCat] = useState(0);
  const add = (id: number) => setItems((s) => ({ ...s, [id]: (s[id] ?? 0) + 1 }));
  const setQty = (id: number, q: number) =>
    setItems((s) => { const n = { ...s }; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const count = Object.values(items).reduce((a, b) => a + b, 0);
  return <ShopContext.Provider value={{ items, count, add, setQty, cartOpen, setCartOpen, cat, setCat }}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const c = useContext(ShopContext);
  if (!c) throw new Error("useShop utanför ShopProvider");
  return c;
}
