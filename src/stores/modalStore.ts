import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

type TTargetInView = 'sign-in' | 'forgot-password' | 'settings' | 'notification' | '';

export type IModalStore = {
  targetInView: TTargetInView;
  setTargetInView: (target: TTargetInView) => void;
  resetTargetInView: () => void;
};

const useBaseModalStore = create<IModalStore>((set) => ({
  targetInView: '',
  setTargetInView: (target) =>
    set(() => ({
      targetInView: target,
    })),
  resetTargetInView: () =>
    set(() => ({
      targetInView: '',
    })),
}));

export const useModalStore = createSelectorFunctions(useBaseModalStore);
