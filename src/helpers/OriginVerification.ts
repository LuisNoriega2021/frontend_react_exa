import { Request, Application } from 'express';
import cors from 'cors';
import { EnvironmentServer } from '../configs/EnvironmentServer';
import IErrorCustomHandler from 'interfaces/IErrorCustomHandler';

class OriginVerification {
	private _whiteList: string[] = [
		'https://appcontrolaseguradodev.asesuisa.com',
		'https://appcontrolaseguradotest.asesuisa.com',
		'https://appcontrolasegurado.asesuisa.com',
	];
	private _app: Application;

	set setApp(value: Application) {
		this._app = value;
	}

	constructor(app: Application) {
		this._app = app;
		this.corsOptionsDelegate = this.corsOptionsDelegate.bind(this);
		this.corsOptions = this.corsOptions.bind(this);
		if (['local', 'development'].includes(EnvironmentServer.AppEnvironment)) {
			this._whiteList.push('http://localhost:5000'); // Para la API interna
			this._whiteList.push('http://localhost:3000'); // Para otras API´s
			this._whiteList.push('127.0.0.1'); // Para pruebas con mocha
			this._whiteList.push('http://localhost:6006'); // Para pruebas con storybook
		}
	}

	corsOptions(req: Request) {
		const whitelist = this._whiteList;

		return {
			origin: function (origin: string | null, callback: (error: null | Error, origin?: boolean) => void) {
				debugger;
				if (whitelist.indexOf(req.header('Origin')) !== -1 || !origin) {
					callback(null, true);
				} else {
					const error1: IErrorCustomHandler = new Error('ORIGEN_DESCONOCIDO');
					error1.status = 403;
					callback(error1);
				}
			},
		};
	}

	corsOptionsDelegate(req: Request, callback: (error: null | Error, option: object) => void) {
		const corsOptions: object = {
			allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
			preflightContinue: false,
			optionsSuccessStatus: 204,
			...this.corsOptions(req),
		};

		callback(null, corsOptions);
	}

	validate() {
		this._app.use(cors(this.corsOptionsDelegate));
	}
}

export default OriginVerification;
