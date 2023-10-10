import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ServerApp from '../../src/ServerApp';

chai.use(chaiHttp);

describe('Ping controller', () => {
	it('getPing', async () => {
		const request = chai.request(ServerApp.getApp);
		const res = await request.get('/api/ping');

		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Petición realizada con éxito');
		expect(res.body.ReturnData.pings).to.instanceof(Array);
		expect(typeof res.body.ReturnData.version).to.equals('string');
		expect(res.body.ReturnData.version).to.contain('api version');
	});

	it('getOnePing', async () => {
		const idPing = '1';
		const request = chai.request(ServerApp.getApp);
		const res = await request.get(`/api/ping/${idPing}`);

		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Petición realizada con éxito');
		expect(res.body.ReturnData).to.instanceof(Object);
		expect(res.body.ReturnData.idPing).to.equals(idPing);
		expect(res.body.ReturnData.ping).equals(`Ping ${idPing}`);
	});

	it('postPing', async () => {
		const data = { ping: 'Ping!!! :D', version: '0.0.1' };
		const request = chai.request(ServerApp.getApp);
		const res = await request.post(`/api/ping`).send(data);

		expect(res).to.have.status(201);
		expect(res.body.ReturnCode).to.equals(201);
		expect(res.body.ReturnSubCode).to.equals('200');
		expect(res.body.ReturnMsg).to.equals('Recurso creado');
		expect(res.body.ReturnData).to.instanceof(Object);
		expect(res.body.ReturnData.idPing).to.equals(1);
		expect(res.body.ReturnData.ping).equals(data.ping);
		expect(res.body.ReturnData.version).equals(data.version);
	});

	it('putPing', async () => {
		const idPing = '1';
		const data = { ping: 'Ping!!! :)', version: '0.0.1' };
		const request = chai.request(ServerApp.getApp);
		const res = await request.put(`/api/ping/${idPing}`).send(data);

		expect(res).to.have.status(200);
		expect(res.body.ReturnCode).to.equals(200);
		expect(res.body.ReturnMsg).to.equals('Recurso actualizado con éxito');
		expect(res.body.ReturnData).to.instanceof(Object);
		expect(res.body.ReturnData.idPing).to.equals(idPing);
		expect(res.body.ReturnData.ping).equals(data.ping);
		expect(res.body.ReturnData.version).equals(data.version);
	});

	it('patchPing', async () => {
		const idPing = '1';
		const data = { ping: 'Ping!!! :|' };
		const request = chai.request(ServerApp.getApp);
		const res = await request.patch(`/api/ping/${idPing}`).send(data);

		expect(res).to.have.status(200);
		expect(res.body).to.have.property('ReturnCode').to.be.equal(200);
		expect(res.body).to.have.property('ReturnMsg').to.be.equal('Recurso actualizado parcialmente con éxito');
		expect(res.body).to.have.property('ReturnData').to.be.instanceof(Object);
		expect(res.body.ReturnData).to.have.property('idPing').to.be.equal(idPing);
		expect(res.body.ReturnData).to.have.property('ping').to.be.equal(data.ping);
	});

	it('deletePing', async () => {
		const idPing = 1;
		const request = chai.request(ServerApp.getApp);
		const res = await request.delete(`/api/ping/${idPing}`);

		expect(res).to.have.status(200);
		expect(res.body).to.have.property('ReturnCode').to.be.equal(204);
		expect(res.body).to.have.property('ReturnSubCode').to.be.equal('200');
		expect(res.body).to.have.property('ReturnMsg').to.be.equal('Recurso eliminado con éxito');
		expect(res.body).to.have.property('ReturnData').to.be.equal(idPing);
	});
});
