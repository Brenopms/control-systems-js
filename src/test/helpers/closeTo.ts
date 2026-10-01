export const closeTo = (expected: number, precision = 2) => ({
  asymmetricMatch: (actual: number) => Math.abs(expected - actual) < 10 ** -precision / 2,
});
