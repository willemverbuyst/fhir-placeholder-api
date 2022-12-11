import React, { createContext, useReducer } from 'react';
import { ConvertedQuestionnaire } from '../interfaces/questionnaire';

type InitialState = {
  showDebugger: boolean;
  questionnaire: ConvertedQuestionnaire | null;
};

const initialState: InitialState = {
  showDebugger: false,
  questionnaire: null,
};

type ActionMap<M extends { [key: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export const ActionTypes = {
  ToggleDebugger: 'TOGGLE_DEBUGGER',
  SetQuestionnaire: 'SET_QUESTIONNAIRE',
} as const;

type DebugPayload = {
  [ActionTypes.ToggleDebugger]: undefined;
};

type QuestionnairePayload = {
  [ActionTypes.SetQuestionnaire]: ConvertedQuestionnaire;
};

export type Actions =
  | ActionMap<DebugPayload>[keyof ActionMap<DebugPayload>]
  | ActionMap<QuestionnairePayload>[keyof ActionMap<QuestionnairePayload>];

export const AppContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const stateReducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ToggleDebugger:
      return { ...state, showDebugger: !state.showDebugger };

    case ActionTypes.SetQuestionnaire:
      return { ...state, questionnaire: action.payload };

    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
