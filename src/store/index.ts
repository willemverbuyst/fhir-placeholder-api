import { createContext } from 'react';

export type ExampleState = { [key: PropertyKey]: any } | null;

const initialState: ExampleState = null;

const context = createContext<ExampleState>(initialState);

export default context;
