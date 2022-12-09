import { questionnairEnableOperator } from '../constants/questionnaireEnableValueSet';
import { Coding, Identifier, Text } from './general';

export const itemType = {
  group: 'group',
  display: 'display',
  question: 'question',
  boolean: 'boolean',
  decimal: 'decimal',
  integer: 'integer',
  date: 'date',
  dateTime: 'dateTime',
  time: 'time',
  string: 'string',
  text: 'text',
  url: 'url',
  choice: 'choice',
  'open-choice': 'open-choice',
  attachment: 'attachment',
  reference: 'reference',
  quantity: 'quantity',
} as const;

export const enableBehavior = {
  all: 'all',
  any: 'any',
} as const;

export const status = {
  draft: 'draft',
  active: 'active',
  retired: 'retired',
  unknown: 'unknown',
} as const;

export type ItemType = keyof typeof itemType;
export type EnableBehavior = keyof typeof enableBehavior;
export type Status = keyof typeof status;

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
  operator: typeof questionnairEnableOperator[number]['code'];
} & Answer;

export interface Item {
  linkId: string;
  definition?: string;
  code?: Coding[];
  prefix?: string;
  text?: string;
  type: ItemType;
  enableWhen?: EnableWhen[];
  enableBehavior?: EnableBehavior;
  required?: boolean;
  repeats?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  answerValueSet?: string;
  answerOption?: AnswerOption[];
  initial?: Initial[];
  item?: Item[];
  extension?: any;
}

interface QuestionnaireBase {
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
  status: Status;
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
}

export interface Questionnaire extends QuestionnaireBase {
  item: Item[];
}

export interface FlatQuestionnaire extends QuestionnaireBase {
  item: { [key: string]: { meta: { groupId: string }; item: Item } };
}
