import { expect } from 'chai';

import ValidateResponseApis from '../../src/helpers/ValidateResponseApis';

describe('ValidateResponseApis', () => {
	it('Nuevo estándar', () => {
		const response = { 'ReturnCode': 200, 'ReturnSubCode': '200', 'ReturnMsg': 'OK' };
		const validate = ValidateResponseApis.valid(200, 'OK', response);

		expect(validate).to.have.property('ReturnCode').to.be.equal(200);
		expect(validate).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(validate).to.have.property('ReturnMsg').to.be.equal('OK');
	});

	it('Estándar desconocido', () => {
		const response = { 'CodeResponse': 200, 'SubCodeResponse': '200', 'MsgResponse': 'OK' };
		const validate = ValidateResponseApis.valid(201, 'CREATED', response);

		expect(validate).to.have.property('ReturnCode').to.be.equal(200);
		expect(validate).to.have.property('ReturnSubCode').to.be.equal('201');
		expect(validate).to.have.property('ReturnMsg').to.be.equal('CREATED');
	});
});
