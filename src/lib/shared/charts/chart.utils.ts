import { Point, Trace } from './charts.entities';

export const transformPointsToTrace = <T>(points: Point<T>[]): Trace<T> => {
  const traceX: T[] = [];
  const traceY: T[] = [];

  points?.forEach((point) => {
    traceX.push(point?.x);
    traceY.push(point?.y);
  });

  return {
    x: traceX,
    y: traceY,
  };
};
