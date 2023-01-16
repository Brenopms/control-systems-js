import { describe, expect, it } from 'vitest';

import { boundaryRange } from './boundaryRange';

describe('boundaryRange function', () => {
  it('Should return correctly the range from 0, 5', () => {
    const range = boundaryRange(0, 5);
    expect(range).toMatchObject([0, 1, 2, 3, 4]);
  });

  it('Should return correctly the range with a starting value', () => {
    const range = boundaryRange(1, 5);
    expect(range).toMatchObject([1, 2, 3, 4]);
  });

  it('Should return correctly the range with a defined step size', () => {
    const range = boundaryRange(0, 10, 2);
    expect(range).toMatchObject([0, 2, 4, 6, 8]);
  });
});
