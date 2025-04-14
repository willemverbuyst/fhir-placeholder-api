import { v4 as uuidV4 } from 'uuid';
import { isTest } from './environment';

export function createId(index?: number) {
  return isTest && index ? String(index + 1) : uuidV4();
}
