import { expect, test } from '@jest/globals';
import { Complex } from 'mathjs';

import { DurandKerner } from './durandKerner';

test('DurandKerner should throw an error if no coefficients are passed', () => {
  const coefficients = null;
  expect(() => {
    return new DurandKerner(coefficients as unknown as []);
  }).toThrow();
});

test('DurandKerner should return an empty array if the coefficients are empty', () => {
  const coefficients: Complex[] = [];
  const durandKerner = new DurandKerner(coefficients);
  const roots = durandKerner.findRoots();

  expect(roots).toMatchObject([]);
});

test.todo('DurandKerner should return the correct roots for the equation: x² - 3x + 2');

test.todo('DurandKerner should return the correct roots for the equation: x² - 2x + 1');
test.todo('DurandKerner should return the correct roots for the equation: x³ - 3x² + 2x');
test.todo('DurandKerner should return the correct roots for the equation: x⁵ - 13x³ + 36x');
test.todo('DurandKerner should return the correct roots for the equation: (1 + 3i)x² + (2 + 2i)x + (3 + i)');
test.todo(
  'DurandKerner should return the correct roots for the equation: (1 + i)x³ + (2 + 2i)x² + (3 + 3i)x + (4 + 4i)'
);
