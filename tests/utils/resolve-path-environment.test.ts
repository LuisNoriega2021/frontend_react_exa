import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import resolveEnvironment from '../../src/utils/resolve-path-environment';

let basePath = __dirname;
while (!fs.existsSync(path.join(basePath, 'package.json'))) {
	basePath = path.join(basePath, '..');
}
basePath = `${basePath}\\`;

describe('Resolve path environment', () => {
	it('resolve path local', () => {
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
		console.log('BasePath', basePath);
		console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

		const path = resolveEnvironment({ build: 'local' });

		expect(path).equal(basePath + 'local.env');
	});

	it('resolve path development', () => {
		const path = resolveEnvironment({ build: 'development' });

		expect(path).equal(basePath + 'development.env');
	});

	it('resolve path test', () => {
		const path = resolveEnvironment({ build: 'test' });

		expect(path).equal(basePath + 'test.env');
	});

	it('resolve path production', () => {
		const path = resolveEnvironment({ build: 'production' });

		expect(path).equal(basePath + 'production.env');
	});

	it('resolve path not argument build', () => {
		const path = resolveEnvironment({});

		expect(path).equal(basePath + 'local.env');
	});

	it('resolve path not argument', () => {
		const path = resolveEnvironment();

		expect(path).equal(basePath + 'local.env');
	});
});
