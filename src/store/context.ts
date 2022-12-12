import React, { createContext, useReducer } from 'react'
import { ConvertedQuestionnaire } from '../interfaces/questionnaire'

export type InitialState = {
  showDebugger: boolean
  questionnaire: ConvertedQuestionnaire | null
}

export const initialState: InitialState = {
  showDebugger: false,
  questionnaire: null,
}

export const AppContext = createContext<{
  state: InitialState
  dispatch: React.Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})
