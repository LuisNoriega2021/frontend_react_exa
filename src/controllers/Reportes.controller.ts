import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import validator from 'validator';
import { CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import auditoria from '../utils/auditoria';
import { setErrorAndThrow } from '../utils/setInputError';
import { getIdUsuario } from '../utils/user';
// import https from 'https'; // TODO: Remove this before sending changes to test

const appJson = 'application/json';
const fechaInicioMensaje = 'fechaInicio invalido';
const fechaFinMesaje = 'fechaFin invalido';
export const RptPagosCheques = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.monto && !validator.escape(<string>req.query.monto + '')) {
			setErrorAndThrow(responseApi, 'monto invalido');
		}
		if (<string>req.query.fechaInicio && !validator.escape(<string>req.query.fechaInicio + '')) {
			setErrorAndThrow(responseApi, fechaInicioMensaje);
		}
		if (<string>req.query.fechaFin && !validator.escape(<string>req.query.fechaFin + '')) {
			setErrorAndThrow(responseApi, fechaFinMesaje);
		}
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiReportes}Catalogos/RptPagosCheques`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					monto: req.query.monto,
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'Catalogos/RptPagosCheques',
			'get report PagosCheques',
			'RptPagosCheques',
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

export const RptPagosEfectivoAse = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.tipo && !validator.escape(<string>req.query.tipo + '')) {
			setErrorAndThrow(responseApi, 'tipo invalido');
		}

		if (<string>req.query.monto && !validator.escape(<string>req.query.monto + '')) {
			setErrorAndThrow(responseApi, 'monto invalido');
		}
		if (<string>req.query.fechaInicio && !validator.escape(<string>req.query.fechaInicio + '')) {
			setErrorAndThrow(responseApi, fechaInicioMensaje);
		}
		if (<string>req.query.fechaFin && !validator.escape(<string>req.query.fechaFin + '')) {
			setErrorAndThrow(responseApi, fechaFinMesaje);
		}

		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiReportes}Catalogos/RptPagosEfectivoAse`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					tipo: req.query.tipo,
					monto: req.query.monto,
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'Catalogos/RptPagosEfectivoAse',
			'get report PagosEfectivoAse',
			'RptPagosEfectivoAse',
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

