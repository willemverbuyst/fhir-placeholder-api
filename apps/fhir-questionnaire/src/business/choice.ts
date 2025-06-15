import { hardcodedValueSet } from "../constants/answerValueSet";
import { Bundle } from "../interfaces/bundle";
import { Coding } from "../interfaces/general";
import { AnswerOption, Item, Questionnaire } from "../interfaces/questionnaire";
import { ResourceType } from "../interfaces/resourceType";

const getValueSetFromContained = (
  answerValueSet: string,
  resource: Questionnaire,
): Coding[] => {
  const contained = resource.contained || [];
  const id = answerValueSet.replace("#", "");
  // biome-ignore lint/suspicious/noExplicitAny: todo
  const containedResource = contained.find((c: any) => c.id === id);
  const valueSet = containedResource?.compose?.include[0].concept;

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
    valueSetResource?.resourceType === ResourceType.ValueSet
      ? valueSetResource?.compose?.include[0].concept
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

const getAnswerOptions = (answerOption: AnswerOption[]): Coding[] =>
  answerOption
    .map((option) => {
      if ("valueCoding" in option) {
        if (!option.valueCoding.display) {
          option.valueCoding.display =
            option.valueCoding.code?.toLocaleLowerCase();
        }
        return option.valueCoding;
      }
    })
    .filter((i): i is Coding => !!i);

export const getOptions = (
  item: Item,
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
