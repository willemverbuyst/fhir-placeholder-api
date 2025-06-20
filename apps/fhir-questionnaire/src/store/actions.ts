import type { ConvertedQuestionnaire } from "../interfaces/questionnaire";

type ActionMap<M extends { [key: string]: undefined | unknown }> = {
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
  ToggleDebugger: "TOGGLE_DEBUGGER",
  SetQuestionnaire: "SET_QUESTIONNAIRE",
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
