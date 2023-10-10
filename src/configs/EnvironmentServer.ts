import { EnvironmentClient, TEnvironmentClient } from './EnvironmentClient';

type TEnvironmentServer = {
	// URIS API´s
	ApiJWE: string;
	ApiAuditoria: string;
	ApiIApiAsesuisa: string;
	ApiSarlaft: string;
	ApiControlAsgurados: string;
	ApiCliente: string;
	ApiConsultaPago: string;
	ApiPolizaNoVida: string;
	ApiPolizaVida: string;
	ApiMora: string;
	ApiPoliza: string;
	ApiSiniestroNoVida: string;
	ApiSiniestro: string;
	ApiSiniestroVida: string;
	ApiSiniestroSalud: string;
	ApiPolizaSalud: string;
	ApiReportes: string;
	ApiSeguridad: string;
	ApiDocumentos: string;
	ApiRecaudacion: string;

	// Configuraciones app
	AppTypeLogsMorgan: string;
	AppUsuario: string;
	AppId: number;
	AppHttps: number;
	AppClave: string;
	AppJwtClave: string;
	Auditoria: {
		Errores: number;
		Acciones: number;
	};

	// Keys
	SuscriptionKey: string;
};

const EnvironmentServer: TEnvironmentServer & TEnvironmentClient = {
	...EnvironmentClient,
	ApiJWE: process.env.URI_JWE,
	ApiAuditoria: process.env.URI_AUDITORIA,
	ApiIApiAsesuisa: process.env.URI_IAPI,
	ApiCliente: process.env.URI_CLIENTE,
	ApiControlAsgurados: process.env.URI_CONTROL_ASEG,
	AppTypeLogsMorgan: process.env.NODE_ENV,
	AppUsuario: process.env.APP_USUARIO,
	ApiConsultaPago: process.env.URI_PAGO,
	ApiPolizaNoVida: process.env.URI_POLIZANOVIDA,
	ApiPolizaVida: process.env.URI_POLIZAVIDA,
	ApiMora: process.env.URI_MORA,
	ApiSiniestroNoVida: process.env.URI_SINIESTRONOVIDA,
	ApiSiniestro: process.env.URI_SINIESTRO,
	ApiSiniestroVida: process.env.URI_SINIESTROVIDA,
	ApiSiniestroSalud: process.env.URI_SINIESTROSALUD,
	ApiPoliza: process.env.URI_POLIZA,
	ApiPolizaSalud: process.env.URI_POLIZASALUD,
	ApiReportes: process.env.URI_REPORTES,
	ApiSeguridad: process.env.URI_SEGURIDAD,
	ApiRecaudacion: process.env.URI_RECAUDACION,
	ApiDocumentos: process.env.URI_DOCUMENTOS,
	AppId: Number(process.env.APP_ID),
	AppHttps: Number(process.env.APP_HTTPS),
	AppClave: process.env.APP_CLAVE,
	AppJwtClave: process.env.APP_JWT_CLAVE,
	ApiSarlaft: process.env.URI_SARLAFT,
	SuscriptionKey: process.env.SUBSCRIPTION_KEY,
	Auditoria: {
		Acciones: Number(process.env.SET_AUDITORIA_ACCIONES),
		Errores: Number(process.env.SET_AUDITORIA_ERRORES),
	},
};

export { TEnvironmentServer, EnvironmentServer };
