/* eslint-disable @typescript-eslint/no-var-requires */
const scanner = require('sonarqube-scanner');
const dotenv = require('dotenv');
const path = require('path');
const versionProject = require('./package.json').version;

const ENV = process.env.NODE_ENV;
const pathEnv = path.resolve(process.cwd(), 'ENV', `${ENV}.env`);
dotenv.config({ path: pathEnv });

// La URL del servidor de SonarQube. Predeterminado a https://sonarqube.asesuisa.com
const serverUrl = process.env.SONARQUBE_URL;

// El token se utiliza para conectarse al servidor de SonarQube/SonarCloud. Vacío por defecto
const token = process.env.SONARQUBE_TOKEN;

// projectKey debe ser único en una instancia de SonarQube dada
const projectKey = process.env.SONARQUBE_PROJECTKEY;

// options Map (optional) Se utiliza para pasar parámetros adicionales para el análisis
// Ver la [documentación oficial](https://docs.sonarqube.org/latest/analysis/analysis-parameters/) para mas detalles.
const options = {
	'sonar.projectKey': projectKey,
	'sonar.projectName': projectKey,
	'sonar.projectVersion': versionProject,
	// La ruta es relativa al archivo sonar-project.properties. Predeterminado a .
	'sonar.sources': 'src',
	'sonar.tests': 'tests',
	// lenguaje fuente
	'sonar.language': 'ts',
	'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
	// Codificación del código fuente. El valor predeterminado es la codificación predeterminada del sistema
	'sonar.sourceEncoding': 'UTF-8'
};

// parameters for sonarqube-scanner
const params = {
	serverUrl,
	token,
	options
};

const sonarScanner = async () => {
	console.info('INFO: SERVER UP: ', serverUrl);

	if (!serverUrl) {
		console.log('SonarQube url not set. Nothing to do...');
		return;
	}

	//  Función Callback (la ejecución del análisis es asíncrona).
	const callback  = () => console.info('INFO: Sonarqube scanner resultado: Análisis finalizado');

	scanner(params, callback);
};

sonarScanner()
	.catch(err => console.error('ERROR: Ocurrió un error durante el escaneo de Sonar', err));
