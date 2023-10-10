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

export const obtenerSiniestralidadVidaAseg = async (req: Request, res: Response): Promise<Response> => {
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
			`${EnvironmentServer.ApiSiniestroVida}Catalogos/obtenerSiniestralidadVidaAseg`,
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
			'Catalogos/obtenerSiniestralidadVidaAseg',
			'get info aseg obtenerSiniestralidadVidaAseg',
			'obtenerSiniestralidadVidaAseg',
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
			Response: axios.isAxiosError(e) ? e.response?.data : e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const obtenerPolizaSiniestrosVida = async (req: Request, res: Response): Promise<Response> => {
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
			`${EnvironmentServer.ApiSiniestroVida}Catalogos/obtenerPolizaSiniestrosVidaColect`,

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
			'Catalogos/obtenerPolizaSiniestrosVida',
			'get info obtenerPolizaSiniestrosVida',
			'obtenerPolizaSiniestrosVida',
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
