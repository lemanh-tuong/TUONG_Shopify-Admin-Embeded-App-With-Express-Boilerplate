import { HttpStatusCode } from 'consts';
import { SessionAfterVerifyException } from 'exceptions';
import { reportService } from 'services';
import { getSessionAfterVerify } from 'utils';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả rõ tên, tiền điều kiện, hậu điều kiện, các bước thực hiện (nếu cần thiết)
    2. Testing nếu có thể 
 */

type ResponseError = Express.BaseResponseError;

/**
 * @description 
 * Tên usecase: Validate session token
 * Tiền điều kiện: Không có 
 * Hậu điều kiện: 
    - TH1: Trả về thông báo lỗi Authentication
    - TH2: Tiếp tục bước tiếp theo 
 * Các bước thực hiện: ...
*/
export const auth: Express.MutationRequestHandler<ResponseError> | Express.QueryRequestHandler<ResponseError> = async (
  request,
  response,
  next,
) => {
  try {
    getSessionAfterVerify(response);
    next();
  } catch (error) {
    if (error instanceof SessionAfterVerifyException) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify({
          session: error.session,
          body: request.body,
        }),
      });
      response.status(HttpStatusCode.UNAUTHORIZED);
      response.json({
        message: 'Authentication is required',
        exceptionName: SessionAfterVerifyException.name,
      });
    } else if (error instanceof Error) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
      });
      response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      response.json({
        message: 'Authentication is error',
        exceptionName: Error.name,
      });
    }
  }
};
