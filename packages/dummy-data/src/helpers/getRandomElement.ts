export function getRandomElement<T>(arr: readonly T[]): T {
  if (arr.length === 0) {
    throw new Error("Array is empty");
  }

  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}
