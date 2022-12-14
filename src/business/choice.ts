import { hardcodedValueSet } from '../constants/answerValueSet'
import { Bundle } from '../interfaces/bundle'
import { Questionnaire, AnswerOption, Item } from '../interfaces/questionnaire'
import { ResourceType } from '../interfaces/resourceType'

const getValueSetFromContained = (
  answerValueSet: string,
  resource: Questionnaire
): string[] => {
  const contained = resource.contained || []
  const id = answerValueSet.replace('#', '')
  const containedResource = contained.find((c: any) => c.id === id)
  const valueSet = containedResource?.compose?.include[0].concept
  const names = valueSet.map((v: any) => v.display)

  return names
}

export const getHardcodedValueSet = (
  url: keyof typeof hardcodedValueSet
): string[] => {
  const valueSet = hardcodedValueSet[url]
  if (!valueSet) return []
  const options = valueSet.map((value) => value.display)
  return options
}

const getValueSetFromBundle = (url: string, bundle: Bundle) => {
  const entries = bundle.entry ?? []
  const valueSetResource = entries.find(
    (entry) => entry.fullUrl === url
  )?.resource
  const valueSet =
    valueSetResource?.resourceType === ResourceType.ValueSet
      ? valueSetResource?.compose?.include[0].concept
      : []
  const names = valueSet.map((v: any) => v.display)

  return names
}

const getValueSet = (
  answerValueSetkey: string,
  questionnaire: Questionnaire,
  bundle?: Bundle
): string[] => {
  if (answerValueSetkey in hardcodedValueSet) {
    const key = answerValueSetkey as keyof typeof hardcodedValueSet
    return getHardcodedValueSet(key)
  } else if (answerValueSetkey.startsWith('#')) {
    return getValueSetFromContained(answerValueSetkey, questionnaire)
  } else if (bundle) {
    return getValueSetFromBundle(answerValueSetkey, bundle)
  }
  throw new Error('no ValueSet found')
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
  questionnaire: Questionnaire,
  bundle?: Bundle
): string[] => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet
    ? getValueSet(item.answerValueSet, questionnaire, bundle)
    : []

  return options
}
