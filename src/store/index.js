// src/store.js
import { create } from 'zustand';

const useStore = create((set) => ({
  isAuthenticated: false,
  selectedFlight: null,
  selectedAirlineId: null,

  currentFlightInfo: {
    date: '',
    airlineName: '',
    flightId: '',
  },

  // profileInfo: {
  //   id: null,
  //   username: null,
  //   email: null,
  //   first_name: null,
  //   last_name: null,
  //   convoyName: null,
  //   phoneNumber: null,
  //   profilePicture: null,
  // },
  // setProfile: (newProfile) =>
  //   set((state) => ({ profile: { ...state.profile, ...newProfile } })),

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

  setCurrentFlightInfo: (val) => set({ currentFlightInfo: val }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),

  setProfileInfo: (val) => set({ profileInfo: val }),

  setSelectedFlight: (val) => set({ selectedFlight: val }),
  setSelectedAirlineId: (val) => set({ selectedAirlineId: val }),

  // setPassengerAdultCount: (val) => set({ passengersAdultCount: val }),
  // setPassengerBabyCount: (val) => set({ passengersBabyCount: val }),

  addAdult: () =>
    set((state) => ({
      passengers: {
        ...state.passengers,
        adults: [
          ...state.passengers.adults,
          {
            id: Math.random(),
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
      passengers: {
        ...state.passengers,
        adults: state.passengers.adults.slice(0, -1),
      },
    })),

  addBaby: () =>
    set((state) => ({
      passengers: {
        ...state.passengers,
        babies: [
          ...state.passengers.babies,
          {
            id: Math.random(),
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
