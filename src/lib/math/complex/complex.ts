/**
 * Representation of Complex numbers in rectangular form. Should be somewhat compatible with Complexjs and Mathjs implementations
 */
export interface Complex {
  re: number;
  im: number;
}

/**
 * Creates instance of Complex number
 * @param re
 * @param im
 * @returns
 */
export const complex = (re: number, im: number): Complex => {
  return { re, im };
};
