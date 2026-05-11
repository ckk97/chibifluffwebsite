import { create } from 'zustand';
import { Product } from '../types/products';

export interface CartItem extends Product {
  quantity: number;
  isInBudgetBox: boolean;
}

interface BudgetState {
  budget: number;
  currentTotal: number;
  cartItems: CartItem[];
  isSurprise: boolean;
  setBudget: (amount: number) => void;
  addItem: (product: Product, isInBudgetBox: boolean) => void;
  removeItem: (productId: string, isInBudgetBox: boolean) => void;
  deleteItem: (productId: string, isInBudgetBox: boolean) => void;
  setSurpriseMode: (active: boolean) => void;
  loadPersistedState: () => void;
}

const STORAGE_KEY = 'chibi-cart-v11';

/**
 * useBudgetStore - Manual persistence version for maximum stability.
 * Bypasses zustand/middleware to avoid ESM/import.meta errors on web.
 */
export const useBudgetStore = create<BudgetState>((set, get) => ({
  budget: 30,
  currentTotal: 0,
  cartItems: [],
  isSurprise: false,

  setBudget: (amount: number) => {
    set({ budget: Math.max(30, amount) });
    saveState(get());
  },

  addItem: (product, isInBudgetBox) => {
    const { budget, currentTotal, cartItems } = get();
    
    if (isInBudgetBox && currentTotal + product.price > budget) {
      return;
    }

    const existing = cartItems.find(i => i.id === product.id && !!i.isInBudgetBox === !!isInBudgetBox);
    const newItems = existing 
      ? cartItems.map(i => (i.id === product.id && !!i.isInBudgetBox === !!isInBudgetBox) ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cartItems, { ...product, quantity: 1, isInBudgetBox }];

    const newState = {
      cartItems: newItems,
      currentTotal: isInBudgetBox ? currentTotal + product.price : currentTotal,
    };
    
    set(newState);
    saveState({ ...get(), ...newState });
  },

  removeItem: (id, isInBudgetBox) => {
    const { cartItems, currentTotal } = get();
    const existing = cartItems.find(i => i.id === id && !!i.isInBudgetBox === !!isInBudgetBox);
    if (!existing) return;

    const newItems = existing.quantity > 1
      ? cartItems.map(i => (i.id === id && !!i.isInBudgetBox === !!isInBudgetBox) ? { ...i, quantity: i.quantity - 1 } : i)
      : cartItems.filter(i => !(i.id === id && !!i.isInBudgetBox === !!isInBudgetBox));

    const newState = {
      cartItems: newItems,
      currentTotal: isInBudgetBox ? currentTotal - existing.price : currentTotal,
    };

    set(newState);
    saveState({ ...get(), ...newState });
  },

  deleteItem: (id, isInBudgetBox) => {
    const { cartItems, currentTotal } = get();
    const existing = cartItems.find(i => i.id === id && !!i.isInBudgetBox === !!isInBudgetBox);
    if (!existing) return;

    const newItems = cartItems.filter(i => !(i.id === id && !!i.isInBudgetBox === !!isInBudgetBox));

    const newState = {
      cartItems: newItems,
      currentTotal: isInBudgetBox ? currentTotal - (existing.price * existing.quantity) : currentTotal,
    };

    set(newState);
    saveState({ ...get(), ...newState });
  },

  setSurpriseMode: (active) => {
    const { cartItems } = get();
    const newState: Partial<BudgetState> = active 
      ? { isSurprise: true, currentTotal: 0, cartItems: cartItems.filter(i => !i.isInBudgetBox) }
      : { isSurprise: false };
    
    set(newState);
    saveState({ ...get(), ...newState });
  },

  loadPersistedState: () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set(parsed);
      }
    } catch (e) {
      console.warn('Failed to load persisted state', e);
    }
  }
}));

// Helper to save state to localStorage
function saveState(state: any) {
  if (typeof window === 'undefined') return;
  try {
    const { budget, currentTotal, cartItems, isSurprise } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, currentTotal, cartItems, isSurprise }));
  } catch (e) {
    console.warn('Failed to save state', e);
  }
}
