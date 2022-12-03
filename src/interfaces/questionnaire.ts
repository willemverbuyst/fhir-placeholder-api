import { Coding, Identifier, Text } from './general';

export type ItemType =
  | 'group'
  | 'display'
  | 'question'
  | 'boolean'
  | 'decimal'
  | 'integer'
  | 'date'
  | 'dateTime'
  | 'time'
  | 'string'
  | 'text'
  | 'url'
  | 'choice'
  | 'open-choice'
  | 'attachment'
  | 'reference'
  | 'quantity';

export type Answer =
  | { answerBoolean: boolean }
  | { answerDecimal: number }
  | { answerInteger: number }
  | { answerDate: Date }
  | { answerDateTime: string }
  | { answerTime: string }
  | { answerString: string }
  | { answerCoding: Coding }
  | { answerQuantity: any }
  | { answerReference: any };

export type Initial =
  | { valueBoolean: boolean }
  | { valueDecimal: number }
  | { valueInteger: number }
  | { valueDate: Date }
  | { valueDateTime: string }
  | { valueTime: string }
  | { valueString: string }
  | { valueCoding: Coding }
  | { valueUri: string }
  | { valueAttachment: any }
  | { valueQuantity: any }
  | { valueReference: any };

export type AnswerOption =
  | { valueInteger: number }
  | { valueDate: Date }
  | { valueTime: string }
  | { valueString: string }
  | { valueCoding: Coding }
  | { valueReference: any };

export type EnableWhen = {
  question: string;
  operator: any;
} & Answer;

export interface Item {
  linkId: string;
  definition?: string;
  code?: Coding[];
  prefix?: string;
  text?: string;
  type?: ItemType;
  enableWhen?: EnableWhen[];
  enableBehavior?: 'all' | 'any';
  required?: boolean;
  repeats?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  answerValueSet?: any;
  answerOption?: { initialSelected?: boolean } & AnswerOption[];
  initial?: Initial[];
  item?: Item[];
  extension?: any;
}

export interface Questionnaire {
  resourceType: 'Questionnaire';
  id: string;
  meta?: any;
  identifier?: Identifier[];
  extension?: any;
  contained?: any;
  text: Text;
  url?: string;
  version?: string;
  name?: string;
  title?: string;
  derivedFrom?: any;
  status: 'draft' | 'active';
  experimental?: boolean;
  subjectType: string[];
  date?: string;
  publisher?: string;
  contact?: any;
  description?: any;
  useContext?: any;
  jurisdiction?: any;
  purpose?: any;
  copyright?: any;
  approvalDate?: string;
  lastReviewDate?: string;
  effectivePeriod?: any;
  code?: Coding[];
  item: Item[];
}
