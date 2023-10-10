/**
 * @swagger
 * components:
 *  schemas:
 *    IResponseApi:
 *      type: object
 *      properties:
 *        IsSuccess:
 *          type: string
 *          description: Especifica si la respuesta es exitosa
 *        Message:
 *          type: string
 *          description: Mensaje personalizado de respuesta del servidor
 *        ResponseType:
 *          type: string
 *          description: Tipo de respuesta del servidor
 *        Result:
 *          type: object | array | string | number | null
 *          description: Resultado de la petición
 *      example:
 *        IsSuccess: true
 *        Message: Respuesta exitosa
 *        ResponseType: json
 *        Result: {}
 */

/**
 * @swagger
 * tags:
 *  name: Pings
 *  description: Endpoints para probar el servicio
 */

/**
 * @swagger
 * /api/ping:
 *  get:
 *    operationId: getPing
 *    summary: Información del servicio
 *    description: Sirve para testear el servicio
 *    tags:
 *      - Pings
 *    responses:
 *     200:
 *      description: Servicio en linea
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/IApiResponse'
 *          example:
 *            IsSuccess: true
 *            Message: Respuesta exitosa
 *            ResponseType: json
 *            Result: {}
 */
