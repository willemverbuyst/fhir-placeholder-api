import React, { useReducer } from "react";
import { AppContext, initialState } from "./context";
import { stateReducer } from "./reducer";

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
