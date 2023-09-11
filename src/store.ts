import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICircle, IInvitation } from "./types";

// TODO: Add invitations store
interface InvitationStore {
  sent: IInvitation[];
  received: IInvitation[];
  setSent: (invitations: IInvitation[]) => void;
  setReceived: (invitations: IInvitation[]) => void;
}

interface CircleStore {
  owned: ICircle[];
  joined: ICircle[];
  circleWithMembers: ICircle;
  setOwned: (circles: ICircle[]) => void;
  setJoined: (circles: ICircle[]) => void;
  setCircleWithMembers: (circle: ICircle) => void;
}

interface UserStore {
  isLoggedIn: boolean;
  username: string;
  id: number;
  login: () => void;
  logout: () => void;
  setUserData: (id: number, username: string) => void;
}

interface SideMenuStore {
  isCircleSubmenuOpen: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCircleSubmenu: () => void;
  closeCircleSubmenu: () => void;
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
    isDrawerOpen: false,
    isCircleSubmenuOpen: true,
    openDrawer: () => set(() => ({ isDrawerOpen: true })),
    closeDrawer: () => set(() => ({ isDrawerOpen: false })),
    openCircleSubmenu: () => set(() => ({ isCircleSubmenuOpen: true })),
    closeCircleSubmenu: () => set(() => ({ isCircleSubmenuOpen: false })),
  }))
);

export const useCircleStore = create<CircleStore>()(
  devtools((set) => ({
    owned: [],
    joined: [],
    circleWithMembers: {} as ICircle,
    setOwned: (circles) => set(() => ({ owned: circles })),
    setJoined: (circles) => set(() => ({ joined: circles })),
    setCircleWithMembers: (circle) =>
      set(() => ({ circleWithMembers: circle })),
  }))
);

export const useInvitationStore = create<InvitationStore>()(
  devtools((set) => ({
    sent: [],
    received: [],
    setSent: (invitations) => set(() => ({ sent: invitations })),
    setReceived: (invitations) => set(() => ({ received: invitations })),
  }))
);
