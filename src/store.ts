import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
}
const checkLocalStorage = (): boolean => {
  const tokenExpirations = localStorage["tokenExpirations"];
  if (!tokenExpirations) return false;

  const { refreshTokenExpiration } = JSON.parse(tokenExpirations);
  return Date.now() < refreshTokenExpiration;
};

export const useUserStore = create<UserStore>()((set) => ({
  // global state
  isLoggedIn: checkLocalStorage(),
  username: "",
  id: 0,
  // reducers
  login: () => set((state) => ({ ...state, isLoggedIn: true })),
  logout: () => set((state) => ({ ...state, isLoggedIn: false })),
}));
