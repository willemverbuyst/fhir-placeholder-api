import { questionnairEnableOperator } from '../constants/questionnaireEnableValueSet'
import { ItemType, EnableBehavior, Status } from './constants'
import { Coding, Identifier, Text } from './general'
import { ResourceType } from './resourceType'
import { Unit } from './unit'

export type Status = typeof Status[keyof typeof Status]
export type EnableBehavior = typeof EnableBehavior[keyof typeof EnableBehavior]
export type ItemType = typeof ItemType[keyof typeof ItemType]

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
  | { answerReference: any }

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
  | { valueReference: any }

export type AnswerOption =
  | { valueInteger: number }
  | { valueDate: Date }
  | { valueTime: string }
  | { valueString: string }
  | { valueCoding: Coding }
  | { valueReference: any }

export type EnableWhen = {
  question: string
  operator: typeof questionnairEnableOperator[number]['code']
} & Answer

export interface Item {
  linkId: string
  definition?: string
  code?: Coding[]
  prefix?: string
  text?: string
  type: ItemType
  enableWhen?: EnableWhen[]
  enableBehavior?: EnableBehavior
  required?: boolean
  repeats?: boolean
  readOnly?: boolean
  maxLength?: number
  answerValueSet?: string
  answerOption?: AnswerOption[]
  initial?: Initial[]
  item?: Item[]
  extension?: any
  groupLabel?: string
}

interface QuestionnaireBase {
  resourceType: typeof ResourceType['Questionnaire']
  id: string
  meta?: any
  identifier?: Identifier[]
  extension?: any
  contained?: any
  text: Text
  url?: string
  version?: string
  name?: string
  title?: string
  derivedFrom?: any
  status: Status
  experimental?: boolean
  subjectType: string[]
  date?: string
  publisher?: string
  contact?: any
  description?: any
  useContext?: any
  jurisdiction?: any
  purpose?: any
  copyright?: any
  approvalDate?: string
  lastReviewDate?: string
  effectivePeriod?: any
  code?: Coding[]
}

export interface Questionnaire extends QuestionnaireBase {
  item: Item[]
}

export interface FlatQuestionnaire extends QuestionnaireBase {
  item: { [key: string]: { meta: { groupId: string }; item: Item } }
}

export function hasProp<T extends Record<PropertyKey, any>>(
  key: PropertyKey,
  obj: T
): key is keyof T {
  return key in obj
}

export type ConvertedQuestionnaire = {
  units: Unit[]
  meta: string | null
  questionnaire: Questionnaire
}
