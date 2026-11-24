import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  productName: string;
  type: string; // "OPC" | "PPC" | "HD" | "SUPER"
  quantity: number;
  unit: string;
  image?: string | undefined;
  timestamp: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: { productName: string; type: string; quantity: number; unit?: string; image?: string | undefined }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPackets: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "pvr_traders_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // storage unavailable
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items, isLoaded]);

  const addToCart = ({
    productName,
    type,
    quantity,
    unit = "Packets",
    image,
  }: {
    productName: string;
    type: string;
    quantity: number;
    unit?: string;
    image?: string | undefined;
  }) => {
    const safeQty = Math.max(1, Number(quantity) || 1);
    const id = `${productName.toLowerCase().replace(/\s+/g, "-")}-${type.toLowerCase()}`;

    setItems((prev) => {
      const existing = prev.find((it) => it.id === id);
      if (existing) {
        return prev.map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + safeQty, timestamp: Date.now() } : it,
        );
      }
      return [
        ...prev,
        {
          id,
          productName,
          type,
          quantity: safeQty,
          unit,
          image,
          timestamp: Date.now(),
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const safeQty = Math.max(1, Number(quantity) || 1);
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: safeQty } : it)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const totalPackets = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPackets,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
