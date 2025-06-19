import { Questionnaire, QuestionnaireItem } from "fhir/r4";
import { Meta, Unit } from "./unit";

// export type Status =
//   (typeof questionnaireStatus)[keyof typeof questionnaireStatus];
// export type EnableBehavior =
//   (typeof enableBehavior)[keyof typeof enableBehavior];
// export type ItemType = (typeof itemType)[keyof typeof itemType];

// export type Answer =
//   | { answerBoolean: boolean }
//   | { answerDecimal: number }
//   | { answerInteger: number }
//   | { answerDate: Date }
//   | { answerDateTime: string }
//   | { answerTime: string }
//   | { answerString: string }
//   | { answerCoding: Coding }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { answerQuantity: any }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { answerReference: any };

// export type Initial =
//   | { valueBoolean: boolean }
//   | { valueDecimal: number }
//   | { valueInteger: number }
//   | { valueDate: Date }
//   | { valueDateTime: string }
//   | { valueTime: string }
//   | { valueString: string }
//   | { valueCoding: Coding }
//   | { valueUri: string }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { valueAttachment: any }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { valueQuantity: any }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { valueReference: any };

// export type AnswerOption =
//   | { valueInteger: number }
//   | { valueDate: Date }
//   | { valueTime: string }
//   | { valueString: string }
//   | { valueCoding: Coding }
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   | { valueReference: any };

// export type EnableWhen = {
//   question: string;
//   operator: (typeof questionnaireEnableOperator)[number]["code"];
// } & Answer;

// export interface Item {
//   linkId: string;
//   definition?: string;
//   code?: Coding[];
//   prefix?: string;
//   text?: string;
//   type: ItemType;
//   enableWhen?: EnableWhen[];
//   enableBehavior?: EnableBehavior;
//   required?: boolean;
//   repeats?: boolean;
//   readOnly?: boolean;
//   maxLength?: number;
//   answerValueSet?: string;
//   answerOption?: AnswerOption[];
//   initial?: Initial[];
//   item?: Item[];
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   extension?: any;
//   groupLabel?: string;
// }

// interface QuestionnaireBase {
//   resourceType: (typeof ResourceType)["Questionnaire"];
//   id: string;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   meta?: any;
//   identifier?: Identifier[];
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   extension?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   contained?: any;
//   text: Text;
//   url?: string;
//   version?: string;
//   name?: string;
//   title?: string;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   derivedFrom?: any;
//   status: Status;
//   experimental?: boolean;
//   subjectType: string[];
//   date?: string;
//   publisher?: string;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   contact?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   description?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   useContext?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   jurisdiction?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   purpose?: any;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   copyright?: any;
//   approvalDate?: string;
//   lastReviewDate?: string;
//   // biome-ignore lint/suspicious/noExplicitAny: todo
//   effectivePeriod?: any;
//   code?: Coding[];
// }

// export interface Questionnaire extends QuestionnaireBase {
//   item: Item[];
// }

export type FlatQuestionnaire = Questionnaire & {
  item: {
    [key: string]: { meta: { groupId: string }; item: Questionnaire["item"] };
  };
};

export function hasProp(
  key: PropertyKey,
  obj: QuestionnaireItem,
): key is keyof QuestionnaireItem {
  return key in obj;
}

export type ConvertedQuestionnaire = {
  units: Unit[];
  meta: Meta;
  questionnaire: Questionnaire;
};