export const getSpRptGiro = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.fechaInicio && !validator.escape(<string>req.query.fechaInicio + '')) {
			setErrorAndThrow(responseApi, fechaInicioMensaje);
		}
		if (<string>req.query.fechaFin && !validator.escape(<string>req.query.fechaFin + '')) {
			setErrorAndThrow(responseApi, fechaFinMesaje);
		}

		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Catalogos/getSpRptGiro`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
			},
		});

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'Catalogos/getSpRptGiro',
			'get report Giro',
			'getSpRptGiro',
		);
	} catch (e) {
		console.log(e);
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

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptAltas = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Catalogos/RptAltas`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				opcion: req.query.opcion,
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
			},
		});

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(EnvironmentServer.AppId, '/RptAltas', 'RptAltas', 'RptAltas');
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[3] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptBeneficiarios = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.tipoReporte && !validator.escape(<string>req.query.tipoReporte + '')) {
			setErrorAndThrow(responseApi, 'tipoReporte invalido');
		}
		if (<string>req.query.opcion && !validator.escape(<string>req.query.opcion + '')) {
			setErrorAndThrow(responseApi, 'opcion invalido');
		}
		if (<string>req.query.filtro && !validator.escape(<string>req.query.filtro + '')) {
			setErrorAndThrow(responseApi, 'filtro invalido');
		}
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiReportes}Catalogos/RptBeneficiarios`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					tipoReporte: req.query.tipoReporte,
					opcion: req.query.opcion,
					filtro: req.query.filtro,
				},
			},
		);
		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptBeneficiarios',
			'RptBeneficiarios',
			'RptBeneficiarios',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[4] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptPagador = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.tipo && !validator.escape(<string>req.query.tipo + '')) {
			setErrorAndThrow(responseApi, 'tipo invalido');
		}

		if (<string>req.query.filtro && !validator.escape(<string>req.query.filtro + '')) {
			setErrorAndThrow(responseApi, 'filtro invalido');
		}

		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Catalogos/RptPagador`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				tipo: req.query.tipo,
				filtro: req.query.filtro,
			},
		});
		responseApi.validateExternalResponseAndSetData(data);
		auditoria.setAuditoriaAcciones(EnvironmentServer.AppId, '/RptPagador', 'RptPagador', 'RptPagador');
	} catch (e) {
		console.log(e);
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[5] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}
	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptSumaAsegurada = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		if (<string>req.query.fechaInicio && !validator.escape(<string>req.query.fechaInicio + '')) {
			setErrorAndThrow(responseApi, fechaInicioMensaje);
		}
		if (<string>req.query.fechaFin && !validator.escape(<string>req.query.fechaFin + '')) {
			setErrorAndThrow(responseApi, fechaFinMesaje);
		}
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiReportes}Catalogos/RptSumaAsegurada`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);
		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptSumaAsegurada',
			'RptSumaAsegurada',
			'RptSumaAsegurada',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[6] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptIngresos = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);
	try {
		Object.keys(req.query).forEach((item) => {
			if (req.query[item] && !validator.escape(<string>req.query[item] + '')) {
				setErrorAndThrow(responseApi, `${item} invalido`);
			}
		});
		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Ingresos`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				origen: req.query.origen,
				tipoRecaudo: req.query.tipoRecaudo,
				tipoMedioPago: req.query.tipoMedioPago,
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
				montoAcumulado: req.query.montoAcumulado,
				montoIndividual: req.query.montoIndividual
			},
			// httpsAgent: new https.Agent({ rejectUnauthorized: false }), // TODO: Remove this before sending changes to test
		});
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		const errorResponse = axios.isAxiosError(e) ? JSON.stringify((e as AxiosError)?.response?.data) : e.toString()
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[7] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: errorResponse,
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptIngresosAcumulados = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);
	try {
		Object.keys(req.query).forEach((item) => {
			if (req.query[item] && !validator.escape(<string>req.query[item] + '')) {
				setErrorAndThrow(responseApi, `${item} invalido`);
			}
		});
		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Ingresos/acumulados`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				origen: req.query.origen,
				tipoRecaudo: req.query.tipoRecaudo,
				tipoMedioPago: req.query.tipoMedioPago,
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
				sumaAcumulada: req.query.sumaAcumulada,
				excluirPagosReportados: req.query.excluirPagosReportados === 'true' ? 1 : 0
			},
			// httpsAgent: new https.Agent({ rejectUnauthorized: false }), // TODO: Remove this before sending changes to test
		});
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		const errorResponse = axios.isAxiosError(e) ? JSON.stringify((e as AxiosError).response.data) : e.toString()
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[7] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: errorResponse,
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptDetalleIngresos = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);
	try {
		Object.keys(req.query).forEach((item) => {
			if (req.query[item] && !validator.escape(<string>req.query[item] + '')) {
				setErrorAndThrow(responseApi, `${item} invalido`);
			}
		});

		const { data } = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Ingresos/detalles`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			params: {
				origen: req.query.origen,
				tipoRecaudo: req.query.tipoRecaudo,
				tipoMedioPago: req.query.tipoMedioPago,
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
				pagador: req.query.pagador
			},
			// httpsAgent: new https.Agent({ rejectUnauthorized: false }), // TODO: Remove this before sending changes to test
		});
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		const errorResponse = axios.isAxiosError(e) ? JSON.stringify((e as AxiosError).response.data) : e.toString()
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[7] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: errorResponse,
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const ReportarPago = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);
	try {
		Object.keys(req.body).forEach((item) => {
			if (req.body[item] && !validator.escape(<string>req.body[item] + '')) {
				setErrorAndThrow(responseApi, `${item} invalido`);
			}
		});

		const { data } = await axios.put<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Ingresos/reportar`, req.body, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			// httpsAgent: new https.Agent({ rejectUnauthorized: false }), // TODO: Remove this before sending changes to test
		});
		responseApi.validateExternalResponseAndSetData(data);
	} catch (e) {
		const errorResponse = axios.isAxiosError(e) ? JSON.stringify((e as AxiosError).response.data) : e.toString()
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[7] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: errorResponse,
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const ExportarIngresos = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);
	try {
		Object.keys(req.query).forEach((item) => {
			if (req.query[item] && !validator.escape(<string>req.query[item] + '')) {
				setErrorAndThrow(responseApi, `${item} invalido`);
			}
		});

		const response = await axios.get<ResponseExtendErrors>(`${EnvironmentServer.ApiReportes}Ingresos/exportar`, {
			headers: {
				'Content-Type': appJson,
				'cache-control': 'no-cache',
				Authorization: appJson,
				'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
			},
			responseType: 'arraybuffer',
			params: {
				origen: req.query.origen,
				tipoRecaudo: req.query.tipoRecaudo,
				tipoMedioPago: req.query.tipoMedioPago,
				fechaInicio: req.query.fechaInicio,
				fechaFin: req.query.fechaFin,
				sumaAcumulada: req.query.sumaAcumulada,
				excluirPagosReportados: req.query.excluirPagosReportados === 'true' ? 1 : 0
			},
			// httpsAgent: new https.Agent({ rejectUnauthorized: false }), // TODO: Remove this before sending changes to test
		});

		responseApi.validateExternalResponseAndSetData(response.data);
		res.setHeader('Content-Disposition', response.headers['content-disposition']);
		res.setHeader('Content-Type', response.headers['content-type']);

	} catch (e) {
		const errorResponse = axios.isAxiosError(e) ? (e as AxiosError).response.data : e.toString()
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[7] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: errorResponse,
		});
	}

	return res.status(responseApi.ReturnCode).send(Buffer.from(responseApi.ReturnData));
};

export const RptPolizasNR = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiPoliza}Polizas/rptPolizasNoRenovadas`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptPolizasNoRenovadas',
			'RptPolizasNoRenovadas',
			'RptPolizasNoRenovadas',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[8] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptPolizasNrNoVida = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiPolizaNoVida}Catalogos/rptPolizasNoRenovadas`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptPolizasNoRenovadasNoVida',
			'RptPolizasNoRenovadasNoVida',
			'RptPolizasNoRenovadasNoVida',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[9] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptPolizasNrSalud = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiPolizaSalud}Polizas/rptPolizasNoRenovadas`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptPolizasNoRenovadasSalud',
			'RptPolizasNoRenovadasSalud',
			'RptPolizasNoRenovadasSalud',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[10] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};

