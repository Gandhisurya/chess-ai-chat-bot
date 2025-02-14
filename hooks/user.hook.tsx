import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  refId?: string;
  userId?: string;
  userName: string;
  email: string;
  accessToken: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set((state) => ({ ...state, user })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "chessai",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useUser = () => {
  const { user, setUser, clearUser } = useStore();
  return {
    user,
    setUser,
    clearUser,
  };
};
