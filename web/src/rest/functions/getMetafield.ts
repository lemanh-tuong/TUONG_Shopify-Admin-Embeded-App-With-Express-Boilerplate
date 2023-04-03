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

interface ShopifyGetMetaFields {
  metafields: ShopifyModels.MetaField[] | null;
}
export interface GetMetafield extends BaseParams {
  /** @description Mô tả nếu cần */
  data: {
    namespace: string;
    key: string;
    type: string;
  };
}
/** @description Tác dụng + docs nếu cần thiết */
export const getMetafield = async ({ data, session }: GetMetafield) => {
  const { accessToken, apiVersion, shopDomain } = session;
  try {
    const res = await axios.request<ShopifyGetMetaFields>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/metafields.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      params: data,
    });
    return res.data.metafields?.find(metafield => metafield.namespace === data.namespace && metafield.key === data.key);
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
