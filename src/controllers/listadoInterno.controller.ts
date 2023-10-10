/* eslint-disable sonarjs/no-duplicate-string */
import axios from 'axios';
import { Request, Response } from 'express';
import validator from 'validator';
import { CodesErrorServer, CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import auditoria from '../utils/auditoria';
import promiseAny from '../helpers/promiseAny';
import { getIdUsuario } from '../utils/user';
import { setErrorAndThrow } from '../utils/setInputError';
import { STS, STSOptions } from '../constants/headers';

const appJson = 'application/json';

export const getListadoInterno = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (!validator.isNumeric(<string>req.query.tipo + '')) {
			setErrorAndThrow(responseApi, 'tipo no es numero');
		}

		if (req.query.filtro && !validator.escape(<string>req.query.filtro + '')) {
			setErrorAndThrow(responseApi, 'filtro invalido');
		}

		if (req.query.repetir && !validator.isNumeric(<string>req.query.repetir + '')) {
			setErrorAndThrow(responseApi, 'repetir invalido');
		}

		const params = {
			tipo: req.query.tipo,
			filtro: req.query.filtro,
		};

		const repetir = Number(req.query.repetir ?? 1);

		const { data } = await promiseAny(
			Array.from({ length: repetir }).map(() => {
				return axios.get<ResponseExtendErrors>(
					`${EnvironmentServer.ApiSarlaft}ListadoInternoBusca/listadoInternoBusca`,
					{
						headers: {
							'Content-Type': appJson,
							'cache-control': 'no-cache',
							Authorization: appJson,
							'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
						},

						params,
					},
				);
			}),
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

export const addListadoInterno = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		const body = {
			tipo: req.body.tipo,
			IdListado: req.body.IdListado,
			apellido1: req.body.apellido1,
			apellido2: req.body.apellido2,
			nombres: req.body.nombres,
			alias: req.body.alias,
			dui: req.body.dui.replace('-', ''),
			nit: req.body.nit.replace('-', ''),
			delito: req.body.delito,
			referencia: req.body.referencia,
			observaciones: req.body.observaciones,
			codUsuario: req.body.codUsuario,
			pep: req.body.pep,
			idPersona: req.body.idPersona,
			habilitado: req.body.habilitado,
			strIdMotivoBloqueo: req.body.strIdMotivoBloqueo,
			idCalificacionRiesgo: req.body.idCalificacionRiesgo,
			codigo: req.body.codigo,
			idTipoTercero: req.body.idTipoTercero,
		};

		const { data } = await axios.post<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInterno/listadoInternoMT`,
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
			'ingresar en listado interno',
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

export const autorizaCliente = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);

	try {
		if (!validator.escape(<string>req.body.idListado + '')) {
			setErrorAndThrow(responseApi, 'id listado invalido');
		}

		if (!validator.escape(<string>req.body.codUsuario + '')) {
			setErrorAndThrow(responseApi, 'codigo usuario invalido');
		}

		if (!validator.escape(<string>req.body.motivo + '')) {
			setErrorAndThrow(responseApi, 'motivo invalido');
		}

		if (!validator.escape(<string>req.body.tipo + '')) {
			setErrorAndThrow(responseApi, 'tipo invalido');
		}
		const body = {
			idListado: req.body.idListado,
			codUsuario: req.body.codUsuario,
			motivo: req.body.motivo,
			tipo: req.body.tipo,
		};

		const { data } = await axios.put<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}Autorizacion/autorizaCliente`,
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
			'autorizacion',
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

export const getMotivos = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInternoBusca/motivoBloqueo`,
			{
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
					Authorization: 'application/json',
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},

				params: {},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(EnvironmentServer.AppId, '/ListadoInternoBusca', 'getMotivos', 'getMotivos');
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: '/getMotivos',
			Clase: 'listadoApnfd.controller',
			ErrorOriginal: e.toString(),
			Response: axios.isAxiosError(e) ? e.response?.data : e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const getCalificacionesRiesgo = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInternoBusca/calificacionRiesgo`,
			{
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
					Authorization: 'application/json',
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},

				params: {},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/ListadoInternoBusca',
			'getcalificacionRiesgo',
			'getcalificacionRiesgo',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: '/getMotivos',
			Clase: 'listadoApnfd.controller',
			ErrorOriginal: e.toString(),
			Response: axios.isAxiosError(e) ? e.response?.data : e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const getTipoTercero = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInternoBusca/tipoTercero`,
			{
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
					Authorization: 'application/json',
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},

				params: {},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(EnvironmentServer.AppId, '/ListadoInternoBusca', 'getTipoTercero', 'getTipoTercero');
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: '/getMotivos',
			Clase: 'listadoApnfd.controller',
			ErrorOriginal: e.toString(),
			Response: axios.isAxiosError(e) ? e.response?.data : e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const getInfoTercero = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInternoBusca/infoTercero`,
			{
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
					Authorization: 'application/json',
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},

				params: {
					tipo: req.query.tipo,
					filtro: req.query.filtro,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(EnvironmentServer.AppId, '/ListadoInternoBusca', 'getInfoTercero', 'getInfoTercero');
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: '/getMotivos',
			Clase: 'listadoApnfd.controller',
			ErrorOriginal: e.toString(),
			Response: axios.isAxiosError(e) ? e.response?.data : e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const auditoriaListadoInterno = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});
	const IdUsuario = getIdUsuario(req);
	console.log(req.body);

	try {
		const body = {
			codUsuario: req.body.codUsuario,
			idAplicacion: EnvironmentServer.AppId,
			nombreRecurso: req.body.nombreRecurso,
			urlRecurso: 'ListadoInterno/listadoInternoAuditoria',
			fechaHora: req.body.fechaHora,
			descripcion: req.body.descripcion,
			request: req.body.request,
			response: req.body.response,
		};

		const { data } = await axios.post<ResponseExtendErrors>(
			`${EnvironmentServer.ApiSarlaft}ListadoInterno/listadoInternoAuditoria`,
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
			'auditoria listado interno',
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
