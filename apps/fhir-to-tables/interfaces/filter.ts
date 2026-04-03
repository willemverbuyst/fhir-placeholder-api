export interface Filter<T> {
  property: keyof T;
  value: boolean | string;
}
