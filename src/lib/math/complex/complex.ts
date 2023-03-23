export interface Complex {
  re: number;
  im: number;
}

const a: Complex = {
  re: 1,
  im: 2,
};

const b = 2;

export const complex = (re: number, im: number): Complex => {
  return { re, im };
};
