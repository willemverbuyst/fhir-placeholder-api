import { Bundle } from '../interfaces/bundle'
import { ValueSet } from '../interfaces/general'
import {
  AnswerOption,
  ConvertedQuestionnaire,
  hasProp,
  Item,
  Questionnaire,
} from '../interfaces/questionnaire'
import { hardcodedValueSet } from '../constants/answerValueSet'
import { getLabel } from './label'
import { Unit } from '../interfaces/unit'
import { ItemType } from '../interfaces/constants'

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

export const getAnswerOptions = (answerOption: AnswerOption[]): string[] =>
  answerOption
    .map((option) => {
      if ('valueCoding' in option) {
        return option.valueCoding?.code?.toLowerCase()
      }
    })
    .filter((i): i is string => !!i)

const getOptions = (item: Item, questionnaire: Questionnaire): string[] => {
  const options = item.answerOption
    ? getAnswerOptions(item.answerOption)
    : item.answerValueSet && questionnaire
    ? getValueSet(item.answerValueSet, questionnaire)
    : []

  return options
}

const flattenQuestionnaire = (
  item: Item,
  container: Item[],
  groupLabel = ''
): void => {
  Object.keys(item).forEach((prop) => {
    if (item.type === 'group' && getLabel(item)) {
      groupLabel = getLabel(item)
    }
    if (hasProp(prop, item) && typeof item[prop] === 'object') {
      flattenQuestionnaire(item[prop], container, groupLabel)
    } else if (prop === 'linkId') {
      container.push({ ...item, groupLabel })
    }
  })
}

const convertQuestionnaire = (
  questionnaire: Questionnaire
): { items: Unit[]; meta: string; questionnaire: Questionnaire } => {
  const itemorg = questionnaire.item || []
  let item: Item[] = []
  itemorg.forEach((i) => flattenQuestionnaire(i, item))

  const items = item
    .map((i) => createInputUnit(i, questionnaire))
    .map((i) => i.unit)
    .filter((i) => !(i.type === 'group'))

  const meta = createMetaInfo(questionnaire)

  return { items, meta, questionnaire }
}

const createMetaInfo = (questionnaire: Questionnaire): string =>
  questionnaire.title
    ? questionnaire.title
    : questionnaire.code && questionnaire.code[0]?.display
    ? questionnaire.code[0].display
    : ''

const createInputUnit = (
  item: Item,
  questionnaire: Questionnaire
): { unit: Unit } => {
  if (!item.linkId) {
    throw new Error('linkId missing in one the items')
  }

  if (!item.type) {
    throw new Error('type missing in one the items')
  }
  // required properties
  const linkId = item.linkId
  const type = item.type

  // optional properties
  const label = getLabel(item)
  const readOnly = item.readOnly ?? false
  const defaultValue = item.initial
  const required = item.required ?? false
  const groupLabel = item.groupLabel

  let options
  if (item.type === ItemType.Choice) {
    options = getOptions(item, questionnaire)
  }

  const unit = {
    defaultValue,
    linkId,
    type,
    label,
    required,
    readOnly,
    options,
    groupLabel,
  }

  return { unit }
}

// const handleBundle = (bundle: Bundle, flatQ: Record<PropertyKey, any>) => {
//   const entries = bundle.entry || [];
//   const resources = entries.map((entry) => entry.resource);
//   resources.forEach((resource) => handleResource(resource, flatQ));
// };

const handleResource = (
  resource: Questionnaire | Bundle | ValueSet
): { items: Unit[]; meta: string; questionnaire: Questionnaire } | void => {
  if (resource.resourceType === 'Questionnaire') {
    return convertQuestionnaire(resource)
    // return handleQuestionnaires(resource, items);
    // } else if (resource.resourceType === 'Bundle') {
    //   handleBundle(resource, items);
  } else {
    console.warn('Resource could not be processed')
  }
}

export const main = (
  resource: Questionnaire | Bundle | ValueSet
): ConvertedQuestionnaire | null => {
  const items = handleResource(resource)
  if (items && resource.resourceType === 'Questionnaire') {
    return items
  }
  return null
}
