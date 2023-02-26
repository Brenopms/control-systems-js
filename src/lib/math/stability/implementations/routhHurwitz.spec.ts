import { beforeEach, describe, expect, it } from 'vitest';

import { IStability } from '../stability.entities';

import { RouthHurwitzStability } from './routhHurwitz';

describe('Routh-Hurwitz stability criterion algorithm', () => {
  let stability: IStability;

  beforeEach(() => {
    stability = new RouthHurwitzStability();
  });

  it('Should evaluate correctly the polynomial (s^3 + 10s^2 + 31s + 1030)', () => {
    const expression = [1, 10, 31, 1030];
    const isStable = stability.isStable(expression);

    expect(isStable).toBe(false);
  });

  it('Should evaluate correctly the polynomial (s^4 + s^3 + 3s^2 + 2s + 2)', () => {
    const expression = [1, 1, 3, 2, 2];
    const isStable = stability.isStable(expression);

    expect(isStable).toBe(true);
  });

  it('Should evaluate correctly the polynomial (s^4 + 2s^3 + 6s^2 + 4s + 1)', () => {
    const expression = [1, 2, 6, 4, 1];
    const isStable = stability.isStable(expression);

    expect(isStable).toBe(true);
  });

  it('Should evaluate correctly the polynomial (s^5 + 2s^4 + 2s^3 + 4s^2 + 11s + 10)', () => {
    const expression = [1, 2, 2, 4, 11, 10];
    const isStable = stability.isStable(expression);

    expect(isStable).toBe(false);
  });
});
