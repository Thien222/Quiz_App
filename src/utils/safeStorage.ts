import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StateStorage } from 'zustand/middleware';

const memoryFallback: Record<string, string> = {};

/**
 * Safe AsyncStorage wrapper for Zustand persist middleware.
 * If AsyncStorage native module is null (e.g. during certain bundling/web/simulator edge cases),
 * it seamlessly falls back to in-memory storage without throwing uncaught native errors.
 */
export const safeAsyncStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      if (typeof AsyncStorage?.getItem === 'function') {
        const val = await AsyncStorage.getItem(name);
        if (val !== null) return val;
      }
    } catch (err) {
      // Native module unavailable or error
    }
    return memoryFallback[name] ?? null;
  },

  setItem: async (name: string, value: string): Promise<void> => {
    memoryFallback[name] = value;
    try {
      if (typeof AsyncStorage?.setItem === 'function') {
        await AsyncStorage.setItem(name, value);
      }
    } catch (err) {
      // Native module unavailable or error
    }
  },

  removeItem: async (name: string): Promise<void> => {
    delete memoryFallback[name];
    try {
      if (typeof AsyncStorage?.removeItem === 'function') {
        await AsyncStorage.removeItem(name);
      }
    } catch (err) {
      // Native module unavailable or error
    }
  },
};
