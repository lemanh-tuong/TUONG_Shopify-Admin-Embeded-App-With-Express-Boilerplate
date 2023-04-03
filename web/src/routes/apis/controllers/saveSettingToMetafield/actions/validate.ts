import { HttpStatusCode } from 'consts';
import { ModelValidatorException } from 'exceptions';
import { settingValidator } from 'models';
import { reportService } from 'services';
import { ExpectBodyData } from '../@types';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả rõ tên, tiền điều kiện, hậu điều kiện, các bước thực hiện (nếu cần thiết)
    2. Testing nếu có thể 
 */

type ResponseError = Express.BaseResponseError & {
  errors?: ModelValidatorException<AppModels.Setting>['errors'];
};

/**
 * Tên usecase: Validate session token
 * Tiền điều kiện: Không có 
 * Hậu điều kiện: 
    - TH1: Trả về thông báo lỗi với thông tin các trường lỗi 
    - TH2: Tiếp tục bước tiếp theo 
 * Các bước thực hiện: ...
*/
export const validate: Express.MutationRequestHandler<ResponseError, ExpectBodyData> = async (
  request,
  response,
  next,
) => {
  try {
    const { setting } = request.body;
    await settingValidator(setting);
    next();
  } catch (error) {
    if (error instanceof ModelValidatorException<AppModels.Setting>) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error),
      });
      response.status(HttpStatusCode.BAD_REQUEST);
      response.json({
        message: 'Bad request',
        exceptionName: Error.name,
        errors: error.errors,
      });
    } else if (error instanceof Error) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error),
      });
      response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      response.json({
        message: 'Internal Server Error',
        exceptionName: Error.name,
      });
    }
  }
};
