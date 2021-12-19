/**
 * Group array of arrays by the index
 * @param arr
 */
export const groupByIndex = <T>(arr: T[][]) => {
  const groupedArr = arr.reduce<T[][]>((acc, curr) => {
    for (const [index, value] of curr.entries()) {
      acc[index] = acc[index] ? [...acc[index], value] : [value];
    }
    return acc;
  }, []);

  return groupedArr;
};
