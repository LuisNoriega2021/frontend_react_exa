import { Request, Response, NextFunction } from 'express';

import querystring from 'querystring';

import IErrorCustomHandler from '../interfaces/IErrorCustomHandler';

import StandarResponse from '../models/StandarResponse';
import ResponseExtendErrors from '../models/ResponseExtendErrors';

import resolveError from '../utils/resolveError';
import { CodesErrores, CodesErrorServer } from '../constants/emuns';
import { version as versionPackage } from '../../package.json';

export const validatePathsGetNotFound = (req: Request, res: Response) => {
	const responseApi = new StandarResponse({
		ReturnCode: CodesErrores.NOTFOUND,
		ReturnSubCode: '',
		ReturnMsg: 'Ruta no encontrada',
		ReturnData: {
			method: querystring.escape(req.method),
			path: querystring.escape(req.originalUrl),
			apiv: `api version ${versionPackage}`,
		},
	});

	res.status(responseApi.ReturnCode).json(responseApi).end();
};

export const validatePathsError = (err: IErrorCustomHandler, req: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(err);
	}
	if (err.status === 403 && err.message === 'ORIGEN_DESCONOCIDO') {
		return res
			.status(403)
			.json(
				new ResponseExtendErrors({
					ReturnCode: 403,
					ReturnSubCode: '',
					ReturnMsg: 'BLOQUEO_CORS',
					ReturnData: {
						error: {
							name: err.name,
							message: err.message,
							stack: err.stack,
							code: err.code,
							status: err.status,
						},
						errorType: resolveError(err),
					},
					errores: [],
				}),
			)
			.end();
	}
	res
		.status(500)
		.json(
			new ResponseExtendErrors({
				ReturnCode: CodesErrorServer.INTERNALSERVERERROR,
				ReturnSubCode: '',
				ReturnMsg: 'ERROR_DEL_SERVIDOR',
				ReturnData: {
					error: {
						name: err.name,
						message: err.message,
						stack: err.stack,
						code: err.code,
						status: err.status,
					},
					errorType: resolveError(err),
				},
				errores: [],
			}),
		)
		.end();
};
