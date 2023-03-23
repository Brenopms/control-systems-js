import { Complex } from '../complex';

export const isComplex = (value: unknown): value is Complex => {
  return (value as Complex).re !== undefined && (value as Complex).im !== undefined;
};
