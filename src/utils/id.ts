import { v4 as uuidV4 } from 'uuid';
import { isTest } from './environment';

export function createId(index?: number | string) {
  if (index === undefined || !isTest) {
    return uuidV4();
  }

  if (typeof index === 'string') {
    return index;
  }

  return String(index);
}
