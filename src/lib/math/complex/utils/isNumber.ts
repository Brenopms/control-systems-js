/**
 * Checks if the value is a number
 * @param value
 * @returns
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};
