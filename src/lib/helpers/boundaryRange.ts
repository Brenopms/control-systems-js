export const boundaryRange = (start: number, end: number, step = 1): number[] => {
  const rangeValues = [];
  for (let i = start; i < end; i += step) {
    rangeValues.push(i);
  }
  return rangeValues;
};
