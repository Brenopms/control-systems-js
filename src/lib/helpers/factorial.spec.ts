import { describe, expect, it } from 'vitest';

import { factorial } from './factorial';

describe('Factorial function', () => {
  it('Should evaluate correctly factorial(0)', () => {
    const result = factorial(0);
    expect(result).toBe(1);
  });

  it('Should evaluate correctly factorial(5)', () => {
    const result = factorial(5);
    expect(result).toBe(120);
  });

  it('Should evaluate correctly factorial(6)', () => {
    const result = factorial(6);
    expect(result).toBe(720);
  });

  it('Should evaluate correctly factorial(10)', () => {
    const result = factorial(10);
    expect(result).toBe(3628800);
  });

  it('Should evaluate correctly factorial(25)', () => {
    const result = factorial(25);
    expect(result).toBe(1.5511210043330986e25);
  });

  it('Should evaluate correctly factorial(50)', () => {
    const result = factorial(50);
    expect(result).toBe(3.0414093201713376e64);
  });
});
