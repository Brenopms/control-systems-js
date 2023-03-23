import { complex, Complex } from '../complex';

import { multiply } from './multiply';

export const pow = (value: Complex, power: number) => {
  let acc = complex(0, 0);
  for (let i = 1; i < power; i++) {
    acc = multiply(acc, value);
  }

  return acc;
};
