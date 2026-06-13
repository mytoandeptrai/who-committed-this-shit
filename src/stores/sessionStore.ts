import { createCookieStorage } from '@/lib/cookie-storage';
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ISessionStore {
  status: 'waiting' | 'ready';
  user: Record<string, unknown> | null;
  accessToken: string;
  refreshToken: string;
  setAccessToken: (data: string) => void;
  setRefreshToken: (data: string) => void;
  setUser: (data: Record<string, unknown> | null) => void;
  clearSession: () => void;
}

const useBaseSessionStore = create<ISessionStore>()(
  persist(
    (set) => ({
      status: 'waiting',
      user: null,
      accessToken: '',
      refreshToken: '',
      setAccessToken: (data) => set((state) => ({ ...state, accessToken: data })),
      setRefreshToken: (data) => set((state) => ({ ...state, refreshToken: data })),
      setUser: (data) => set((state) => ({ ...state, user: data })),
      clearSession: () =>
        set(() => ({
          status: 'ready',
          accessToken: '',
          refreshToken: '',
          user: null,
        })),
    }),
    {
      name: 'session-store',
      storage: createJSONStorage(() =>
        createCookieStorage({
          expires: 7,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
      ),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        state.status = 'ready';
      },
    }
  )
);

export const useSessionStore = createSelectorFunctions(useBaseSessionStore);
