import { complex, Complex } from 'mathjs';

import { BodeOutput, IBode } from '../bode/bode.entities';
import { boundaryRange } from '../helpers/boundaryRange';
import { expressionToString } from '../helpers/expressionToString';
import { groupByIndex } from '../helpers/groupByIndex';
import { range } from '../helpers/range';
import { IRootFinding } from '../math/rootFinding/rootFinding';
import { INyquist, NyquistOutput } from '../nyquist/nyquist.entities';
import { IRootLocus } from '../rootLocus/rootLocus.entities';

import {
  BodeChart,
  ComplexNumber,
  ITransferFunction,
  NyquistChart,
  RootLocusOutput,
  TransferFunctionExpression,
  TransferFunctionInput,
} from './transferFunction.entities';

const MAX_ITERATIONS_ROOT = 100;
const PRECISION = 6;
const TOLERANCE = 10e-7;
const DEFAULT_GAINS = range(100);
// TODO: Figure it out how to calculate ideal frequency range for each transfer function
const DEFAULT_FREQUENCY_RANGE = boundaryRange(0.01, 100, 0.01);

export class TransferFunction implements Partial<ITransferFunction> {
  private readonly tf: TransferFunctionExpression;
  private readonly poles: Complex[];
  private readonly zeros: Complex[];

  private readonly rootFinder: IRootFinding;
  private readonly rootLocus: IRootLocus;
  private readonly bodeCalculator: IBode;
  private readonly nyquistCalculator: INyquist;

  constructor(
    transferFunctionInput: TransferFunctionInput,
    _timeDelay = 0,
    rootFinder: IRootFinding,
    rootLocus: IRootLocus,
    bode: IBode,
    nyquist: INyquist
  ) {
    /**
     * Dependency injection
     */
    this.rootFinder = rootFinder;
    this.rootLocus = rootLocus;
    this.bodeCalculator = bode;
    this.nyquistCalculator = nyquist;

    this.validateTransferFunctionInput(transferFunctionInput);
    this.tf = {
      numerator: this.castInputToComplex(transferFunctionInput.numerator),
      denominator: this.castInputToComplex(transferFunctionInput.denominator),
    };

    this.zeros = this.calculateRoots(this.tf.numerator);
    this.poles = this.calculateRoots(this.tf.denominator);
  }

  private validateTransferFunctionInput(input: TransferFunctionInput): void {
    if (!input || !input.numerator || !input.denominator) {
      throw new Error('Please input a valid transfer function');
    }

    if (input.numerator?.length > input.denominator?.length) {
      throw new Error(
        'The package only accepts transfer functions where the denominator is a higher order than the numerator'
      );
    }
  }

  private complexNumberToComplex(complexNumber: ComplexNumber): Complex {
    return complex(complexNumber.re, complexNumber.im);
  }

  private numberToComplex(number: number): Complex {
    return complex(number, 0);
  }

  private castInputToComplex(input: (ComplexNumber | number)[]): Complex[] {
    if (input.every((item) => typeof item === 'number')) {
      return input.map((num) => this.numberToComplex(num as number));
    }

    return input.map((num) => this.complexNumberToComplex(num as ComplexNumber));
  }

  private calculateRoots = (coefficients: Complex[]) => {
    return this.rootFinder.findRoots(coefficients, MAX_ITERATIONS_ROOT, PRECISION, TOLERANCE);
  };

  toString(): string {
    const numeratorString = expressionToString(this.tf.numerator);
    const denominatorString = expressionToString(this.tf.denominator);
    return `(${numeratorString}) / (${denominatorString})`;
  }

  getExpression() {
    return this.tf;
  }

  pole() {
    return this.poles;
  }

  zero() {
    return this.zeros;
  }

  private mapRootLocusRootsToChart(rootLocusRoots: Complex[][], gains: number[]): RootLocusOutput {
    const groupedRoots = groupByIndex(rootLocusRoots);
    const output: RootLocusOutput = {
      gains,
      chartOutput: {
        data: groupedRoots.map((roots) => ({ x: roots.map((root) => root.re), y: roots.map((root) => root.im) })),
        details: {
          name: 'Root Locus',
          xAxis: {
            label: 'Real Value',
          },
          yAxis: {
            label: 'Imaginary Value',
          },
        },
      },
    };

    return output;
  }

  rlocus(k = DEFAULT_GAINS) {
    const rootLocusRoots = this.rootLocus.findRootLocus(this.tf, k);
    const chartOutput = this.mapRootLocusRootsToChart(rootLocusRoots, k);
    return chartOutput;
  }

  private mapBodeOutputToChart(bodePoints: BodeOutput) {
    const output: BodeChart = {
      magnitude: {
        x: {
          label: 'Frequency',
          values: [...bodePoints?.magnitude.map((item) => item?.x)],
        },
        y: {
          label: 'Magnitude (dB)',
          values: [...bodePoints?.magnitude.map((item) => item?.y)],
        },
      },
      phase: {
        x: {
          label: 'Frequency',
          values: [...bodePoints?.phase.map((item) => item?.x)],
        },
        y: {
          label: 'Phase (deg)',
          values: [...bodePoints?.phase.map((item) => item?.y)],
        },
      },
    };
    return output;
  }

  bode(): BodeChart {
    const bodeOutput = this.bodeCalculator.calculatePoints(this.getExpression(), DEFAULT_FREQUENCY_RANGE);
    const bodeChart = this.mapBodeOutputToChart(bodeOutput);
    return bodeChart;
  }

  private mapNyquistOutputToChart(nyquistPoints: NyquistOutput): NyquistChart {
    const data: NyquistChart = {
      points: {
        x: {
          label: 'Real Axis',
          values: nyquistPoints.points.map((point) => point.x),
        },
        y: {
          label: 'Imaginary Axis',
          values: nyquistPoints.points.map((point) => point.y),
        },
      },
      correspondingPoints: {
        x: {
          label: 'Real Axis',
          values: nyquistPoints.correspondingPoints.map((point) => point.x),
        },
        y: {
          label: 'Imaginary Axis',
          values: nyquistPoints.correspondingPoints.map((point) => point.y),
        },
      },
    };

    return data;
  }

  nyquist(): NyquistChart {
    const nyquistPoints = this.nyquistCalculator.calculatePoints(this.getExpression(), DEFAULT_FREQUENCY_RANGE);
    const nyquistChart = this.mapNyquistOutputToChart(nyquistPoints);
    return nyquistChart;
  }
}

// https://wiki.octave.org/Control_package
