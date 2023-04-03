import { beforeEach, describe, expect, it } from 'vitest';

import { complex, toComplex } from '../../complex';
import { IPolynomialOperations } from '../PolynomialOperations.entities';

import { PolynomialOperations } from './PolynomialOperations';

let polynomialOperations: IPolynomialOperations;

beforeEach(() => {
  polynomialOperations = new PolynomialOperations();
});

describe('Testing Polynomial Operations class', () => {
  describe('Testing add operation', () => {
    it('Should throw an error if one of the polynomial is invalid', () => {
      const validPol = toComplex([1, 2, 3]);
      const wrongPol = null;
      expect(() => polynomialOperations.add(validPol, wrongPol as any)).toThrowError();
      expect(() => polynomialOperations.add(wrongPol as any, validPol)).toThrowError();
    });

    it('Should add real polynomials successfully', () => {
      /**
       *  (3x^3 + 5x^2 + 0x^1 + 2) + (x^2 + 2x + 3) = (3x^3 + 6x^2 + 2x + 5)
       */
      const pol1 = toComplex([3, 5, 0, 2]);
      const pol2 = toComplex([1, 2, 3]);
      const expectedResult = toComplex([3, 6, 2, 5]);

      const resultPol = polynomialOperations.add(pol1, pol2);
      for (const [index, result] of resultPol.entries()) {
        expect(result).toMatchObject(expectedResult[index]);
      }
    });

    // it('Should add complex polynomials successfully', () => {
    //   const pol1 = [complex(1, 2), complex(3, 4), complex(3, -2)];
    //   const pol2 = [complex(1, 2), complex(3, 4), complex(1, 2)];
    //   const expectedResult = [complex(2, 4), complex(6, 8), complex(4, 0)];

    //   const resultPol = polynomialOperations.add(pol1, pol2);
    //   expect(resultPol).toEqual(expectedResult);
    // });
  });

  describe('Testing subtraction operation', () => {
    it('Should throw an error if one of the polynomial is invalid', () => {
      const validPol = toComplex([1, 2, 3]);
      const wrongPol = null;
      expect(() => polynomialOperations.subtract(validPol, wrongPol as any)).toThrowError();
      expect(() => polynomialOperations.subtract(wrongPol as any, validPol)).toThrowError();
    });

    it('Should subtract real polynomials successfully', () => {
      /**
       *  (3x^3 + 5x^2 + 0x^1 + 2) - (x^2 + 2x + 3) = (3x^3 + 4x^2 - 2x - 1)
       */
      const pol1 = toComplex([3, 5, 0, 2]);
      const pol2 = toComplex([1, 2, 3]);
      const expectedResult = toComplex([3, 4, -2, -1]);

      const resultPol = polynomialOperations.subtract(pol1, pol2);
      expect(resultPol).toEqual(expectedResult);
    });

    it('Should subtract complex polynomials successfully', () => {
      /**
       *  ((1+2j)x^2 + (3+4j)x + (3 - 2j)) - ((1+2j)x^2 + (3+4j)x + (1 + 2j)) = 2 -4j
       */
      const pol1 = [complex(1, 2), complex(3, 4), complex(3, -2)];
      const pol2 = [complex(1, 2), complex(3, 4), complex(1, 2)];
      const expectedResult = [complex(0, 0), complex(0, 0), complex(2, -4)];

      const resultPol = polynomialOperations.subtract(pol1, pol2);
      expect(resultPol).toEqual(expectedResult);
    });
  });

  describe('Testing multiplication operation', () => {
    it('Should throw an error if one of the polynomial is invalid', () => {
      const validPol = toComplex([1, 2, 3]);
      const wrongPol = null;
      expect(() => polynomialOperations.multiply(validPol, wrongPol as any)).toThrowError();
      expect(() => polynomialOperations.multiply(wrongPol as any, validPol)).toThrowError();
    });

    it('Should multiply real polynomials successfully', () => {
      /**
       *  (3x^3 + 5x^2 + 0x^1 + 2) - (x^2 + 2x + 3) = 6 + 4x + 17x^2 + 19x^3 + 11x^4 + 3x^5
       */
      const pol1 = toComplex([3, 5, 0, 2]);
      const pol2 = toComplex([1, 2, 3]);
      const expectedResult = toComplex([3, 11, 19, 17, 4, 6]);

      const resultPol = polynomialOperations.multiply(pol1, pol2);
      expect(resultPol).toEqual(expectedResult);
    });

    it('Should multiply complex polynomials successfully', () => {
      /**
       *  ((1+2j)x^2 + (3+4j)x + (3 - 2j)) * ((1+2j)x^2 + (3+4j)x + (1 + 2j)) = (7 + 4i) + (12 + 16i) x - (3 - 32i) x^2 - (10 - 20i) x^3 - (3 - 4i) x^4
       */
      const pol1 = [complex(1, 2), complex(3, 4), complex(3, -2)];
      const pol2 = [complex(1, 2), complex(3, 4), complex(1, 2)];
      const expectedResult = [complex(-3, 4), complex(-10, 20), complex(-3, 32), complex(12, 16), complex(7, 4)];

      const resultPol = polynomialOperations.multiply(pol1, pol2);
      expect(resultPol).toEqual(expectedResult);
    });
  });

  describe('Testing division operation', () => {
    it.skip('Should throw an error if one of the polynomial is invalid', () => {
      const validPol = toComplex([1, 2, 3]);
      const wrongPol = null;
      expect(() => polynomialOperations.divide(validPol, wrongPol as any)).toThrowError();
      expect(() => polynomialOperations.divide(wrongPol as any, validPol)).toThrowError();
    });

    it.todo('Should divide real polynomials successfully');
    it.todo('Should  divide complex polynomials successfully');
  });
});
