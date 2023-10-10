import { Request } from 'express';
import TransformeResponsesApisOld from '../helpers/TransformeResponsesApisOld';
import { decrypt } from './decrypt';
import { EnvironmentServer } from '../configs/EnvironmentServer';

const getIdUsuario = (req: Request) => {
	let IdUsuario = 0;
	const cookie = req.cookies.H506f72417070;
	if (cookie) {
		const decoded = decrypt(cookie, EnvironmentServer.AppJwtClave, EnvironmentServer.AppId);
		const apiResponse = TransformeResponsesApisOld.resolve(decoded);
		IdUsuario = Number(apiResponse.ReturnData.IdUsuario);
	}
	return IdUsuario;
};

export { getIdUsuario };
