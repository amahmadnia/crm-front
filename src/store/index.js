// src/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isAuthenticated: false,
  selectedFlight: 'soo',
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setSelectedFlight: () => set({ isAuthenticated: false }),
}));

export default useStore;
