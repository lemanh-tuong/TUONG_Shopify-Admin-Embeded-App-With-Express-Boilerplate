# Folder chứa các step nhỏ nằm trong flow của các usecase lớn được sử dụng nhiều nơi chứ không phải 1 nơi riêng biệt

## Yêu cầu
  - Comment CONVENTION: của files
  
  - Tuân thủ CONVENTION: của files

  - Mô tả rõ tên, tiền điều kiện, hậu điều kiện, các bước thực hiện (nếu cần thiết)

  - Ví dụ:
    ```typscript
    import { HttpStatusCode } from 'consts';
    import { SessionAfterVerifyException } from 'exceptions';
    import { reportService } from 'services';
    import { getSessionAfterVerify } from 'utils';

    export type ResponseError = Express.BaseResponseError;

    /**
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
        }
      }
    };
    ```
