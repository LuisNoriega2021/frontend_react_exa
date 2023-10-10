import axios from 'axios';
import { Request, Response } from 'express';
import validator from 'validator';
import { CodesErrorServer, CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import auditoria from '../utils/auditoria';
import { getIdUsuario } from '../utils/user';
import { setErrorAndThrow } from '../utils/setInputError';
import { STS, STSOptions } from '../constants/headers';

const appJson = 'application/json';
const codigoAseguradoMessage = 'codigoAsegurado invalido';

export const BusquedaAsegurado = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (!validator.escape(<string>req.query.codigoAsegurado + '')) {
			setErrorAndThrow(responseApi, codigoAseguradoMessage);
		}
		const params = {
			codigoAsegurado: req.query.codigoAsegurado,
		};

		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiCliente}Asegurado/consultaBloqueoAsegurado`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: { codigoAsegurado: params.codigoAsegurado },
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		console.log(e);

		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
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

	res.setHeader(STS, STSOptions);
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const BloquearAsegurado = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (!validator.escape(<string>req.body.codigoAsegurado + '')) {
			setErrorAndThrow(responseApi, codigoAseguradoMessage);
		}

		if (!validator.escape(<string>req.body.motivo + '')) {
			setErrorAndThrow(responseApi, 'motivo invalido');
		}
		const body = {
			codigoAsegurado: req.body.codigoAsegurado,
			motivo: req.body.motivo,
			codUsuario: req.body.codUsuario,
		};

		const { data } = await axios.post<ResponseExtendErrors>(
			`${EnvironmentServer.ApiCliente}Asegurado/bloquearAsegurado`,
			body,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			IdUsuario,
			req.originalUrl,
			'bloquear Asegurado',
			`${__filename} ${(Object.values(this)[1] as Record<string, unknown>).name}`,
		);
	} catch (e) {
		console.log(e);

		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
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

	res.setHeader(STS, STSOptions);
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const DesbloquearAsegurado = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (!validator.escape(<string>req.body.codigoAsegurado + '')) {
			setErrorAndThrow(responseApi, codigoAseguradoMessage);
		}

		if (!validator.escape(<string>req.body.motivo + '')) {
			setErrorAndThrow(responseApi, 'motivo invalido');
		}
		const body = {
			codigoAsegurado: req.body.codigoAsegurado,
			motivo: req.body.motivo,
			codUsuario: req.body.codUsuario,
		};

		const { data } = await axios.post<ResponseExtendErrors>(
			`${EnvironmentServer.ApiCliente}Asegurado/desbloquearAsegurado`,
			body,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(
			IdUsuario,
			req.originalUrl,
			'desbloquear Asegurado',
			`${__filename} ${(Object.values(this)[2] as Record<string, unknown>).name}`,
		);
	} catch (e) {
		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[2] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}
	res.setHeader(STS, STSOptions);
	return res.status(responseApi.ReturnCode).json(responseApi);
};
