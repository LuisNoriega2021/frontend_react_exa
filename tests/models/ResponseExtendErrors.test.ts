import { expect } from 'chai';

import ResponseExtendErrors from '../../src/models/ResponseExtendErrors';

describe('ResponseExtendErrors', () => {
	it('Nuevo estándar result []', () => {
		const response = new ResponseExtendErrors({
			ReturnCode: 200,
			ReturnSubCode: '200',
			ReturnMsg: 'OK',
		});

		expect(response).to.have.property('ReturnCode').to.be.equal(200);
		expect(response).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(response).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(response).to.have.property('ReturnData').to.be.equal(null);
		expect(response).to.have.property('errores').to.be.instanceof(Array);
	});

	it('Nuevo estándar result {}', () => {
		const response = new ResponseExtendErrors({
			ReturnCode: 200,
			ReturnSubCode: '200',
			ReturnMsg: 'OK',
			ReturnData: {}
		});

		expect(response).to.have.property('ReturnCode').to.be.equal(200);
		expect(response).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(response).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(response).to.have.property('ReturnData').to.be.instanceof(Object);
		expect(response).to.have.property('errores').to.be.instanceof(Array);
	});

	it('Nuevo estándar', () => {
		const response = new ResponseExtendErrors({
			ReturnCode: 200,
			ReturnSubCode: '200',
			ReturnMsg: 'OK',
			ReturnData: {},
			errores: [
				{ ReturnSubCode: '200', ReturnMsg: 'OK' }
			]
		});

		expect(response).to.have.property('ReturnCode').to.be.equal(200);
		expect(response).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(response).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(response).to.have.property('ReturnData').to.be.instanceof(Object);
		expect(response).to.have.property('errores').to.be.instanceof(Object);
	});
});
