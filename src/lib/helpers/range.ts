import { boundaryRange } from './boundaryRange';

export const range = (size: number, step = 1): number[] => {
  return boundaryRange(0, size, step);
};
