import type { ConvertedQuestionnaire } from "../interfaces/questionnaire";

// biome-ignore lint/suspicious/noExplicitAny: todo
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
