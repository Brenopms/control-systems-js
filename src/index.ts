import { Bode } from './lib/bode/bode';
import { IBode } from './lib/bode/bode.entities';
import { Impulse } from './lib/impulse/impulse';
import { IImpulse } from './lib/impulse/impulse.entities';
import { ICalculateTransferFunction } from './lib/math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from './lib/math/calculateTransferFunction/implementations/calculateTransferFunction';
import { Convolution } from './lib/math/convolution/convolution';
import { IConvolution } from './lib/math/convolution/convolution.entities';
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
import { RootLocus } from './lib/rootLocus/rootLocus';
import { IRootLocus } from './lib/rootLocus/rootLocus.entities';
import { Step } from './lib/step/step';
import { IStep } from './lib/step/step.entities';
import { TransferFunction } from './lib/transferFunction/transferFunction';
import { TransferFunctionInput } from './lib/transferFunction/transferFunction.entities';

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

const transferFunction = (transferFunctionInput: TransferFunctionInput) => {
  return new TransferFunction(
    transferFunctionInput,
    0,
    _rootFinder,
    _rootLocus,
    _bode,
    _nyquist,
    _stability,
    _step,
    _impulse
  );
};

const calculateTransferFunctionValue = _calculateTransferFunction.calculateValue;
const findRoots = _rootLocus.findRootLocus;
const bode = _bode.calculatePoints;
const nyquist = _nyquist.calculatePoints;
const isStable = _stability.isStable;
const inverseLaplace = _inverseLaplace.execute;
const convolute = _convolution.execute;
const step = _step.calculatePoints;
const impulse = _impulse.calculatePoints;

export {
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
};
