import { Bode } from './lib/bode/bode';
import type { BodeOutput, IBode } from './lib/bode/bode.entities';
import { expressionToString } from './lib/helpers/expressionToString';
import type { ICalculateTransferFunction } from './lib/math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from './lib/math/calculateTransferFunction/implementations/calculateTransferFunction';
import { type Complex, complex } from './lib/math/complex';
import { Convolution } from './lib/math/convolution/convolution';
import type { IConvolution } from './lib/math/convolution/convolution.entities';
import { FrequencyRange } from './lib/math/frequencyRange/frequencyRange';
import type { IFrequencyRange } from './lib/math/frequencyRange/frequencyRange.entities';
import { GaverStehfest } from './lib/math/inverseLaplace/implementations/gaverStehfest';
import type { IInverseLaplace } from './lib/math/inverseLaplace/inverseLaplace.entities';
import { PolynomialOperations } from './lib/math/polynomialOperations/implementations/PolynomialOperations';
import type { IPolynomialOperations } from './lib/math/polynomialOperations/PolynomialOperations.entities';
import { DurandKerner } from './lib/math/rootFinding/implementations/durandKerner';
import type { IRootFinding } from './lib/math/rootFinding/rootFinding';
import { RouthHurwitzStability } from './lib/math/stability/implementations/routhHurwitz';
import type { IStability } from './lib/math/stability/stability.entities';
import { Nyquist } from './lib/nyquist/nyquist';
import type { INyquist, NyquistOutput } from './lib/nyquist/nyquist.entities';
import { RootLocus } from './lib/rootLocus/rootLocus';
import type { IRootLocus } from './lib/rootLocus/rootLocus.entities';
import type { Point } from './lib/shared/charts/charts.entities';
import { TimeResponse } from './lib/timeResponse/timeResponse';
import type { ITimeResponse } from './lib/timeResponse/timeResponse.entities';
import { TransferFunction } from './lib/transferFunction/transferFunction';
import type {
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

const _timeResponse: ITimeResponse = new TimeResponse(_calculateTransferFunction, _inverseLaplace, _convolution);

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
    _timeResponse,
    _frequencyRange,
  );
};

const calculateTransferFunctionValue = _calculateTransferFunction.calculateValue.bind(_calculateTransferFunction);
const findRoots = _rootLocus.findRootLocus.bind(_rootLocus);
const bode = _bode.calculatePoints.bind(_bode);
const nyquist = _nyquist.calculatePoints.bind(_nyquist);
const isStable = _stability.isStable.bind(_stability);
const inverseLaplace = _inverseLaplace.execute.bind(_inverseLaplace);
const convolute = _convolution.execute.bind(_convolution);
const step = _timeResponse.step.bind(_timeResponse);
const impulse = _timeResponse.impulse.bind(_timeResponse);
const getDefaultFrequencyRange = _frequencyRange.getDefault.bind(_frequencyRange);

export type {
  BodeData,
  BodeOutput,
  Complex,
  IBode,
  ICalculateTransferFunction,
  IConvolution,
  IInverseLaplace,
  INyquist,
  IPolynomialOperations,
  IRootFinding,
  IRootLocus,
  IStability,
  ITimeResponse,
  ITransferFunction,
  NyquistData,
  NyquistOutput,
  Point,
  RootLocusData,
  TransferFunctionExpression,
  TransferFunctionInput,
};

export {
  bode,
  calculateTransferFunctionValue,
  complex,
  convolute,
  expressionToString,
  findRoots,
  getDefaultFrequencyRange,
  impulse,
  inverseLaplace,
  isStable,
  nyquist,
  step,
  transferFunction,
};
