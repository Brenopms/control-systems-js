const factorialMemo: number[] = [1];

const calculateFactorial = (number: number) => {
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
    factorialMemo[i] = result;
  }
  return result;
};

const memo = (fn: (num: number) => number, num: number): number => {
  return factorialMemo[num] || fn(num);
};

/**
 * Calculates the factorial of a number
 * @param num number to have the factorial calculated
 * @returns calculated value
 */
export const factorial = (num: number): number => memo(calculateFactorial, num);
