import { expect } from 'chai';
import setVariablesEnviroment from '../../src/utils/setVariablesEnviroment';

describe('Función: setVariablesEnviroment(validateEnviroments?:string[], environment?: TypeEnvironment)', () => {
	it('Parámetros: ([\'local\'], \'local\')', () => {
		setVariablesEnviroment(['local'], 'local');

		expect(true).equal(true);
	});

	it('Parámetros: ([\'local\'], \'development\')', () => {
		setVariablesEnviroment(['local'], 'development');

		expect(true).equal(true);
	});

	it('Parámetros: (null, undefined)', () => {
		setVariablesEnviroment(null, undefined);

		expect(true).equal(true);
	});
});
