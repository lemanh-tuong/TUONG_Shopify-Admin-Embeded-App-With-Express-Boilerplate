import { apiVersion, appName } from 'configs';
import { HttpStatusCode } from 'consts';
import { ShopifyRestException } from 'exceptions';
import { createMetafield } from 'rest';
import { reportService } from 'services';
import { getSessionAfterVerify } from 'utils';
import { ExpectBodyData } from '../@types';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả rõ tên, tiền điều kiện, hậu điều kiện, các bước thực hiện (nếu cần thiết)
    2. Testing nếu có thể 
 */

type ResponseError = Express.BaseResponseError;

interface ResponseSuccess {
  data: AppModels.Setting;
}

/**
 * Tên usecase: Lưu dữ liệu vào "metafield" shopify
 * Tiền điều kiện: Dữ liệu đầu vào và Authentication đã được xử lý
 * Hậu điều kiện: 
    - TH1: Trả về thông báo lưu thành công 
    - TH2: Trả về thông báo lưu thất bại
 * Các bước thực hiện: ...
 */
export const save: Express.MutationRequestHandler<ResponseSuccess | ResponseError, ExpectBodyData> = async (
  request,
  response,
) => {
  try {
    const session = getSessionAfterVerify(response);
    const { setting } = request.body;
    const data = await createMetafield({
      session: {
        accessToken: session.accessToken,
        apiVersion: apiVersion,
        shopDomain: session.shop,
      },
      data: {
        key: 'setting',
        namespace: appName,
        type: 'json',
        value: JSON.stringify(setting),
      },
    });
    response.json({
      data: JSON.parse(data.value) as AppModels.Setting,
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
