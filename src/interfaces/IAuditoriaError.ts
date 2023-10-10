interface IAuditoriaError {
  IdUsuario: number,
	IdAplicacion: number,
	ExceptionType: string,
	NombreRecurso: string,
	Clase: string,
	ErrorOriginal: string,
	TransactionID?: string,
	Request?: string,
	Response?: string,
	setLogs?: number,
}

export default IAuditoriaError;
