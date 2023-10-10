import { OAS3Options } from 'swagger-jsdoc';

const standarResponse = '#/components/schemas/StandarResponse';
const parametersId = '#/components/parameters/id';
const responses = '#/components/responses/';
const exitoMsg = 'Respuesta exitosa';
const descriptionMsg = 'Mensaje personalizado de respuesta del servidor';
const descriptionSubCode = 'Código http de solicitudes realizadas internamente o mensajes de códigos estándar';
const descriptionCode = 'Código http';
const descriptionData = 'Resultado de la petición';
const typeData = 'object | array | string | number | null';
const appJson = 'application/json';

const options: OAS3Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Plantilla MERN',
			description: 'Esta es una api rest interna',
			version: '1.0.0',
			contact: {
				name: 'Daniel Elías',
				url: 'asesuisa.com',
				email: 'delias@asesuisa.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:5000/api',
				description: 'Servidor de desarrollo',
			},
		],
		paths: {
			'/ping': {
				get: {
					tags: ['Pings'],
					summary: 'Obtiene una lista de objetos Ping',
					description: 'Obtiene la lista de todos los ping!',
					operationId: 'getPing',
					parameters: [],
					responses: {
						'200': {
							description: 'Obtiene todos los Ping',
							headers: {},
							content: {
								'application/json': {
									schema: {
										$ref: standarResponse,
									},
									examples: {
										'200': { $ref: '#/components/examples/AllPing' },
									},
									encoding: {
										contentType: appJson,
									},
								},
							},
							links: {},
						},
						'500': {
							$ref: `${responses}500`,
						},
					},
				},
				post: {
					tags: ['Pings'],
					summary: 'Crea un nuevo Ping',
					description: 'Guarda un nuevo Ping en base de datos y retorna los datos ingresados',
					operationId: 'postPing',
					parameters: [],
					responses: {
						'201': {
							content: {
								'application/json': {
									schema: {
										$ref: standarResponse,
									},
								},
							},
							links: {},
						},
						'500': {
							$ref: `${responses}500`,
						},
					},
				},
				put: {
					tags: ['Pings'],
					summary: 'Actualiza un Ping en su totalidad',
					description: 'Valida un Ping existente y lo actualiza en su totalidad',
					operationId: 'putPing',
					parameters: [
						{
							$ref: parametersId,
						},
					],
					responses: {
						'200': {
							content: {
								'application/json': {
									schema: {
										$ref: standarResponse,
									},
								},
							},
							links: {},
						},
						'500': {
							$ref: `${responses}/500`,
						},
					},
				},
				patch: {
					tags: ['Pings'],
					summary: 'Actualiza un Ping parcialmente',
					description: 'Valida un Ping existente y lo actualiza parcialmente',
					operationId: 'patchPing',
					parameters: [
						{
							$ref: parametersId,
						},
					],
					responses: {
						'200': {
							$ref: `${responses}200`,
						},
						'500': {
							$ref: `${responses}500`,
						},
					},
				},
				delete: {
					tags: ['Pings'],
					summary: 'Elimina un Ping',
					description: 'Valida un Ping existente y lo elimina',
					operationId: 'deletePing',
					parameters: [
						{
							$ref: parametersId,
						},
					],
					responses: {
						'200': {
							$ref: `${responses}200`,
						},
						'500': {
							$ref: `${responses}500`,
						},
					},
				},
			},
			'/ping/{id}': {
				$ref: '',
				summary: 'Obtiene un Ping por id',
				description: 'Obtiene el ping especificado',
				get: {
					tags: ['Pings'],
					summary: 'Obtiene un Ping por id',
					description: 'Obtiene el ping especificado',
					operationId: 'getOnePing',
					parameters: [
						{
							$ref: parametersId,
						},
					],
					responses: {
						'200': {
							$ref: `${responses}200`,
						},
						'500': {
							$ref: `${responses}500`,
						},
					},
				},
			},
		},
		components: {
			schemas: {
				BaseResponse: {
					type: 'object',
					properties: {
						ReturnSubCode: {
							type: 'string',
							description: descriptionSubCode,
						},
						ReturnMsg: {
							type: 'string',
							description: descriptionMsg,
						},
					},
					example: {
						ReturnSubCode: '200',
						ReturnMsg: exitoMsg,
					},
				},
				StandarResponse: {
					type: 'object',
					properties: {
						ReturnCode: {
							type: 'number',
							description: descriptionCode,
						},
						ReturnSubCode: {
							type: 'string',
							description: descriptionSubCode,
						},
						ReturnMsg: {
							type: 'string',
							description: descriptionMsg,
						},
						ReturnData: {
							type: typeData,
							description: descriptionData,
						},
					},
					example: {
						ReturnCode: 200,
						ReturnSubCode: '200',
						ReturnMsg: exitoMsg,
						ReturnData: {},
					},
				},
				ResponseExtendErrors: {
					type: 'object',
					properties: {
						ReturnCode: {
							type: 'number',
							description: descriptionCode,
						},
						ReturnSubCode: {
							type: 'string',
							description: descriptionSubCode,
						},
						ReturnMsg: {
							type: 'string',
							description: descriptionMsg,
						},
						ReturnData: {
							type: typeData,
							description: descriptionData,
						},
						errores: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/BaseResponse',
							},
							description: 'Error o errores de la petición',
						},
					},
				},
				ErrorServidor: {
					type: 'object',
					properties: {
						ReturnCode: {
							type: 'number',
							description: 'Código http 500',
						},
						ReturnSubCode: {
							type: 'string',
							description: descriptionSubCode,
						},
						ReturnMsg: {
							type: 'string',
							description: 'Mensaje de error',
						},
						ReturnData: {
							$ref: '#/components/schemas/DataErrorServidor',
						},
						errores: {
							type: 'array',
							items: {},
							description: 'Error o errores de la petición',
						},
					},
				},
				DataErrorServidor: {
					type: 'object',
					properties: {
						error: {
							$ref: '#/components/schemas/Error',
						},
						errorType: {
							type: 'string',
							description: 'Indica de que tipo es el error',
						},
					},
					example: {
						error: {
							$ref: '#/components/examples/Error',
						},
						errorType: 'TypeError',
					},
				},
				Error: {
					type: 'object',
					properties: {
						name: {
							type: 'string',
							description: 'Tipo de error',
						},
						message: {
							type: 'string',
							description: 'Mensaje del error',
						},
						stack: {
							type: 'string',
							description: 'Stack donde se origino',
						},
						code: {
							type: 'string',
							description: 'Codigo si es error de axios',
						},
						status: {
							type: 'string',
							description: 'Estatus si es error de axios',
						},
					},
					example: {
						name: '',
						message: 'Error de conversion de datos',
						stack: 'c://repo/plantillamern/line:85',
						code: '',
						status: '',
					},
				},
			},
			responses: {
				'200': {
					description: 'Estándar de respuestas exitosas',
					headers: {},
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/StandarResponse',
							},
							examples: {
								OK: {
									ReturnCode: 200,
									ReturnSubCode: '200',
									ReturnMsg: exitoMsg,
									Result: null,
								},
								OKResult: {
									ReturnCode: 200,
									ReturnSubCode: '200',
									ReturnMsg: exitoMsg,
									Result: ['dato', 'datos'],
								},
								// 'OKNotContent': {
								// 	ReturnCode: 204,
								// 	ReturnSubCode: '204',
								// 	ReturnMsg: 'Recurso creado exitosamente',
								// 	Result: null,
								// }
							},
							encoding: {
								json: {
									contentType: appJson,
								},
							},
						},
					},
					links: {},
				},
				'201': {
					description: 'Estándar de respuestas exitosas 201',
					headers: {},
					content: {
						'application/json': {
							schema: {
								$ref: '#/definitions/StandarResponse',
							},
							examples: {
								OK201: {
									ReturnCode: 201,
									ReturnSubCode: '204',
									ReturnMsg: exitoMsg,
									Result: null,
								},
								OKResult201: {
									ReturnCode: 201,
									ReturnSubCode: '201',
									ReturnMsg: exitoMsg,
									Result: { name: 'Nombre', edad: 55 },
								},
							},
							encoding: {
								json: {
									contentType: appJson,
								},
							},
						},
					},
					links: {},
				},
				NotFound: {
					description: 'Recurso no encontrado',
				},
				GeneralError: {
					description: 'Respuesta, error general',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/ResponseExtendErrors',
							},
						},
					},
				},
				'500': {
					description: 'Respuesta, error del servidor',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/ErrorServidor',
							},
						},
					},
				},
			},
			parameters: {
				page: {
					name: 'page',
					in: 'query',
					description: 'Pagina actual',
					required: true,
					schema: {
						type: 'Integer',
						format: 'int32',
					},
				},
				id: {
					name: 'id',
					in: 'path',
					description: 'ID del recurso',
					required: true,
					schema: {
						type: 'string',
					},
				},
			},
			examples: {
				AllPing: {
					ReturnCode: 200,
					ReturnSubCode: '',
					ReturnMsg: 'Petición realizada con éxito',
					ReturnData: {
						pings: [{ ping: 1 }, { ping: 2 }, { ping: 3 }],
						version: 'api version 1.0.0',
					},
				},
				GetPing: {
					ReturnCode: 200,
					ReturnSubCode: '',
					ReturnMsg: 'Petición realizada con éxito',
					ReturnData: {
						idPing: '1',
						ping: 'Ping 1',
						version: 'api version 1.0.0',
					},
				},
				ErrorServidor: {
					ReturnCode: 500,
					ReturnSubCode: '',
					ReturnMsg: 'ERROR_DEL_SERVIDOR',
					ReturnData: {
						$ref: '#/components/examples/DataErrorServidor',
					},
					errores: [],
				},
				DataErrorServidor: {
					error: {
						$ref: '#/components/examples/Error',
					},
					errorType: 'TypeError',
				},
				Error: {
					name: '',
					message: 'Error de conversion de datos',
					stack: 'c://repo/plantillamern/line:85',
					code: '',
					status: '',
				},
			},
			requestBodies: {},
			headers: {},
			links: {},
		},
		tags: [
			{
				name: 'Pings',
				description: 'Endpoints para probar el servicio',
			},
		],
		basePath: '/',
		consumes: [appJson],
		produces: [appJson],
		definitions: {
			StandarResponse: {
				type: 'object',
				properties: {
					ReturnCode: {
						type: 'number',
						description: descriptionCode,
					},
					ReturnSubCode: {
						type: 'string',
						description: descriptionSubCode,
					},
					ReturnMsg: {
						type: 'string',
						description: descriptionMsg,
					},
					ReturnData: {
						type: typeData,
						description: descriptionData,
					},
				},
				example: {
					ReturnCode: 200,
					ReturnSubCode: '200',
					ReturnMsg: exitoMsg,
					ReturnData: {},
				},
			},
		},
	},
	apis: ['./src/server/routes/*.ts'],
};

export { options };
