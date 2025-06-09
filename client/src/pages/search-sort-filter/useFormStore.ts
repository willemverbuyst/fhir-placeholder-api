import { create } from "zustand";
import type { FormMap } from "./FormMap";

type State = {
  resourceForm: keyof typeof FormMap | null;
};

type Action = {
  setResourceForm: (resourceForm: keyof typeof FormMap | null) => void;
};

export const useFormStore = create<State & Action>((set) => ({
  resourceForm: null,
  setResourceForm: (resourceForm) => set(() => ({ resourceForm })),
}));
