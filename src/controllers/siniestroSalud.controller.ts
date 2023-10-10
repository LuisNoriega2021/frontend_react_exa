import axios from 'axios';
import { Request, Response } from 'express';
import validator from 'validator';
import { CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import auditoria from '../utils/auditoria';
import { setErrorAndThrow } from '../utils/setInputError';
import { getIdUsuario } from '../utils/user';

const appJson = 'application/json';

export const obtenerSiniestralidadSaludAseg = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.codigoAseg && !validator.escape(<string>req.query.codigoAseg + '')) {
			setErrorAndThrow(responseApi, 'codigoAseg invalido');
		}
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSiniestroSalud}Catalogos/obtenerSiniestralidadSaludAseg`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					codigoAseg: req.query.codigoAseg,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'Catalogos/obtenerSiniestralidadSaludAseg',
			'get info obtenerSiniestralidadSaludAseg',
			'obtenerSiniestralidadSaludAseg',
		);
	} catch (e) {
		console.log(e);
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[0] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const obtenerPolizaSiniestrosMed = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.codigoAseg && !validator.escape(<string>req.query.codigoAseg + '')) {
			setErrorAndThrow(responseApi, 'codigoAseg invalido');
		}
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSiniestroSalud}Catalogos/obtenerPolizaSiniestrosMed`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					codigoAseg: req.query.codigoAseg,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'Catalogos/obtenerPolizaSiniestrosMed',
			'get info obtenerPolizaSiniestrosMed',
			'obtenerPolizaSiniestrosMed',
		);
	} catch (e) {
		console.log(e);
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[1] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};
