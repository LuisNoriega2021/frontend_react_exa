import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

import StandarResponse from '../models/StandarResponse';

import { EnvironmentServer } from '../configs/EnvironmentServer';

import { decrypt } from '../utils/decrypt';
import TransformeResponsesApisOld from '../helpers/TransformeResponsesApisOld';
import { CodesExito, CodesRedirecciones } from '../constants/emuns';

// eslint-disable-next-line sonarjs/cognitive-complexity
export default async (req: Request, res: Response, next: NextFunction) => {
	const host = req.hostname.toLowerCase();
	const modoDev = ['127.0.0.1', 'localhost'].includes(host);

	const token = req.cookies.H506f72417070;

	if (token) {
		const decode = decrypt(token, EnvironmentServer.AppJwtClave, EnvironmentServer.AppId);
		const apiResponse = TransformeResponsesApisOld.resolve(decode);
		if (apiResponse.ReturnCode.valueOf() === 200) return next();
		else return res.status(apiResponse.ReturnCode).json(apiResponse);
	} else {
		if (modoDev) {
			try {
				const {
					data: { ReturnCode, ReturnSubCode, ReturnMsg, ReturnData },
				} = await axios.get(`${EnvironmentServer.ApiJWE}Jwe/crear`, {
					params: {},
					headers: {
						usuario: EnvironmentServer.AppUsuario,
						contrasenia: EnvironmentServer.AppClave,
						idAplicacionOrigen: EnvironmentServer.AppId,
						'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
					},
				});

				if (ReturnCode.valueOf() === 200) {
					const expires = new Date(Date.now() + 86400000);
					res.cookie('H506f72417070', ReturnData.result, {
						httpOnly: true,
						secure: true,
						expires,
						domain: 'localhost',
					});

					return next();
				}

				return res.status(ReturnCode).json({ ReturnCode, ReturnSubCode, ReturnMsg, ReturnData }).end();
			} catch (e) {
				return next(e);
			}
		} else {
			return res.status(CodesExito.OK).json(
				new StandarResponse({
					ReturnCode: CodesRedirecciones.FOUND,
					ReturnMsg: 'UNAUTHORIZED',
				}),
			);
		}
	}
};
