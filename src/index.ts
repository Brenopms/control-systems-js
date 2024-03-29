import { Bode } from './lib/bode/bode';
import { BodeOutput, IBode } from './lib/bode/bode.entities';
import { expressionToString } from './lib/helpers/expressionToString';
import { Impulse } from './lib/impulse/impulse';
import { IImpulse } from './lib/impulse/impulse.entities';
import { ICalculateTransferFunction } from './lib/math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from './lib/math/calculateTransferFunction/implementations/calculateTransferFunction';
import { Complex, complex } from './lib/math/complex';
import { Convolution } from './lib/math/convolution/convolution';
import { IConvolution } from './lib/math/convolution/convolution.entities';
import { FrequencyRange } from './lib/math/frequencyRange/frequencyRange';
import { IFrequencyRange } from './lib/math/frequencyRange/frequencyRange.entities';
import { GaverStehfest } from './lib/math/inverseLaplace/implementations/gaverStehfest';
import { IInverseLaplace } from './lib/math/inverseLaplace/inverseLaplace.entities';
import { IPolynomialOperations } from './lib/math/polynomialOperations/PolynomialOperations.entities';
import { PolynomialOperations } from './lib/math/polynomialOperations/implementations/PolynomialOperations';
import { DurandKerner } from './lib/math/rootFinding/implementations/durandKerner';
import { IRootFinding } from './lib/math/rootFinding/rootFinding';
import { RouthHurwitzStability } from './lib/math/stability/implementations/routhHurwitz';
import { IStability } from './lib/math/stability/stability.entities';
import { Nyquist } from './lib/nyquist/nyquist';
import { INyquist } from './lib/nyquist/nyquist.entities';
import { NyquistOutput } from './lib/nyquist/nyquist.entities';
import { RootLocus } from './lib/rootLocus/rootLocus';
import { IRootLocus } from './lib/rootLocus/rootLocus.entities';
import { Point } from './lib/shared/charts/charts.entities';
import { Step } from './lib/step/step';
import { IStep } from './lib/step/step.entities';
import { TransferFunction } from './lib/transferFunction/transferFunction';
import {
  BodeData,
  ITransferFunction,
  NyquistData,
  RootLocusData,
  TransferFunctionExpression,
  TransferFunctionInput,
} from './lib/transferFunction/transferFunction.entities';

const _calculateTransferFunction: ICalculateTransferFunction = new CalculateTransferFunction();

const _rootFinder: IRootFinding = new DurandKerner();
const _polynomialOperations: IPolynomialOperations = new PolynomialOperations();
const _bode: IBode = new Bode(_calculateTransferFunction);
const _nyquist: INyquist = new Nyquist(_calculateTransferFunction);

const _rootLocus: IRootLocus = new RootLocus(_polynomialOperations, _rootFinder);
const _stability: IStability = new RouthHurwitzStability();
const _inverseLaplace: IInverseLaplace = new GaverStehfest();
const _convolution: IConvolution = new Convolution(_polynomialOperations);

const _step: IStep = new Step(_calculateTransferFunction, _inverseLaplace, _convolution);
const _impulse: IImpulse = new Impulse(_calculateTransferFunction, _inverseLaplace, _convolution);

const _frequencyRange: IFrequencyRange = new FrequencyRange();

const transferFunction = (transferFunctionInput: TransferFunctionInput): TransferFunction => {
  return new TransferFunction(
    transferFunctionInput,
    0,
    _rootFinder,
    _rootLocus,
    _bode,
    _nyquist,
    _stability,
    _step,
    _impulse,
    _frequencyRange
  );
};

const calculateTransferFunctionValue = _calculateTransferFunction.calculateValue.bind(_calculateTransferFunction);
const findRoots = _rootLocus.findRootLocus.bind(_rootLocus);
const bode = _bode.calculatePoints.bind(_bode);
const nyquist = _nyquist.calculatePoints.bind(_nyquist);
const isStable = _stability.isStable.bind(_stability);
const inverseLaplace = _inverseLaplace.execute.bind(_inverseLaplace);
const convolute = _convolution.execute.bind(_convolution);
const step = _step.calculatePoints.bind(_step);
const impulse = _impulse.calculatePoints.bind(_impulse);
const getDefaultFrequencyRange = _frequencyRange.getDefault.bind(_frequencyRange);

export type {
  ITransferFunction,
  ICalculateTransferFunction,
  IRootFinding,
  IPolynomialOperations,
  IBode,
  INyquist,
  IRootLocus,
  IStability,
  IInverseLaplace,
  IConvolution,
  IStep,
  IImpulse,
  TransferFunctionInput,
  TransferFunctionExpression,
  Complex,
  BodeOutput,
  NyquistOutput,
  NyquistData,
  BodeData,
  Point,
  RootLocusData,
};

export {
  complex,
  transferFunction,
  calculateTransferFunctionValue,
  findRoots,
  bode,
  nyquist,
  isStable,
  inverseLaplace,
  convolute,
  step,
  impulse,
  expressionToString,
  getDefaultFrequencyRange,
};
