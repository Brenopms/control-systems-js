export interface IStability {
  /**
   *  Check if the expression with the given coefficients are stable.
   *  A stable system is one whose output signal is bounded; the position, velocity or energy do not increase to infinity as time goes on.
   *  The importance of the criterion is that the roots p of the characteristic equation of a linear system with negative real parts represent solutions ept of the system that are stable (bounded).
   */
  isStable(coefficients: number[]): boolean;
}
