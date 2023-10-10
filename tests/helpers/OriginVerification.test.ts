import { expect } from 'chai';

import ServerApp from '../../src/ServerApp';
import { EnvironmentServer } from '../../src/configs/EnvironmentServer';
import OriginVerification from '../../src/helpers/OriginVerification';

describe('Helper: OriginVerification', () => {
	it('Instancia', () => {
		const originVerification = new OriginVerification(ServerApp.getApp);
		originVerification.validate();

		expect(originVerification).to.be.instanceOf(Object);
		expect(EnvironmentServer.AppEnvironment.trim()).to.be.oneOf(['local', 'development']);
	});

	it('Seteo de app', () => {
		const originVerification = new OriginVerification(ServerApp.getApp);
		originVerification.setApp = ServerApp.getApp;

		expect(originVerification).to.be.instanceOf(Object);
	});
});
