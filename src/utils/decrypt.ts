import { createHash } from 'crypto';
import { JWE } from 'jose';

import IOldApiResponse from '../interfaces/IOldApiResponse';
import { ITokenDataAplication, ITokenData } from '../interfaces/ITokenData';
import { setAuditoriaAcciones, setAuditoriaError } from './auditoria';
import { EnvironmentServer } from '../configs/EnvironmentServer';

const stringToBufffer = (str: string): Buffer => {
	return Buffer.alloc(str.length, str, 'ascii');
};

const decrypt = (token: string, clave: string, idApp: number): IOldApiResponse => {
	const resultado: IOldApiResponse = {
		IsSuccess: true,
		Message: 'OK',
		ResultType: 'json',
		Result: [],
	};
	let decoded = undefined;
	const optionsDecryp = { algorithms: ['dir', 'A128CBC-HS256'] };

	try {
		setAuditoriaAcciones(
			0,
			'decrypt: JWE.decrypt',
			`JWE.decrypt`,
			`token: ${token}, clave: ${clave}, optionsDecryp: ${clave}`,
		);
		decoded = JWE.decrypt(token, stringToBufffer(clave), optionsDecryp);

		try {
			const { user, exp } = JSON.parse(decoded.toString());
			const dateOfExpiry: Date = new Date(exp);
			const timeRemaining: number = dateOfExpiry.getTime() - new Date().getTime();

			if (timeRemaining > -1) {
				const dataToken: ITokenData = JSON.parse(user);

				if (dataToken.Aplicaciones.find((app: ITokenDataAplication) => app.IdAplicacion === idApp)) {
					resultado.Result = dataToken;
				} else {
					resultado.IsSuccess = false;
					resultado.Message = 'UNAUTHORIZED';
				}
			} else {
				resultado.IsSuccess = false;
				resultado.Message = 'TOKEN EXPIRED';
			}
		} catch (e) {
			setAuditoriaError({
				IdUsuario: 0,
				IdAplicacion: EnvironmentServer.AppId,
				ExceptionType: 'ERROR',
				NombreRecurso: 'decrypt',
				Clase: 'decrypt',
				ErrorOriginal: e.toString(),
				Response: e.toString(),
			});
			resultado.IsSuccess = false;
			resultado.Message = 'SERVER_ERROR';
		}
	} catch (e) {
		setAuditoriaError({
			IdUsuario: 0,
			IdAplicacion: EnvironmentServer.AppId,
			ExceptionType: 'ERROR',
			NombreRecurso: 'decrypt',
			Clase: 'decrypt',
			ErrorOriginal: e.toString(),
			Response: e.toString(),
		});
		resultado.IsSuccess = false;
		resultado.Message = 'ERR_JWE_DECRYPTION_FAILED';
	}

	return resultado;
};

const decryptInternal = (token: string): IOldApiResponse => {
	const resultado: IOldApiResponse = {
		IsSuccess: true,
		Message: 'OK',
		ResultType: 'json',
		Result: {},
	};

	try {
		const decoded = new URLSearchParams(token);
		try {
			const user = decoded.get('80Bz6d01');
			const hash = decoded.get('60HTGd7');
			resultado.Result = { IdUsuario: user, hash };
		} catch (e) {
			resultado.IsSuccess = false;
			resultado.Message = 'SERVER_ERROR';
		}
	} catch (e) {
		resultado.IsSuccess = false;
		resultado.Message = 'ERR_JWE_DECRYPTION_FAILED';
	}

	return resultado;
};

const getSHA1 = (input: string) => {
	return createHash('sha1').update(input).digest('hex');
};

export { decrypt, decryptInternal, getSHA1 };
