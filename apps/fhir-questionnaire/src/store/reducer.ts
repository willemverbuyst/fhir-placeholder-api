import { ActionTypes, type Actions } from "./actions";
import type { InitialState } from "./context";

export const stateReducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.ToggleDebugger:
      return { ...state, showDebugger: !state.showDebugger };

    case ActionTypes.SetQuestionnaire:
      return { ...state, questionnaire: action.payload };

    default:
      return state;
  }
};
