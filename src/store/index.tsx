import React, { createContext, useReducer } from 'react';

type InitialState = {
  showDebugger: boolean;
  questionnaire: Record<PropertyKey, any> | null;
};

const initialState: InitialState = {
  showDebugger: false,
  questionnaire: null,
};

export type ACTIONTYPES =
  | {
      type: 'toggleDebugger';
      payload: boolean;
    }
  | { type: 'setQuestionnaire'; payload: Record<PropertyKey, any> };

export const AppContext = createContext<{
  state: InitialState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const stateReducer = (state: InitialState, action: ACTIONTYPES) => {
  switch (action.type) {
    case 'toggleDebugger':
      return { ...state, showDebugger: !state.showDebugger };

    case 'setQuestionnaire':
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
