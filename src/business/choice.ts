import { hardcodedValueSet } from '../constants/answerValueSet'
import { Questionnaire, AnswerOption, Item } from '../interfaces/questionnaire'

const getValueSetFromContained = (
  answerValueSet: string,
  questionnaire: Questionnaire
): string[] => {
  const contained = questionnaire.contained || []
  const id = answerValueSet.replace('#', '')
  const resource = contained.find((c: any) => c.id === id)
  const valueSet = resource?.compose?.include[0].concept
  const names = valueSet.map((v: any) => v.display)

  return names
}

const getHardcodedValueSet = (
  url: keyof typeof hardcodedValueSet
): string[] => {
  const valueSet = hardcodedValueSet[url]
  if (!valueSet) return []
  const options = valueSet.map((value) => value.display)
  return options
}

const getValueSet = (
  answerValueSetkey: string,
  questionnaire: Questionnaire
): string[] => {
  if (answerValueSetkey in hardcodedValueSet) {
    const key = answerValueSetkey as keyof typeof hardcodedValueSet
    return getHardcodedValueSet(key)
  } else if (answerValueSetkey.startsWith('#')) {
    return getValueSetFromContained(answerValueSetkey, questionnaire)
  } else {
    return []
  }
}

const getAnswerOptions = (answerOption: AnswerOption[]): string[] =>
  answerOption
    .map((option) => {
      if ('valueCoding' in option) {
        return option.valueCoding?.code?.toLowerCase()
      }
    })
    .filter((i): i is string => !!i)

export const getOptions = (
  item: Item,
  questionnaire: Questionnaire
): string[] => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet && questionnaire
    ? getValueSet(item.answerValueSet, questionnaire)
    : []

  return options
}
