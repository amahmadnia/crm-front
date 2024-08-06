// src/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isAuthenticated: false,
  selectedFlight: null,
  selectedAirlineId: null,

  passengersAdultCount: 1,
  passengersBabyCount: 0,

  passengers: {
    adults: [
      {
        id: 1,
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        passportNumber: '',
      },
    ],
    babies: [],
  },

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  setSelectedFlight: (val) => set({ selectedFlight: val }),
  setSelectedAirlineId: (val) => set({ selectedAirlineId: val }),

  setPassengerAdultCount: (val) => set({ passengersAdultCount: val }),
  setPassengerBabyCount: (val) => set({ passengersBabyCount: val }),

  addAdult: () =>
    set((state) => ({
      passengersAdultCount: state.passengersAdultCount + 1,
      passengers: {
        ...state.passengers,
        adults: [
          ...state.passengers.adults,
          {
            id: state.passengersAdultCount + 1,
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            passportNumber: '',
          },
        ],
      },
    })),

  removeAdult: () =>
    set((state) => ({
      passengersAdultCount: Math.max(0, state.passengersAdultCount - 1),
      passengers: {
        ...state.passengers,
        adults: state.passengers.adults.slice(0, -1),
      },
    })),

  addBaby: () =>
    set((state) => ({
      passengersBabyCount: state.passengersBabyCount + 1,
      passengers: {
        ...state.passengers,
        babies: [
          ...state.passengers.babies,
          {
            id: state.passengersBabyCount + 1,
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: '',
            passportNumber: '',
          },
        ],
      },
    })),

  removeBaby: () =>
    set((state) => ({
      passengersBabyCount: Math.max(0, state.passengersBabyCount - 1),
      passengers: {
        ...state.passengers,
        babies: state.passengers.babies.slice(0, -1),
      },
    })),

  updatePassengerDetails: (type, id, details) =>
    set((state) => ({
      passengers: {
        ...state.passengers,
        [type]: state.passengers[type].map((p) =>
          p.id === id ? { ...p, ...details } : p
        ),
      },
    })),
}));

export default useStore;
