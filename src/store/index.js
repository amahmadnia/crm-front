// src/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isAuthenticated: false,
  selectedFlight: null,
  selectedAirlineId: null,

  passengersAdultCount: 1,
  passengersBabyCount: 0,

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  setSelectedFlight: (val) => set({ selectedFlight: val }),
  setSelectedAirlineId: (val) => set({ selectedAirlineId: val }),

  setPassengerAdultCount: (val) => set({ passengersAdultCount: val }),
  setPassengerBabyCount: (val) => set({ passengersBabyCount: val }),
}));

export default useStore;
