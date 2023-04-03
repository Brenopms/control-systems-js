export interface Complex {
  re: number;
  im: number;
}

export const complex = (re: number, im: number): Complex => {
  return { re, im };
};
