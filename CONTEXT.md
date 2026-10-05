# Control Systems

A library for control-systems analysis: it represents a dynamic system as a transfer function and derives its time-domain and frequency-domain behaviour. The language below mixes the control-theory concepts with the code names that carry them.

## Language

**Transfer function**:
The ratio of a system's output to its input in the Laplace domain, expressed as a pair of polynomials (numerator and denominator) in `s`. Coded as `TransferFunction` / `TransferFunctionExpression`.
_Avoid_: system function, tf data

**Coefficient array**:
The numerator or denominator of a transfer function, ordered highest-order first, matching Matlab/Octave convention.
_Avoid_: polynomial list, coefficients vector

**Pole**:
A value of `s` where the transfer function goes to infinity; the roots of the denominator.
_Avoid_: singularity

**Zero**:
A value of `s` where the transfer function evaluates to zero; the roots of the numerator.
_Avoid_: root (when a pole or zero is meant)

**Input signal**:
The Laplace-domain expression of the excitation driven into a system — `1/s` for a step, `1` for an impulse.
_Avoid_: forcing function, drive signal, input expression

**Time response**:
The system's output over a time range for a given input signal; the time-domain counterpart of the frequency response. Coded as `TimeResponse`.
_Avoid_: time-domain output, transient

**Step response**:
The time response to a step input signal (`1/s`).
_Avoid_: unit step output

**Impulse response**:
The time response to an impulse input signal (`1`), Dirac's delta.
_Avoid_: delta response

**Frequency response**:
The system's steady-state behaviour as a function of frequency, evaluated along the imaginary axis `s = jω`.

**Bode plot**:
The frequency response shown as magnitude (dB) and phase (degrees) versus frequency.

**Nyquist plot**:
The frequency-response trajectory in the complex plane, with the mirror image used to close the contour.

**Root locus**:
The paths traced by the closed-loop poles as a feedback gain `k` varies.

**Stability**:
Whether a system's output remains bounded; determined from the poles (Routh–Hurwitz criterion in this library). A stable continuous-time system has all poles in the left half-plane.
_Avoid_: convergence

**Convolution**:
The combination of two transfer functions into one by multiplying their numerators and denominators.
_Avoid_: cascade (unless explicitly multiplying)
