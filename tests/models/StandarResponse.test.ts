import { expect } from 'chai';

import StandarResponse from '../../src/models/StandarResponse';

describe('StandarResponse', () => {
	it('StandarResponse ReturnData = null', () => {
		const response = new StandarResponse({
			ReturnCode: 200,
			ReturnSubCode: '200',
			ReturnMsg: 'OK',
		});

		expect(response).to.have.property('ReturnCode').to.be.equal(200);
		expect(response).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(response).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(response).to.have.property('ReturnData').to.be.equal(null);
	});
});