export const RptPolizasNrVida = async (req: Request, res: Response): Promise<Response> => {
	const responseApi = new ResponseExtendErrors({
		ReturnCode: CodesExito.OK,
		ReturnSubCode: '',
		ReturnMsg: 'OK',
		ReturnData: null,
	});

	const IdUsuario = getIdUsuario(req);

	try {
		const { data } = await axios.get<ResponseExtendErrors>(
			`${EnvironmentServer.ApiPolizaVida}BancaSegura/rptPolizasNoRenovadas`,
			{
				headers: {
					'Content-Type': appJson,
					'cache-control': 'no-cache',
					Authorization: appJson,
					'Ocp-Apim-Subscription-Key': EnvironmentServer.SuscriptionKey,
				},
				params: {
					fechaInicio: req.query.fechaInicio,
					fechaFin: req.query.fechaFin,
				},
			},
		);

		responseApi.validateExternalResponseAndSetData(data);

		auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'/RptPolizasNoRenovadasVida',
			'RptPolizasNoRenovadasVida',
			'RptPolizasNoRenovadasVida',
		);
	} catch (e) {
		auditoria.setAuditoriaError({
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: req.originalUrl,
			Clase: `${__filename} ${(Object.values(this)[11] as Record<string, unknown>).name}`,
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
	}

	return res.status(responseApi.ReturnCode).json(responseApi);
};
