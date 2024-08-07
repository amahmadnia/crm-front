// src/store/profileStore.js
import create from 'zustand';

const useProfileStore = create((set) => ({
  profile: {
    first_name: '',
    last_name: '',
    convoyName: '',
    username: '',
    email: '',
    phoneNumber: '',
  },
  setProfile: (newProfile) =>
    set((state) => ({ profile: { ...state.profile, ...newProfile } })),
}));

export default useProfileStore;
