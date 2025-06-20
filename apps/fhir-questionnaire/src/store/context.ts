import React, { createContext } from "react";
import type { ConvertedQuestionnaire } from "../interfaces/questionnaire";

export type InitialState = {
  showDebugger: boolean;
  questionnaire: ConvertedQuestionnaire | null;
};

export const initialState: InitialState = {
  showDebugger: false,
  questionnaire: null,
};

export const AppContext = createContext<{
  state: InitialState;
  // biome-ignore lint/suspicious/noExplicitAny: todo
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
