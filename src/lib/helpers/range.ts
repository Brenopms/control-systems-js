export const range = (size: number, step = 1): number[] => {
  const rangeValues = [];
  for (let i = 0; i < size; i += step) {
    rangeValues.push(i);
  }
  return rangeValues;
};
