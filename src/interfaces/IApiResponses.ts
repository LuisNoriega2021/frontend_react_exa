import {
	CodesExito,
	CodesRedirecciones,
	CodesErrores,
	CodesErrorServer,
} from '../constants/emuns';

export interface IBaseResponse {
  ReturnSubCode?: string,
  ReturnMsg?: string,
}

export interface IStandarResponse extends IBaseResponse {
  ReturnCode?: CodesExito | CodesRedirecciones | CodesErrores | CodesErrorServer;
  ReturnData?: any
}

export interface IResponseExtendErrors extends IStandarResponse {
  errores?: IBaseResponse[]
}
