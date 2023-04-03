import axios from 'axios';
import { ShopifyRestException } from 'exceptions';
import { BaseParams } from 'rest/@types/Session';
import { reportService } from 'services/ReportService';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment mô tả các biến cần truyền nếu có thể 
    3. Chỉ export type của Response (Type Output), Variables (Type Input) và function chính (Main Function)
    4. Try catch để report lỗi request + custom error code
    5. Link tài liệu nếu có 
    6. Testing nếu có thể
 */

interface ResponseSuccess {
  metafield: ShopifyModels.MetaField;
}

export interface CreateMetafield extends BaseParams {
  /** @description Mô tả nếu cần */
  data: Pick<ShopifyModels.MetaField, 'namespace' | 'key' | 'value' | 'type'>;
}

/** @description Tác dụng + docs nếu cần thiết */
export const createMetafield = async ({ session, data }: CreateMetafield) => {
  const { accessToken, apiVersion, shopDomain } = session;
  try {
    const response = await axios.request<ResponseSuccess>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/metafields.json`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      data: {
        metafield: data,
      },
    });
    return response.data.metafield;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: __filename,
      additionalData: JSON.stringify(session),
    });
    throw new ShopifyRestException(error_);
  }
};
