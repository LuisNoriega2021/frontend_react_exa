import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import Auditoria from '../../src/utils/auditoria';
import { EnvironmentServer } from '../../src/configs/EnvironmentServer';
import { IStandarResponse } from '../../src/interfaces/IApiResponses';

chai.use(chaiHttp);

const errorMessage = 'ERROR de prueba unitarias con mocha';
const description = 'Test de auditoria de acciones con mocha';
const action = 'test-mocha';

describe('Auditoria', () => {
	it('Logs de acciones activas', async () => {
		const res: IStandarResponse | string | object = await Auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'mocha',
			description,
			action,
			1,
		);

		expect(res).to.have.property('ReturnCode').to.be.equal(200);
		expect(res).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(res).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(res).to.have.property('ReturnData').to.be.equal('OK');
	});

	it('Logs de acciones error', async () => {
		const res: IStandarResponse | string | object = await Auditoria.setAuditoriaAcciones(
			NaN,
			'mocha',
			description,
			action,
			1,
		);

		expect(res).to.have.property('ReturnCode').to.be.equal(200);
		expect(res).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(res).to.have.property('ReturnMsg').to.be.equal('OK');
		expect(res).to.have.property('ReturnData').to.be.equal('OK');
	});

	it('Logs de acciones inactivos', async () => {
		const res: IStandarResponse | string | object = await Auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'mocha',
			description,
			action,
			0,
		);

		expect(res).equal('LOGS_ACTIONS_INACTIVE');
	});

	it('Logs de errores activos', async () => {
		const res = await Auditoria.setAuditoriaError({
			IdUsuario: EnvironmentServer.AppId,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: 'server',
			Clase: 'Server',
			ErrorOriginal: errorMessage,
			setLogs: 1,
		});

		expect(res).to.have.property('ReturnCode').to.be.equal(200);
		expect(res).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(res).to.have.property('ReturnMsg').to.be.equal('OK');
	});

	it('Logs de errores inactivos', async () => {
		const res: IStandarResponse | string | object = await Auditoria.setAuditoriaError({
			IdUsuario: EnvironmentServer.AppId,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: 'server',
			Clase: 'Server',
			ErrorOriginal: errorMessage,
			Response: errorMessage,
			setLogs: 0,
		});

		expect(res).equal('LOGS_ERRORS_INACTIVE');
	});
});
