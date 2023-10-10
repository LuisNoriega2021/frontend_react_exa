import axios from 'axios';
import { IStandarResponse } from '../interfaces/IApiResponses';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import IAuditoriaError from '../interfaces/IAuditoriaError';

/**
 * Métodos para el manejo de auditoria
 * @module Utils-Auditoria
 */


/**
 * Método para guardar el log de errores
 * @name setAuditoriaError
 * @async
 * @param {number} IdUsuario Identificador del usuario
 * @param {number} IdAplicacion Identificador aplicacion
 * @param {string} ExceptionType
 * @param {string} NombreRecurso Nombre del metodo que se desea auditar
 * @param {string} Clase
 * @param {string} ErrorOriginal StackTrace
 * @param {string} TransactionID ID de transacción
 * @param {string} Request Petición solicitada
 * @param {string} Response Respuesta emitida
 * @param {number} [setLogs] Indica si los logs están activos
 */
const setAuditoriaError = async (paramsLog:IAuditoriaError): Promise<IStandarResponse | string | object> => {
	const {
		IdUsuario,
		IdAplicacion,
		ExceptionType,
		NombreRecurso,
		Clase,
		ErrorOriginal,
		TransactionID = '',
		Request = '',
		Response = '',
		setLogs,
	} = paramsLog; 

	const canSetLogs = setLogs || EnvironmentServer.Auditoria.Errores;
	if (canSetLogs) {
		try {
			const { data } = await axios.post(
				`${EnvironmentServer.ApiAuditoria}AuditaErrores`,
				{
					IdUsuario,
					IdAplicacion,
					ExceptionType,
					NombreRecurso,
					IPEquipo: '0.0.0.0',
					NombreEquipo: 'No definido',
					Clase,
					ErrorOriginal,
					TransactionID,
					Request,
					Response,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
		
			return data;
		} catch (e:any) {
			console.log('ERROR in auditoria/setAuditoriaError', e);
			throw new Error(e.message);
		}
	}

	return 'LOGS_ERRORS_INACTIVE';
};

/**
 * Método para guardar log de acciones
 * @name setAuditoriaAcciones
 * @async
 * @param {number} IdUsuario Identificador del usuario
 * @param {string} NombreRecurso Nombre del metodo que se desea auditar
 * @param {string} Descripcion
 * @param {string} Accion StackTrace
 * @param {string} [setLogs] Indica si los logs están activos
 */
const setAuditoriaAcciones = async (
	IdUsuario: number,
	NombreRecurso: string,
	Descripcion: string,
	Accion: string,
	setLogs?: number,
): Promise<IStandarResponse | string | object> => {
	setLogs = setLogs || EnvironmentServer.Auditoria.Errores;
	if (setLogs) {
		const param = {
			IdUsuario,
			IdAplicacion: EnvironmentServer.AppId,
			NombreRecurso,
			Descripcion,
			Accion,
		};
	
		try {
			const { data } = await axios.post(
				`${EnvironmentServer.ApiAuditoria}AuditaAcciones`,
				param,
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);
		
			return data;
		} catch (e:any) {
			console.log('ERROR in auditoria/setAuditoriaError', e);
			throw new Error(e.message);
		}
	}

	return 'LOGS_ACTIONS_INACTIVE';
};

export {
	setAuditoriaError,
	setAuditoriaAcciones,
};

/**
 * Métodos para el manejo de auditoria
 */
export default {
	setAuditoriaError,
	setAuditoriaAcciones,
};
