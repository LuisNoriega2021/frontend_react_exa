import express, { Request, Response, Application, NextFunction } from 'express';
import path from 'path';
import axios, { AxiosResponse } from 'axios';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// Swagger
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Routes
import LogoRoutes from '../routes/LogoRoutes.routes';
import MatrizControlRoutes from '../routes/MatrizControlRoutes.routes';
import UsuariosRoutes from '../routes/UsuariosRoutes.routes';
import ListIntRoutes from '../routes/ListadoInternoRoutes.routes';
import ListOFACRoutes from '../routes/ListadoOFACRoutes.routes';
import BloqueoAsegRoutes from '../routes/BloqueoAseguradoRoutes.routes';
import ListApnfdRoutes from '../routes/ListadoApnfd.Routes.routes';
import ListPeps from '../routes/ListadoPeps.Routes.routes';
import OfacRoutes from '../routes/OfacRoutes.routes';
import DocumentosRoutes from '../routes/documentos.routes';

import ApiConsultaAsegurado from '../routes/ConsultaAsegurado.routes';
import ApiConsulta from '../routes/Consulta.routes';
import ApiConsultaPago from '../routes/consultaPago.routes';
import ApiPolizaVida from '../routes/polizavida.routes';
import ApiPolizaNoVida from '../routes/polizanovida.routes';
import ApiConsultaMora from '../routes/consultaMora.routes';
import ApiSiniestroNoVida from '../routes/siniestroNoVIda.routes';
import ApiSiniestro from '../routes/siniestro.routes';
import ApiSiniestroVida from '../routes/siniestroVida.routes';
import ApiSiniestroSalud from '../routes/siniestroSalud.routes';
import consultaPoliza from '../routes/consultaPoliza.routes';
import ApiPolizaSalud from '../routes/polizaSalud.routes';
import ApiReportes from '../routes/reportes.routes';
import ApiSeguridad from '../routes/Seguridad.routes';

// Middlewares
import isLoggedInMiddleware from '../middlewares/is-logged-in.middleware';
import { validatePathsError, validatePathsGetNotFound } from '../middlewares/validate-routes.middleware';

// Constantes
import { EnvironmentServer } from '../configs/EnvironmentServer';
import { options } from '../configs/swaggerOptions';

// Utils, Helpers and Functions
import Auditoria from '../utils/auditoria';
import ValidateResponseApis from '../helpers/ValidateResponseApis';
import OriginVerification from '../helpers/OriginVerification';

const swaggerSpec = swaggerJsdoc(options);

class Server {
	private app: Application;
	private port: number;
	private apiPaths = {
		base: '/api',
		ping: '/ping',
		listadoInterno: '/listadointerno',
		listadoOFAC: '/listadoOFAC',
		bloqueoAseg: '/bloqueoAsegurado',
		matriz: '/matriz',
		swagger: '/swagger',
		listadoApnf: '/listado-apnfd',
		asegPEPs: '/listadoPeps',
		CargaOfac: '/cargaOfac',
		consultasise: '/consultaSise',
		consultaasegurado: '/consultaasegurado',
		BancaSegura: '/BancaSegura',
		catalogos: '/Catalogos',
		consultamora: '/Primas',
		logo: '/logo',
		usuarios: '/usuarios',
		documetos: '/documentos',
		seguridad: '/seguridad',
	};

	get getApp() {
		return this.app;
	}

