import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ServerApp from '../../src/ServerApp';

chai.use(chaiHttp);

describe('Middleware: is-logged-in', () => {
	it('Obtener cookie en modo desarrollo o pruebas', async () => {
		const request = chai.request(ServerApp.getApp);
		const res = await request.get('/api');

		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Petición realizada con éxito');
	});

	it('Validación con cookie', async () => {
		const request = chai.request.agent(ServerApp.getApp);
		const resCookie = await request.get('/api');

		expect(resCookie).to.have.status(200);

		const res = await request.get('/');
		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Petición realizada con éxito');
	});

	it('Validación con cookie', async () => {
		const request = chai.request(ServerApp.getApp);
		const res = await request.get('/').set('Cookie', 'z24HG56i=sinvalor');

		expect(res).to.have.status(500);
		expect(res.body.ReturnCode).to.equals(500);
	});
});
