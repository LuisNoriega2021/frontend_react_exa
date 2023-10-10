import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ServerApp from '../src/ServerApp';

chai.use(chaiHttp);

describe('ServerApp', () => {
	it('Test conexión /api', async () => {
		const request = chai.request(ServerApp.getApp);

		const res = await request.get('/api');
		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Petición realizada con éxito');
	});

	it('Test conexión /', async () => {
		const request = chai.request.agent(ServerApp.getApp);
		const resCookie = await request.get('/api');

		expect(resCookie).to.have.status(200);

		const res = await request.get('/algo');
		expect(res).to.have.status(200);
		expect(res).to.be.html;
	});
});
