import { IResponseExtendErrors } from '../interfaces/IApiResponses';
import TransformeResponsesApisOld from './TransformeResponsesApisOld';
import IOldApiResponse from '../interfaces/IOldApiResponse';
import { CodesExito } from '../constants/emuns';
import ResponseExtendErrors from '../models/ResponseExtendErrors';

class ValidateResponseApis {
	static valid(
		status: number,
		statusText: string,
		response: IOldApiResponse | IResponseExtendErrors | any
	): IResponseExtendErrors {
		let validResponse: IResponseExtendErrors;
		const keys = Object.keys(response);

		if (keys.includes('IsSuccess') && keys.includes('Message') && keys.includes('Result')) {
			validResponse = TransformeResponsesApisOld.resolve(response);
			validResponse.ReturnSubCode = String(status);
		} else if (keys.includes('ReturnCode') && keys.includes('ReturnMsg')) {
			validResponse = response;
		} else {
			const responseExtend = new ResponseExtendErrors({
				ReturnCode: CodesExito.OK,
				ReturnSubCode: String(status),
				ReturnMsg: statusText,
				ReturnData: response,
			});

			validResponse = responseExtend;
		}

		return validResponse;
	}
}

export default ValidateResponseApis;
