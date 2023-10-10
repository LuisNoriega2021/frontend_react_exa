import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ServerApp from '../../src/ServerApp';

chai.use(chaiHttp);

describe('Middleware: validate-routes', () => {
	it('Rutas que no existen GET /api/no-existe 404', async () => {
		const request = chai.request(ServerApp.getApp);
		const res = await request.get('/api/no-existe');

		expect(res).to.have.status(404);
		expect(res.body.ReturnCode).to.equals(404);
		expect(res.body.ReturnMsg).to.equals('Ruta no encontrada');
	});

	// * esta prueba se debe habilitar cuando se estén manejando globalmente los errores de express
	// it('Rutas que generan error: POST /api 500', async () => {
	// 	const request = chai.request(ServerApp.getApp);
	// 	const res = await request.post('/api');

	// 	expect(res).to.have.status(500);
	// 	expect(res.body.ReturnCode).to.equals(500);
	// 	expect(res.body.ReturnMsg).to.equals('Error del servidor');
	// });
});
