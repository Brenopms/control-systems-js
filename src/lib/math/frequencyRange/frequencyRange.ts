import { abs, type Complex } from '../complex';

import type { IFrequencyRange } from './frequencyRange.entities';

const RANGE_FACTOR = 10;
const NUM_OF_SAMPLES = 1000;
const EPSILON = 10e-5;

export class FrequencyRange implements IFrequencyRange {
  getDefault(poles: Complex[], zeros: Complex[], rangeFactor = RANGE_FACTOR, numOfSamples = NUM_OF_SAMPLES): number[] {
    const features = [...poles, ...zeros];
    const minFeature = Math.min(...features.map((f) => abs(f)));
    const maxFeature = Math.max(...features.map((f) => abs(f)));

    const rangeMin = Math.max(10 ** (Math.floor(Math.log10(minFeature)) - 1), EPSILON); // prevent issues with min feature at 0
    const rangeMax = 10 ** (Math.ceil(Math.log10(maxFeature)) + 1);
    const range = rangeMax / rangeMin;
    const rangePerDecade = range ** (1 / rangeFactor);

    const omegaMin = rangeMin * rangePerDecade ** -0.5;
    const omegaMax = rangeMax * rangePerDecade ** 0.5;

    const omega = new Array<number>(numOfSamples);
    for (let i = 0; i < numOfSamples; i++) {
      const alpha = i / (numOfSamples - 1);
      omega[i] = omegaMin * (omegaMax / omegaMin) ** alpha;
    }
    return omega;
  }
}