	constructor() {
		this.app = express();
		this.port = isNaN(EnvironmentServer.AppPort) ? 5000 : EnvironmentServer.AppPort;
		this.corsApi();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		// https://www.npmjs.com/package/helmet
		this.app.use(helmet());

		this.app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));

		this.app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

		// Logs request
		this.app.use(morgan(['local', 'development'].includes(EnvironmentServer.AppTypeLogsMorgan) ? 'dev' : 'combined'));

		this.app.use(function (req, res, next) {
			// Política HSTS
			res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

			// Configuración explícita del encabezado CSP, no nos permite obtener recursos de otros orígenes
			res.setHeader(
				'Content-Security-Policy',
				"script-src 'sha256-qL8eyDo2wptplwtaA5UeSW+5M6IQadFRM0PPJfbHdfU=' 'self'; img-src 'self' data:; frame-ancestors 'self';",
			);

			next();
		});

		// A todas las respuestas les adjuntamos los siguientes encabezados
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			// Este encabezado es usado para las peticiones previas que hace el cliente y le indicamos los
			// encabezados soportados por nuestra api, ver mas en:
			// https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

			next();
		});

		// Parse cookies
		this.app.use(cookieParser());

		// limite
		this.app.use(bodyParser.json({ limit: '200mb' }));
		this.app.use(bodyParser.urlencoded({ limit: '200mb', extended: false, parameterLimit: 1000000 }));

		// Carpeta publica con archivos estáticos, si queremos agregar otras carpetas usar la misma sintaxis
		// tomar en cuenta la ruta en la que se encuentra la carpeta y desde donde se llama
		this.app.use(express.static(path.join(__dirname, '../public')));

		// Swagger
		this.app.use(`${this.apiPaths.base}${this.apiPaths.swagger}`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		// Instance axios
		axios.interceptors.response.use(
			function (response: AxiosResponse) {
				// Validamos que las respuestas de las apis a las cuales consultamos manejen el estándar definido
				// de no ser así se realiza una transformación al nuevo estándar
				const validRes = ValidateResponseApis.valid(response.status, response.statusText, response.data);
				response.data = validRes;

				return response;
			},
			function (error: any) {
				return Promise.reject(error);
			},
		);
	}

	routes() {
		// Mapping routes with middleware
		this.app.use(this.apiPaths.base, isLoggedInMiddleware);

		// Mapping routes not middleware
		this.app.use(`${this.apiPaths.base}${this.apiPaths.matriz}`, MatrizControlRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.listadoInterno}`, ListIntRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.listadoOFAC}`, ListOFACRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.bloqueoAseg}`, BloqueoAsegRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.listadoApnf}`, ListApnfdRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.asegPEPs}`, ListPeps);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.CargaOfac}`, OfacRoutes);

		this.app.use(`${this.apiPaths.base}${this.apiPaths.consultasise}`, ApiConsultaAsegurado);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.consultaasegurado}`, ApiConsulta);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.BancaSegura}`, ApiConsultaPago);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiPolizaVida);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiPolizaNoVida);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.consultamora}`, ApiConsultaMora);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiSiniestroNoVida);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiSiniestro);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiSiniestroVida);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiSiniestroSalud);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, consultaPoliza);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiPolizaSalud);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.catalogos}`, ApiReportes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.logo}`, LogoRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.usuarios}`, UsuariosRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.documetos}`, DocumentosRoutes);
		this.app.use(`${this.apiPaths.base}${this.apiPaths.seguridad}`, ApiSeguridad);

		this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
			if (req.url.includes('/api/') && req.url.startsWith('/api/') && req.url.indexOf('/api/') === 0) {
				return next();
			} else {
				res.sendFile(path.join(__dirname + '/../public/index.html'));
			}
		});

		this.app.use(`${this.apiPaths.base}*`, validatePathsGetNotFound);

		this.app.use(validatePathsError);
	}

	corsApi() {
		const originValidate = new OriginVerification(this.app);
		originValidate.validate();
	}

	listen() {
		this.app.listen(this.port, () => this.messageConsole());
	}

	async messageConsole() {
		Auditoria.setAuditoriaAcciones(
			EnvironmentServer.AppId,
			'server',
			'Servidor levantado correctamente',
			'server-start',
		);

		const lineSeparator = '######################################';

		console.log(lineSeparator);
		console.log(lineSeparator);
		console.log(`##### SERVER RUN IN PORT => ${this.port} #####`);
		console.log(lineSeparator);
		console.log(lineSeparator);
	}
}

export default Server;
