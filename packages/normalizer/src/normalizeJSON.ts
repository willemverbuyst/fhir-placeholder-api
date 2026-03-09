function isPlainObject(data: unknown): data is Record<string, unknown> {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}

export function normalizeJSON(data: unknown) {
  if (!isPlainObject(data) && !Array.isArray(data)) {
    throw new Error("Data must be a object or array");
  }

  const result: Record<string, unknown> = {};

  // Use an iterative stack approach to avoid recursive call overhead and improve speed for deep objects
  type StackItem = {
    value: unknown;
    key: string;
  };

  const stack: StackItem[] = [{ value: data, key: "__" }];

  while (stack.length) {
    const item = stack.pop();
    if (!item) {
      continue;
    }

    const { value, key } = item;

    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) {
        const item = value[i];
        if (isPlainObject(item) || Array.isArray(item)) {
          stack.push({ value: item, key: `${key}.${i}` });
        } else {
          result[`${key}.${i}`] = item;
        }
      }
    } else if (isPlainObject(value)) {
      const keys = Object.keys(value);
      for (let i = keys.length - 1; i >= 0; i--) {
        const k = keys[i];
        const newKey = key ? `${key}.${k}` : k;
        const v = (value as Record<string, unknown>)[k];
        if (isPlainObject(v) || Array.isArray(v)) {
          stack.push({ value: v, key: newKey });
        } else {
          result[newKey] = v;
        }
      }
    } else {
      throw new Error(`Unexpected value type for key: ${key}`);
    }
    // primitives are handled in array/object branches only
  }

  return result;
}
