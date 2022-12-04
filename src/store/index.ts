import { createContext } from 'react';
import { FlatQuestionnaire } from '../interfaces/questionnaire';

export type ExampleState = FlatQuestionnaire | null;

const initialState: ExampleState = null;

const context = createContext<ExampleState>(initialState);

export default context;
