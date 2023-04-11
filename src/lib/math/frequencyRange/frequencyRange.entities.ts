import { Complex } from '../complex';

export interface IFrequencyRange {
  /**
   * Calculates an array of frequencies for a given set of poles and zeros. The range of
   * frequencies is determined by the minimum and maximum magnitude of the features and a
   * range factor. The number of samples determines the resolution of the frequency range.
   *
   * @param poles - An array of complex poles of the system
   * @param zeros - An array of complex zeros of the system
   * @param rangeFactor - The range factor determines the number of decades
   *    covered by the frequency range. Increasing the range factor leads to a wider range
   *    of frequencies.
   * @param numOfSamples - The number of samples determines the resolution
   *    of the frequency range. Increasing the number of samples leads to a higher
   *    resolution but also increases the computation time.
   *
   * @returns {number[]} An array of frequencies in radians/second.
   */
  getDefault(poles: Complex[], zeros: Complex[], rangeFactor?: number, numOfSamples?: number): number[];
}
