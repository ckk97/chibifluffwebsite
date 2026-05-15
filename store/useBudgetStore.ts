import { create } from 'zustand';
import { Product } from '../types/products';
import { safeLocalStorage } from '../utils/safeStorage';

export interface CartItem extends Product {
  quantity: number;
  isPartOfBox: boolean;
  lineTotalAmount: number;
}

interface BudgetState {
  budget: number;
  currentTotal: number;
  cartItems: CartItem[];
  isSurprise: boolean;
  canCheckout: boolean;
  setBudget: (amount: number) => void;
  addItem: (product: Product, isPartOfBox: boolean) => void;
  removeItem: (productId: string, isPartOfBox: boolean) => void;
  deleteItem: (productId: string, isPartOfBox: boolean) => void;
  setSurpriseMode: (active: boolean) => void;
  loadPersistedState: () => void;
}

const STORAGE_KEY = 'chibi-cart-v12';

/**
 * useBudgetStore - Aligned with FRONTEND_CONTRACT.md
 * Handles isPartOfBox, isPork, and canCheckout logic.
 */
export const useBudgetStore = create<BudgetState>((set, get) => ({
  budget: 30,
  currentTotal: 0,
  cartItems: [],
  isSurprise: false,
  canCheckout: false,

  setBudget: (amount: number) => {
    set({ budget: Math.max(30, amount) });
    updateCheckoutStatus(get, set);
    saveState(get());
  },

  addItem: (product, isPartOfBox) => {
    const { budget, currentTotal, cartItems } = get();
    const price = product.basePrice.amount;
    
    if (isPartOfBox && currentTotal + price > budget) {
      return;
    }

    const existing = cartItems.find(i => i.id === product.id && !!i.isPartOfBox === !!isPartOfBox);
    const newItems: CartItem[] = existing 
      ? cartItems.map(i => (i.id === product.id && !!i.isPartOfBox === !!isPartOfBox) 
          ? { ...i, quantity: i.quantity + 1, lineTotalAmount: (i.quantity + 1) * price } 
          : i)
      : [...cartItems, { ...product, quantity: 1, isPartOfBox, lineTotalAmount: price }];

    const newState = {
      cartItems: newItems,
      currentTotal: isPartOfBox ? currentTotal + price : currentTotal,
    };
    
    set(newState);
    updateCheckoutStatus(get, set);
    saveState({ ...get(), ...newState });
  },

  removeItem: (id, isPartOfBox) => {
    const { cartItems, currentTotal } = get();
    const existing = cartItems.find(i => i.id === id && !!i.isPartOfBox === !!isPartOfBox);
    if (!existing) return;

    const price = existing.basePrice.amount;
    const newItems: CartItem[] = existing.quantity > 1
      ? cartItems.map(i => (i.id === id && !!i.isPartOfBox === !!isPartOfBox) 
          ? { ...i, quantity: i.quantity - 1, lineTotalAmount: (i.quantity - 1) * price } 
          : i)
      : cartItems.filter(i => !(i.id === id && !!i.isPartOfBox === !!isPartOfBox));

    const newState = {
      cartItems: newItems,
      currentTotal: isPartOfBox ? currentTotal - price : currentTotal,
    };

    set(newState);
    updateCheckoutStatus(get, set);
    saveState({ ...get(), ...newState });
  },

  deleteItem: (id, isPartOfBox) => {
    const { cartItems, currentTotal } = get();
    const existing = cartItems.find(i => i.id === id && !!i.isPartOfBox === !!isPartOfBox);
    if (!existing) return;

    const newItems = cartItems.filter(i => !(i.id === id && !!i.isPartOfBox === !!isPartOfBox));

    const newState = {
      cartItems: newItems,
      currentTotal: isPartOfBox ? currentTotal - (existing.basePrice.amount * existing.quantity) : currentTotal,
    };

    set(newState);
    updateCheckoutStatus(get, set);
    saveState({ ...get(), ...newState });
  },

  setSurpriseMode: (active) => {
    const { cartItems } = get();
    const newState: Partial<BudgetState> = active 
      ? { isSurprise: true, currentTotal: 0, cartItems: cartItems.filter(i => !i.isPartOfBox) }
      : { isSurprise: false };
    
    set(newState);
    updateCheckoutStatus(get, set);
    saveState({ ...get(), ...newState });
  },

  loadPersistedState: () => {
    try {
      const saved = safeLocalStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        set(parsed);
      }
    } catch (e) {
      console.warn('BudgetStore: Failed to parse persisted state', e);
    }
  }
}));

/**
 * updateCheckoutStatus - Implements the canCheckout logic from the contract.
 * DIY Mode: Must meet budget exactly.
 * Surprise Mode: Always can checkout if active (backend handles filling).
 */
function updateCheckoutStatus(get: any, set: any) {
  const { isSurprise, currentTotal, budget, cartItems } = get();
  const isEmpty = cartItems.length === 0 && !isSurprise;
  
  let canCheckout = false;
  if (isSurprise) {
    canCheckout = true;
  } else {
    // If they have box items, they must meet the budget exactly
    const hasBoxItems = cartItems.some((i: any) => i.isPartOfBox);
    if (hasBoxItems) {
      canCheckout = currentTotal === budget;
    } else {
      canCheckout = cartItems.length > 0;
    }
  }

  set({ canCheckout: canCheckout && !isEmpty });
}

// Helper to save state to localStorage
function saveState(state: any) {
  try {
    const { budget, currentTotal, cartItems, isSurprise, canCheckout } = state;
    safeLocalStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, currentTotal, cartItems, isSurprise, canCheckout }));
  } catch (e) {
    console.warn('BudgetStore: Failed to save state', e);
  }
}
