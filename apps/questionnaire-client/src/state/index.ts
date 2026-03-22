import { IContext } from "overmind";
import {
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createStateHook,
} from "overmind-react";

import * as actions from "./actions";
import * as effects from "./effects";
import { state } from "./state";

export const config = {
  state,
  actions,
  effects,
};

export type Context = IContext<typeof config>;

export const useAppState = createStateHook<Context>();
