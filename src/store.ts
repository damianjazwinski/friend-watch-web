import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore {
  isLoggedIn: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
  setUserData: (id: number, username: string) => void;
}

interface SideMenuStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const checkLocalStorage = (): boolean => {
  const tokenExpirations = localStorage["tokenExpirations"];
  if (!tokenExpirations) return false;

  const { refreshTokenExpiration } = JSON.parse(tokenExpirations);
  return Date.now() < refreshTokenExpiration;
};

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    // global state
    isLoggedIn: checkLocalStorage(),
    username: "",
    id: 0,
    // reducers
    login: () => set(() => ({ isLoggedIn: true })),
    logout: () => set(() => ({ isLoggedIn: false, username: "", id: 0 })),
    setUserData: (id, username) => set(() => ({ id, username })),
  }))
);

export const useSideMenuStore = create<SideMenuStore>()(
  devtools((set) => ({
    isOpen: false,
    open: () => set(() => ({ isOpen: true })),
    close: () => set(() => ({ isOpen: false })),
  }))
);
