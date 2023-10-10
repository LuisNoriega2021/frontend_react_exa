import axios from 'axios';
import { Request, Response } from 'express';
import validator from 'validator';
import { CodesErrorServer, CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import auditoria from '../utils/auditoria';
import { getIdUsuario } from '../utils/user';
import { STS, STSOptions } from '../constants/headers';
import { setErrorAndThrow } from '../utils/setInputError';
import { ParsedQs } from 'qs';
const appJson = 'application/json';

async function documentosRequest(persona: { idPersona: number; dui: ''; nit: '' } | ParsedQs, idUsuario: number) {
	const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiDocumentos}Documentos`, {
		headers: {
			'Content-Type': appJson,
			'cache-control': 'no-cache',
			Authorization: appJson,
			'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
		},
		params: {
			idUsuario,
			idAplicacion: EnvironmentServer.AppId,
			idPersona: persona.idPersona ?? 0,
			DUI: persona.dui ?? '',
			NIT: persona.nit ?? '',
		},
	});
	return data;
}

export const obtenerDocsPersonales = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: [],
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.idPersona && !validator.escape(<string>req.query.idPersona + '')) {
			setErrorAndThrow(responseApi, 'idPersona invalido');
		}

		if (req.query.idPersona || req.query.dui || req.query.nit) {
			const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiDocumentos}Documentos`, {
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					idUsuario: IdUsuario,
					idAplicacion: EnvironmentServer.AppId,
					idPersona: req.query.idPersona ?? 0,
					DUI: req.query.dui ?? '',
					NIT: req.query.nit ?? '',
				},
			});
			responseApi.validateExternalResponseAndSetData(data);
		}
	} catch (e) {
		axios.isAxiosError(e) ? console.log(e.response.data) : console.log(e);

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

export const EliminarAdjunto = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: [],
	});

	const IdUsuario = getIdUsuario(req);
	try {
		if (<string>req.query.idListado && !validator.escape(<string>req.query.idListado + '')) {
			setErrorAndThrow(responseApi, 'idListado invalido');
		}

		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const axios = require('axios');

		const config = {
			method: 'post',
			url: `${EnvironmentServer.ApiDocumentos}Documentos/EliminarAdjunto`,
			headers: {
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				idAdjunto: req.body.idAdjunto,
				usuario: req.body.usuario,
			},
		};

		const { data } = await axios(config);
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		axios.isAxiosError(e) ? console.log(e.response.data) : console.log(e);

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

export const getDocListadoInterno = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: [],
	});
	const IdUsuario = getIdUsuario(req);
	try {
		if (<string>req.query.idListado && !validator.escape(<string>req.query.idListado + '')) {
			setErrorAndThrow(responseApi, 'idListado invalido');
		}
		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiDocumentos}AdjuntoListadoInterno`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				idListado: req.query.idListado,
			},
		});
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		axios.isAxiosError(e) ? console.log(e.response.data) : console.log(e);

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

export const obtenerDocsPersonalesFrom = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.idPersona && !validator.escape(<string>req.query.idPersona + '')) {
			setErrorAndThrow(responseApi, 'idPersona invalido');
		}

		if (req.query.idPersona || req.query.dui || req.query.nit) {
			const data = await documentosRequest(req.query, IdUsuario);
			responseApi.validateExternalResponseAndSetData(data);
		} else {
			const { data: data1 } = await axios.get<ResponseExtendErrors>(
				`${EnvironmentServer.ApiCliente}Asegurado/obtenerAseguradoPorCriterio`,
				{
					headers: {
						'Content-Type': appJson,
						'cache-control': 'no-cache',
						Authorization: appJson,
						'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
					},
					params: {
						TipoBusqueda: 'nom_aseg',
						ParamBusqueda: req.query.nombre,
						Param3: req.query.codUsuario,
					},
				},
			);
			const persona = data1.ReturnData.result[0];
			const data = await documentosRequest(persona, IdUsuario);
			responseApi.validateExternalResponseAndSetData(data);
		}
	} catch (e) {
		axios.isAxiosError(e) ? console.log(e.response.data) : console.log(e);

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

export const saveDocumentListadoInterno = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: [],
	});
	const IdUsuario = getIdUsuario(req);

	try {
		const body = {
			correlativo: req.body.correlativo,
			Cod_asegurado: req.body.cod_asegurado,
			NombreArchivo: req.body.nombreArchivo,
			TamanoArchivo: req.body.tamanoArchivo,
			Archivo: req.body.archivo,
			UrlArchivo: req.body.urlArchivo,
			IdUsuarioCrea: req.body.idUsuarioCrea,
			NombreUsuarioCrea: req.body.nombreUsuarioCrea,
		};
		const { data } = await axios.post<ResponseExtendErrors>(
			`${EnvironmentServer.ApiDocumentos}AdjuntoListadoInterno`,
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
	} catch (e) {
		axios.isAxiosError(e) ? console.log(e.response?.data) : console.log(e);

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
