import { Complex } from '../complex';

export const logHypot = (value: Complex): number => {
  const { re, im } = value;

  const reAbs = Math.abs(re);
  const imAbs = Math.abs(im);

  if (re === 0) {
    return Math.log(imAbs);
  }

  if (im === 0) {
    return Math.log(reAbs);
  }

  if (reAbs < 3000 && imAbs < 3000) {
    return Math.log(re * re + im * im) * 0.5;
  }

  const halfRe = re / 2;
  const halfIm = im / 2;

  return 0.5 * Math.log(halfRe * halfRe + halfIm * halfIm) + Math.LN2;
};
