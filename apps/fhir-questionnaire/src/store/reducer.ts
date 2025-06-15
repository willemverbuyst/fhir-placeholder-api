import { InitialState } from "./context";
import { Actions, ActionTypes } from "./actions";

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
