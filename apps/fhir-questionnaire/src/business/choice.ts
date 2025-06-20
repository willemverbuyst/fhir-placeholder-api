import type {
  Bundle,
  Coding,
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireItemAnswerOption,
} from "fhir/r4";
import { hardcodedValueSet } from "../constants/answerValueSet";

const getValueSetFromContained = (
  answerValueSet: string,
  resource: Questionnaire,
): Coding[] => {
  const contained = resource.contained || [];
  const id = answerValueSet.replace("#", "");
  const containedResource = contained.find((c) => c.id === id);

  if (!containedResource || containedResource.resourceType !== "ValueSet") {
    return [];
  }

  const valueSet = containedResource?.compose?.include[0].concept ?? [];

  return valueSet;
};

export const getHardcodedValueSet = (
  url: keyof typeof hardcodedValueSet,
): Coding[] => {
  const valueSet = hardcodedValueSet[url];
  if (!valueSet) return [];
  return valueSet;
};

const getValueSetFromBundle = (url: string, bundle: Bundle): Coding[] => {
  const entries = bundle.entry ?? [];
  const valueSetResource = entries.find(
    (entry) => entry.fullUrl === url,
  )?.resource;
  const valueSet =
    valueSetResource?.resourceType === "ValueSet"
      ? (valueSetResource?.compose?.include[0].concept ?? [])
      : [];
  return valueSet;
};

const getValueSet = (
  answerValueSetKey: string,
  questionnaire: Questionnaire,
  bundle?: Bundle,
): Coding[] => {
  if (answerValueSetKey in hardcodedValueSet) {
    const key = answerValueSetKey as keyof typeof hardcodedValueSet;
    return getHardcodedValueSet(key);
  }
  if (answerValueSetKey.startsWith("#")) {
    return getValueSetFromContained(answerValueSetKey, questionnaire);
  }
  if (bundle) {
    return getValueSetFromBundle(answerValueSetKey, bundle);
  }
  throw new Error("no ValueSet found");
};

const getAnswerOptions = (
  answerOption: QuestionnaireItemAnswerOption[],
): Coding[] =>
  answerOption
    .map((option) => {
      if ("valueCoding" in option && option.valueCoding) {
        if (!option.valueCoding?.display) {
          option.valueCoding.display =
            option.valueCoding.code?.toLocaleLowerCase();
        }
        return option.valueCoding;
      }
    })
    .filter((i): i is Coding => !!i);

export const getOptions = (
  item: QuestionnaireItem,
  questionnaire: Questionnaire,
  bundle?: Bundle,
): Coding[] => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet
      ? getValueSet(item.answerValueSet, questionnaire, bundle)
      : [];

  return options;
};
