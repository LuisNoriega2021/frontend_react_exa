import { TypeEnvironment } from '../constants/types';

type TEnvironmentClient = {
	AppEnvironment: TypeEnvironment;
	AppPort: number;
	AppNombre: string;
	AppLogo: string;
	ApiInterna: string;
	QueryLimit: number;
	Archivos: object;
};

const EnvironmentClient: TEnvironmentClient = {
	AppEnvironment: process.env.NODE_ENV as TypeEnvironment,
	AppPort: Number(process.env.PORT),
	AppNombre: process.env.APP_NOMBRE,
	AppLogo: process.env.APP_LOGO,
	ApiInterna: process.env.URI_API_INTERNA,
	QueryLimit: Number(process.env.QUERY_LIMIT),
	Archivos: {
		imageQuality: 0.6, //factor de calidad al momento de reducir las imágenes
		// imageMaxSize: tamaño máximo permitido si sobrepasa se procede a reducir la imagen (25165824 bytes = 24 Mb )
		imageMaxSize: 25165824,
		//fileMaxSize: tamaño máximo permitido si sobrepasa se procede a reducir la imagen (25165824 bytes = 24 Mb )
		fileMaxSize: 25165824,
	},
};

export { TEnvironmentClient, EnvironmentClient };
