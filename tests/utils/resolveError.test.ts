import { expect } from 'chai';
import resolveError from '../../src/utils/resolveError';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { IStandarResponse } from '../../src/interfaces/IApiResponses';

describe('Función: resolveError(error)', () => {
	it('Resolver: TypeError', () => {
		const message = 'ERROR TYPE: TypeError FOR MOCHA TEST';
		const resolucion = resolveError(new TypeError(message));
		const isTypeError = resolucion.includes(`ERROR_TYPE_ERROR: ${message}`);

		expect(isTypeError).equal(true);
	});

	it('Resolver: RangeError', () => {
		const message = 'ERROR TYPE: RangeError FOR MOCHA TEST';
		const resolucion = resolveError(new RangeError(message));
		const isRangeError = resolucion.includes(`ERROR_RANGE_ERROR: ${message}`);

		expect(isRangeError).equal(true);
	});

	it('Resolver: EvalError', () => {
		const message = 'ERROR TYPE: EvalError FOR MOCHA TEST';
		const resolucion = resolveError(new EvalError(message));
		const isEvalError = resolucion.includes(`ERROR_EVAL_ERROR: ${message}`);

		expect(isEvalError).equal(true);
	});

	it('Resolver: MessageStringError', () => {
		const message = 'ERROR TYPE: MessageStringError FOR MOCHA TEST';
		const resolucion = resolveError(message);
		const isMessageStringError = resolucion.includes(`ERROR_MESSAGESTRING_ERROR: ${message}`);

		expect(isMessageStringError).equal(true);
	});

	it('Resolver: AxiosError', () => {
		const message = 'ERROR TYPE: AxiosError FOR MOCHA TEST';
		const config:AxiosRequestConfig<IStandarResponse> = {
			url: 'https://nofunciona500.com',
		};

		const payload:AxiosError = {
			config,
			code: '500',
			isAxiosError: true,
			toJSON: function (): object {
				return JSON.parse('{}');
			},
			name: '',
			message,
		};
		
		const resolucion = resolveError(payload);
		
		const isAxiosError = resolucion.includes(`ERROR_AXIOS_ERROR: ${message}`);

		expect(isAxiosError).equal(true);
	});

	it('Resolver: EverythingElseError', () => {
		const message = 'ERROR TYPE: EverythingElseError FOR MOCHA TEST';
		const resolucion = resolveError(new Error(message));
		const isEverythingElseError = resolucion.includes(`ERROR_EVERYTHINGELSE_ERROR: ${message}`);

		expect(isEverythingElseError).equal(true);
	});
});
