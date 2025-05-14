export interface Filter<T> {
  property: keyof T;
  isTruthySelected: boolean;
}
