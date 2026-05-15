/**
 * safeStorage.ts
 * A robust wrapper for localStorage that catches SecurityErrors and access denials.
 * Prevents the application from crashing in restricted browser environments.
 */

export const safeLocalStorage = {
  getItem: (name: string): string | null => {
    try {
      // Accessing window.localStorage can throw a SecurityError in some browsers
      if (typeof window === 'undefined') return null;
      const storage = window['localStorage'];
      if (!storage) return null;
      return storage.getItem(name);
    } catch (e) {
      console.warn(`[SafeStorage] Denied access to getItem("${name}"):`, e);
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      if (typeof window === 'undefined') return;
      const storage = window['localStorage'];
      if (!storage) return;
      storage.setItem(name, value);
    } catch (e) {
      console.warn(`[SafeStorage] Denied access to setItem("${name}"):`, e);
    }
  },
  removeItem: (name: string): void => {
    try {
      if (typeof window === 'undefined') return;
      const storage = window['localStorage'];
      if (!storage) return;
      storage.removeItem(name);
    } catch (e) {
      console.warn(`[SafeStorage] Denied access to removeItem("${name}"):`, e);
    }
  },
};
