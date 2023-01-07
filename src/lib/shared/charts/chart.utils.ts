import { Point, Trace } from './charts.entities';

export const pointsToTrace = <T>(points: Point<T>[]): Trace<T> => {
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

export const traceToPoints = <T>(trace: Trace<T>): Point<T>[] => {
  const points = trace?.x.map((x, index) => ({ x: x, y: trace?.y?.[index] }));
  return points;
};
