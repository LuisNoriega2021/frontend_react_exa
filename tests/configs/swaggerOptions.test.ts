import { expect } from 'chai';

import { options } from '../../src/configs/swaggerOptions';

describe('Validar objeto Swagger', () => {
	it('Es objeto, retorna verdadero', async () => {
  	const esObjeto = options !== null && typeof options === 'object';
		expect(esObjeto).equal(true);
	});
});

