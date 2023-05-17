# Control Systems JS

![Deploy](https://github.com/Brenopms/control-systems-js/workflows/publish/badge.svg)
![Test](https://github.com/Brenopms/control-systems-js/workflows/test/badge.svg)
[![npm version](https://img.shields.io/npm/v/control-systems-js)](https://www.npmjs.com/package/control-systems-js 'View this project on npm')
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Control Systems Utility Library written in Typescript

## Purpose

This library consists in a number of utility functions for aiding in control systems analysis. The idea is to replicate and implement most of the basic functionalities present in [Matlab's](https://www.mathworks.com/products/control.html), [Octave's](https://octave.sourceforge.io/control/overview.html) and [Python's](https://python-control.readthedocs.io/en/0.9.3.post2/) similar packages, but with the practicality of having them in the web natively. This package uses it's own complex number implementation basic operations, but is, for the most part, compatible with [complexjs](https://github.com/infusion/Complex.js/) and [mathjs](https://mathjs.org/).

A demo of the library functionalities can be seen [here](https://brenopms.github.io/systems-controls-js-demo/)

## Features

- No external dependencies
- Fully typed functions with support for both CSJ and ESM modules
- Stability check using Routh–Hurwitz stability criterion
- Time response: Step and Impulse responses
- Frequency response: Bode and Nyquist plots
- Convolution of multiple transfer functions
- Inverse Laplace (Gaver-Stehfest simplified algorithm)
- Root Finding for Zeros and Poles (Durand-Kerner algorithm)
- Transfer function evaluation at any given time

## Installation

`npm install control-systems-js`

or

`yarn add control-systems-js`

## Usage

The most basic structure for the library is the TransferFunction object. This interface contains a number of methods available for analysis of a given system. You can create a transfer function object with the `transferFunction` method:

```typescript
// Represents the following system:
// (s + 3)/(s^3 + 3s^2 + 5s + 1)
const tf = transferFunction({
  numerator: [1, 3],
  denominator: [1, 3, 5, 1],
});
```

The *numerator* and *denominator* properties represents the coefficients of the polynomial of a given function, ordered as the first index represents the coefficient of the highest order, similar to Matlab's implementation.

It's important to know that the library only accepts physically realizable control system, meaning that the denominator should have higher order than numerator

Also, it will throw an error if the passed system is not stable, as a couple of functions, especially the time-domain ones do not behave correctly if the function is unstable. Read more in the *limitations* section.

In the transfer function you have a number of methods:

### Zeros and Poles

We have two methods in the transfer function object, *zero* and *pole* which gives the values in which the system becomes zero and infinite respectively. The values of the poles and the zeros of a system determine whether the system is stable, and how well the system performs.

The zeros and poles are calculated when *transferFunction* is called and are available in the following methods:

```typescript
tf.zero();
// output: [ { re: -3, im: 0 } ]

tf.pole();
/* output:  [
  { re: -1.385458, im: -1.563885 },
  { re: -1.385458, im: 1.563885 },
  { re: -0.229083, im: -0 }
] */
```

### Root Locus

We can also calculate the root locus of the SISO model sys, meaning, where the the closed-loop pole trajectories as a function of the feedback gain k (assuming negative feedback). This can be used to provide indirect information on the time and frequency responses.

```typescript
const gains = [1, 10, 100];
const result = tf.rlocus(gains);
/* Output:  {
    gains: [1, 10, 100],
    roots: [
      [
        { x: -1, y: -1.73205 },
        { x: -0.34407, y: -3.64565 },
        { x: -0.0617972, y: -10.2294 }
      ],
      [
        { x: -1, y: 1.73205 },
        { x: -0.34407, y: 3.64565 },
        { x: -0.0617972, y: 10.2294 }
      ]...
  ]
} */
```

In the *data* object, we have the location of each pole according to the passed gain.

### Impulse and Step

It's also possible to calculate the time-domain response of a given transfer function with the methods *step* and *impulse*, where it calculates the values from a set of times.

```typescript
const times = [0, 5, 10];
// Response from step input -> tf * 1/s
const stepResult = tf.step(times)
/* Output: [
  { x: 0, y: 5.0000346656356524e-17 },
  { x: 5, y: 1.982714789998949 },
  { x: 10, y: 2.6768427176048286 }
]
*/

const impulseResult = tf.impulse(times)
/* Output: [
  { x: 0, y: 1.0001579459073258e-8 },
  { x: 5, y: 0.23298395857008558 },
  { x: 10, y: 0.07467876616635728 }
]
*/

```

### Bode and Nyquist

There are also frequency-domain analysis methods.

We can calculate both Bode Plot and Nyquist Plot points, for frequency analysis.

```typescript
const frequencies = [0, 10, 100]
const bodeResult = tf.bode(frequencies)
/* Output: {
  magnitude: [
    { x: 1, y: -3.0102999566398125 },
    { x: 10, y: -39.59041830161867 },
    { x: 100, y: -79.99565961654912 }
  ],
  phase: [
    { x: 1, y: -98.130102354156 },
    { x: 10, y: -179.22853473338537 },
    { x: 100, y: -179.9991981797909 }
  ]
}
*/

const nyquistResult = tf.nyquist(frequencies)
/* Output: {
  points: [
    { x: -0.1, y: -0.7 },
    { x: -0.010481892850193719, y: -0.00014114311811360206 },
    { x: -0.00010004998298870205, y: -1.4001397479468424e-9 }
  ],
  correspondingPoints: [
    { x: -0.1, y: 0.7 },
    { x: -0.010481892850193719, y: 0.00014114311811360206 },
    { x: -0.00010004998298870205, y: 1.4001397479468424e-9 }
  ]
}
*/
```

### Utils

There are some utilities functions, for returning the transfer function expression for other usages and also for converting it to a string

```typescript
tf.getExpression()
/* Output: {
  numerator: [ { re: 1, im: 0 }, { re: 3, im: 0 } ],
  denominator: [
    { re: 1, im: 0 },
    { re: 3, im: 0 },
    { re: 5, im: 0 },
    { re: 1, im: 0 }
  ]
}
*/

tf.toString()
// Output: (s + 3) / (s^3 + 3s^2 + 5s + 1)
```

### Standalone Functions

It's also possible to use all of the above functions in a standalone format, separately from the *transferFunction* object. These are the available functions

- *calculateTransferFunctionValue*: Evaluates the transfer function at a given *s* value
- *findRoots*: Get the values of poles for a given set of gains in a closed-loop
- *bode*: Calculates the frequency response of a dynamic system given a set of frequencies
- *nyquist*: Given a frequency range, it calculates the real and imaginary part of the transform function evaluated at each frequency
- *isStable*: Checks if a transfer function expression is stable according to Routh–Hurwitz criterion
- *inverseLaplace*: Numerically calculates the inverse laplace of a given function and evaluates it
- *convolute*: Convolves two transfer function expressions
- *step*: Calculates the step response of a dynamic system model.
- *impulse*: Calculates the impulse response of a dynamic system model.
- *getDefaultFrequencyRange*: Calculates an optimal array of frequencies for a given set of poles and zeros for frequency behavior visualization

## Limitations

The library is in an early-stage, so it has a number of limitations of what it can do, especially comparing to more mature alternatives in other platforms. Here are a couple of them:

- Time range can be set, but if not it's not optimized for each system (fixed value)
- The **precision**, especially for time-domain analysis is considerably bad (10e-1). This is related to the inverse laplace algorithm, where it behaves unpredictably according to the number of coefficients set. Also, may be related to JS float implementations. Further investigation is needed
- We cannot work with **unstable systems**. The *transferFunction* checks the stability of a given system and throws an error if it's not stable. This is also related to the inverse laplace implementation, that becomes quite a mess when dealing with unstable systems

## Next Steps

- Improve Inverse Laplace to improve precision across the library
- Work with unstable systems
- Add the option for the user to set the desired precision for calculating values
- Improve performance
- Add State space methods
- Input with complex numbers
- Use dependency injection framework (possibly [TSyringe](https://github.com/microsoft/tsyringe))
