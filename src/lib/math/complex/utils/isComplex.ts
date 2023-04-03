import { Complex } from '../complex';

/**
 * Check if value has real and imaginary values
 * @param value
 * @returns
 */
export const isComplex = (value: unknown): value is Complex => {
  return (value as Complex)?.re !== undefined && (value as Complex)?.im !== undefined;
};
