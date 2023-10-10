export interface ITokenDataAplication {
	IdAplicacion: number;
}

export interface ITokenData {
	IdUsuario: number;
	Nombres: string;
	Apellidos: string;
	Usuario: string;
	TipoUsuario: number;
	Origen: number;
	Aplicaciones: Array<ITokenDataAplication>;
}

export default ITokenData;
