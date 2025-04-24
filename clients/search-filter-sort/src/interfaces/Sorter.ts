export interface Sorter<T> {
  property: keyof T;
  isDescending: boolean;
}
