import { apiVersion, appName } from 'configs';
import { HttpStatusCode } from 'consts';
import { ShopifyRestException } from 'exceptions';
import { getMetafield } from 'rest';
import { reportService } from 'services/ReportService';
import { getSessionAfterVerify } from 'utils';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả rõ tên, tiền điều kiện, hậu điều kiện, các bước thực hiện (nếu cần thiết)
    2. Testing nếu có thể 
 */

type ResponseError = Express.BaseResponseError;

interface ResponseSuccess {
  data: AppModels.Setting | null;
}

/**
 * Tên usecase: Lấy dứ liệu từ "metafield" shopify
 * Tiền điều kiện: Authentication đã được xử lý
 * Hậu điều kiện: 
    - TH1: Trả về dữ liệu 
    - TH2: Trả về thông báo có lỗi
 * Các bước thực hiện: ...
 */
export const getData: Express.QueryRequestHandler<ResponseSuccess | ResponseError> = async (_, response) => {
  // response.status(HttpStatusCode.FORBIDDEN);
  // response.setHeader('X-Shopify-API-Request-Failure-Reauthorize', '1');
  // response.setHeader('X-Shopify-API-Request-Failure-Reauthorize-Url', ShopifyApp.config.auth.path);
  // response.json({ message: 'TEST', exceptionName: 'Error' });
  try {
    const session = getSessionAfterVerify(response);
    const data = await getMetafield({
      session: {
        accessToken: session.accessToken,
        apiVersion: apiVersion,
        shopDomain: session.shop,
      },
      data: {
        key: 'setting',
        namespace: appName,
        type: 'json',
      },
    });
    response.json({
      data: data ? (JSON.parse(data?.value) as AppModels.Setting) : null,
    });
  } catch (error) {
    if (error instanceof ShopifyRestException) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error.shopifyResponse),
      });
      if (error.isAuthenticationError) {
        response.status(HttpStatusCode.UNAUTHORIZED);
        response.json({
          message: 'Authentication is required',
          exceptionName: ShopifyRestException.name,
        });
      } else {
        response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
        response.json({
          message: 'Internal Server Error',
          exceptionName: ShopifyRestException.name,
        });
      }
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
