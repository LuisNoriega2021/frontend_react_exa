import { expect } from 'chai';
import { config } from 'dotenv';
import resolveEnvironment from '../../src/utils/resolve-path-environment';
import { TypeEnvironment } from '../../src/constants/types';

const environment = process.env.NODE_ENV as TypeEnvironment;
const path = resolveEnvironment({ build: environment });
config({ path });

import { EnvironmentServer } from '../../src/configs/EnvironmentServer';

describe('Inyección de variables', () => {
	it('Validar variables cargadas', async () => {
		const { AppEnvironment, AppPort, AppId } = EnvironmentServer;
		
		expect(AppEnvironment).equal(environment);
		expect(AppPort).equal(5000);
		expect(AppId).equal(9161);
	});
});

