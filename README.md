# Systems Control JS

![Deploy](https://github.com/Brenopms/systems-controls-js/workflows/publish/badge.svg)
![Test](https://github.com/Brenopms/systems-controls-js/workflows/test/badge.svg)
[![npm version](https://img.shields.io/npm/v/systems-control-js)](https://www.npmjs.com/package/systems-control-js 'View this project on npm')
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Systems Control Utility Library written in Typescript

## Purpose

This library consists in a number of utility functions for aiding in system control analysis. The idea is to replicate and implement most of the basic functionalities present in [Matlab's](https://www.mathworks.com/products/control.html), [Octave's](https://octave.sourceforge.io/control/overview.html) and [Python's](https://python-control.readthedocs.io/en/0.9.3.post2/) similar packages, but with the practicality of having them in the web natively. This package relies on [Mathjs](https://mathjs.org/) for complex number basic operations, but most of the core functionality is implemented in the repository.

A demo of the library functionalities can be seen [here](https://brenopms.github.io/systems-controls-js-demo/)

## Features

- Fully typed functions with support for both CSJ and ESM modules
- Stability check using Routh–Hurwitz stability criterion
- Time response: Step and Impulse responses
- Frequency response: Bode and Nyquist plots
- Convolution of multiple transfer functions
- Inverse Laplace (Gaver-Stehfest simplified algorithm)
- Root Finding for Zeros and Poles (Durand-Kerner algorithm)
- Transfer function evaluation at any given time

## Installation

`npm install systems-control-js`

or

`yarn add systems-control-js`

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
    chartOutput: {
        data: [{ 
            x: [-1, -0.34407, -0.061797],
            y: [-1.732051, -3.645646, -10.229402]
        }, {...}],
    }
} */
```

In the *data* object, we have the location of each pole according to the passed gain.

### Impulse and Step

It's also possible to calculate the time-domain response of a given transfer function with the methods *step* and *impulse*, where it calculates the values from a set of times.

```typescript
const times = [0, 5, 10];
// Response from step input -> tf * 1/s
const stepResult = tf.step(times)
/* Output: {
  x: { label: 'Time (s)', values: [ 0, 5, 10 ] },
  y: {
    label: 'Magnitude',
    values: [ 5.000045238462707e-17, 1.9827148230507823, 2.676961175374944 ]
  }
}
*/

const impulseResult = tf.impulse(times)
/* Output: {
  x: { label: 'Time (s)', values: [ 0, 5, 10 ] },
  y: {
    label: 'Magnitude',
    values: [ 1.0001256543898682e-8, 0.2332377966489039, 0.07454351806498688 ]
  }
}
*/

```

### Bode and Nyquist

There are also frequency-domain analysis methods.

We can calculate both Bode Plot and Nyquist Plot points, for frequency analysis.

```typescript
const frequencies = [0, 10, 100]
const bodeResult = tf.bode(frequencies)
/*
{
  magnitude: {
    x: { label: 'Frequency', values: [Array] },
    y: { label: 'Magnitude (dB)', values: [Array] }
  },
  phase: {
    x: { label: 'Frequency', values: [Array] },
    y: { label: 'Phase (deg)', values: [Array] }
  }
}
*/

const nyquistResult = tf.nyquist(frequencies)
/*
{
  points: {
    x: { label: 'Real Axis', values: [Array] },
    y: { label: 'Imaginary Axis', values: [Array] }
  },
  correspondingPoints: {
    x: { label: 'Real Axis', values: [Array] },
    y: { label: 'Imaginary Axis', values: [Array] }
  }
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

## Limitations

The library is in an early-stage, so it has a number of limitations of what it can do, especially comparing to more mature alternatives in other platforms. Here are a couple of them:

- The **precision**, especially for time-domain analysis is considerably bad (10e-1). This is related to the inverse laplace algorithm, where it behaves unpredictably according to the number of coefficients set. Also, may be related to JS float implementations. Further investigation is needed
- We cannot work with **unstable systems**. The *transferFunction* checks the stability of a given system and throws an error if it's not stable. This is also related to the inverse laplace implementation, that becomes quite a mess when dealing with unstable systems
- The package relies on [Mathjs](https://mathjs.org/), which makes it quite heavy for front-end usage

## Next Steps

- Improve Inverse Laplace to improve precision across the library
- Work with unstable systems
- Avoid using mathjs to make the package lighter
- Add the option for the user to set the desired precision for calculating values
- Improve performance
- Add State space methods
- Input with complex numbers
- Use dependency injection framework (possibly [TSyringe](https://github.com/microsoft/tsyringe))
