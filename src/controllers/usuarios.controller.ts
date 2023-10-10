import axios from 'axios';
import { Request, Response } from 'express';

import ResponseExtendErrors from '../models/ResponseExtendErrors';

import { EnvironmentServer } from '../configs/EnvironmentServer';
import { CodesErrorServer, CodesExito } from '../constants/emuns';
import { setAuditoriaError } from '../utils/auditoria';
import { getIdUsuario } from '../utils/user';
import { STS, STSOptions } from '../constants/headers';

const appJson = 'application/json';

export const getMenuSeguridad = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);
	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSeguridad}Seguridad/obtenerMenu?idUsuario=${IdUsuario}&idAplicacion=${EnvironmentServer.AppId}`,
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
	} catch (e) {
		console.log(e.toString());

		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
		setAuditoriaError({
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

//Permisos Usuarios
export const getObtenerUsuariosPermisos = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSeguridad}Seguridad/obtenerUsuarioPermisos?idUsuario=${IdUsuario}&idAplicacion=${EnvironmentServer.AppId}`,
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
	} catch (e) {
		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
		setAuditoriaError({
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

export const getObtenerInfoAplicacion = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSeguridad}Seguridad/obtenerInfoAplicacion?idUsuario=${IdUsuario}&idAplicacion=${EnvironmentServer.AppId}`,
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
	} catch (e) {
		console.log(e.toString());
		responseApi.ReturnCode = CodesErrorServer.INTERNALSERVERERROR;
		setAuditoriaError({
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
