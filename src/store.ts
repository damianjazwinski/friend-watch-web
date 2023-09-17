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
  setOwned: (circles: ICircle[]) => void;
  setJoined: (circles: ICircle[]) => void;
  addMembersToOwnCircle: (circle: ICircle) => void;
  addMembersToJoinedCircle: (circle: ICircle) => void;
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
  isWatchesSubmenuOpen: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  setCircleSubmenuOpen: (isOpen: boolean) => void;
  setWatchesSubmenuOpen: (isOpen: boolean) => void;
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
    isWatchesSubmenuOpen: false,
    openDrawer: () => set(() => ({ isDrawerOpen: true })),
    closeDrawer: () => set(() => ({ isDrawerOpen: false })),
    setCircleSubmenuOpen: (isOpen: boolean) =>
      set(() => ({ isCircleSubmenuOpen: isOpen })),
    setWatchesSubmenuOpen: (isOpen: boolean) =>
      set(() => ({ isWatchesSubmenuOpen: isOpen })),
  }))
);

export const useCircleStore = create<CircleStore>()(
  devtools((set) => ({
    owned: [],
    joined: [],
    setOwned: (circles) => set(() => ({ owned: circles })),
    setJoined: (circles) => set(() => ({ joined: circles })),
    addMembersToOwnCircle: (circleToExtend) =>
      set(({ owned }) => {
        const targetCircleIndex = owned.findIndex(
          (ownedCircle) => ownedCircle.id === circleToExtend.id
        );
        const ownedEdited = [
          ...owned.slice(0, targetCircleIndex),
          circleToExtend,
          ...owned.slice(targetCircleIndex + 1),
        ];
        return { owned: ownedEdited };
      }),
    addMembersToJoinedCircle: (circleToExtend) =>
      set(({ joined }) => {
        const targetCircleIndex = joined.findIndex(
          (joinedCircle) => joinedCircle.id === circleToExtend.id
        );

        const joinedEdited = [
          ...joined.slice(0, targetCircleIndex),
          circleToExtend,
          ...joined.slice(targetCircleIndex + 1),
        ];
        return { joined: joinedEdited };
      }),
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
