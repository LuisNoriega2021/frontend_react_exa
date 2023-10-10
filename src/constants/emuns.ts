export enum CodesExito {
  /**
   * Código básico de éxito. Funciona para los casos generales. Usado especialmente en la respuesta
   * exitosa de GET o el contenido actualizado
   */
  OK = 200,
  /**
   * Indica que el recurso fue creado. Típicamente es la respuesta a solicitudes PUT de creación o POST.
   */
  CREATED,
  /**
   * Indica que la solicitud ha sido aceptada para procesamiento. Típicamente es la respuesta para
   * una llamada a procesamiento asíncrono.
   */
  ACCEPTED,
  /**
   * La solicitud ha tenido éxito, pero no hay nada que mostrar. Frecuentemente enviado luego de DELETE exitoso
   */
  NOCONTENT = 204,
  /**
   * El recurso devuelto está incompleto. Típicamente usado con recursos paginados.
   */
  PARTIALCONTENT = 206
}

export enum CodesRedirecciones {
  /**
   * El URI solicitado ha sido redireccionado permanentemente a otro
   * recurso. El consumidor debe direccionar estas solicitudes a otro URI
   */
  MOVEDPERMANENTLY = 301,
  /**
   * El URI solicitado ha sido redireccionado temporalmente, el consumidor debe seguir pidiendo
   * este recurso en el futuro.
   */
  FOUND,
}

export enum CodesErrores {
  /**
   * Error general para una solicitud que no puede ser procesada (el consumidor no debe repetir
   * la solicitud sin modificarla).
   */
  BADREQUEST = 400,
  /**
   * Indica que el consumidor no tiene una identidad definida en el servicio
   */
  UNAUTHORIZED,
  /**
   * Indica que el consumidor tiene una identidad definida en el servicio, pero no tiene los permisos
   * para la solicitud que ha realizado
   */
  FORBIDDEN = 403,
  /**
   * El recurso solicitado no existe
   */
  NOTFOUND,
  /**
   * O el método no está soportado o lo relacionado a este recurso no tiene el permiso
   */
  METHODNOTALLOWED,
  /**
   * No existe el recurso en el formato solicitado. Por ejemplo, se solicita un recurso en XML
   * pero sólo está disponible en JSON
   */
  NOTACCEPTABLE
}

export enum CodesErrorServer {
  /**
   * La solicitud parece correcta pero un problema ha ocurrido en el servidor. El lciente no puede
   * hacer nada al respecto
   */
  INTERNALSERVERERROR = 500
}
