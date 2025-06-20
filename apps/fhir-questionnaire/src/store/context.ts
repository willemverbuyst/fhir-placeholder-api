import React, { createContext } from "react";
import type { ConvertedQuestionnaire } from "../interfaces/questionnaire";
import type { Actions } from "./actions";

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
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});
