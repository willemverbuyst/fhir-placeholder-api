export interface Country {
  name: string;
  officialName: string;
  regio: string;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
}

export interface Element {
  name: string;
  title: string;
  type: string;
  html?: string;
  isRequired?: boolean;
  choices?: string[] | null;
  correctAnswer?: string;
  choicesOrder?: string;
}

export interface Questionnaire {
  title: string;
  pages: { elements: Element[] }[];
}

export interface State {
  countries: string[] | null;
  isLoading: boolean;
  questionnaire: Questionnaire | null;
  user: string;
}
