import { beforeEach, describe, expect, it } from 'vitest';

import { Complex, complex } from '../complex';

import { FrequencyRange } from './frequencyRange';
import { IFrequencyRange } from './frequencyRange.entities';

describe('FrequencyRange', () => {
  let frequencyRange: IFrequencyRange;

  beforeEach(() => {
    frequencyRange = new FrequencyRange();
  });

  describe('getDefault', () => {
    it('should return an array of length NUM_OF_SAMPLES', () => {
      const poles: Complex[] = [complex(-1, 0), complex(-2, 0), complex(-3, 0)];
      const zeros: Complex[] = [complex(0, 0), complex(-4, 0)];
      const frequencyRangeValues = frequencyRange.getDefault(poles, zeros);

      expect(frequencyRangeValues.length).toEqual(1000);
    });

    it('should return a range of frequencies between omegaMin and omegaMax', () => {
      const poles: Complex[] = [complex(-1, 0), complex(-2, 0), complex(-3, 0)];
      const zeros: Complex[] = [complex(0, 0), complex(-4, 0)];
      const frequencyRangeValues = frequencyRange.getDefault(poles, zeros);

      const omegaMin = 0.00001;
      const omegaMax = 10000;

      console.log(Math.min(...frequencyRangeValues));
      console.log(Math.max(...frequencyRangeValues));

      expect(frequencyRangeValues[0]).toBeGreaterThan(omegaMin);
      expect(frequencyRangeValues[frequencyRangeValues.length - 1]).toBeLessThan(omegaMax);
    });

    it('should return a range of frequencies that includes all the poles and zeros', () => {
      const poles = [complex(-1, 2), complex(-1, -2), complex(-10, 0)];
      const zeros = [complex(0, 0)];
      const result = frequencyRange.getDefault(poles, zeros, 10, 100);

      // Check that the result has the expected number of samples
      expect(result.length).toBe(100);

      // Check that the result is an increasing sequence
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThan(result[i + 1]);
      }

      // Check that the result is within the expected range
      const expectedMin = 0.00001;
      const expectedMax = 100000;
      expect(result[0]).toBeGreaterThan(expectedMin);
      expect(result[result.length - 1]).toBeLessThan(expectedMax);
    });

    it('should return a range of frequencies that spans at least one decade', () => {
      const poles: Complex[] = [complex(-1, 0), complex(-2, 0), complex(-3, 0)];
      const zeros: Complex[] = [complex(0, 0), complex(-4, 0)];
      const frequencyRangeValues = frequencyRange.getDefault(poles, zeros);

      const omegaMin = 0.00001;
      const omegaMax = 10000;

      expect(frequencyRangeValues[0]).toBeGreaterThanOrEqual(omegaMin);
      expect(frequencyRangeValues[frequencyRangeValues.length - 1]).toBeLessThanOrEqual(omegaMax);
    });
  });
});
