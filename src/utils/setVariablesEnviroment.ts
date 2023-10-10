import { config } from 'dotenv';
import resolvePathEnv from './resolve-path-environment';
import { TypeEnvironment } from '../constants/types';

export default (validateEnviroments?:string[], environment?: TypeEnvironment):void => {
	if (environment === undefined && (validateEnviroments === undefined || !Array.isArray(validateEnviroments))) {
		validateEnviroments = ['local'];
		environment = 'local';
	}

	if (validateEnviroments.includes(environment)) {
		config({ path: resolvePathEnv({ build: environment }) });
	}
};

