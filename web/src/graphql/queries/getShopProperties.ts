import { ShopifyGraphqlException } from 'exceptions';
import { BaseParams } from 'graphql/@types/Session';
import { createClient } from 'graphql/utils/createClient';
import { gql } from 'graphql-request';
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

export interface GetShopPropertiesResponse {
  shop: {
    email: string;
    myshopifyDomain: string;
  };
}

const GET_SHOP_PROPERTIES = gql`
  query {
    shop {
      myshopifyDomain
      email
    }
  }
`;

export type GetShopProperties = BaseParams;

/** @description Tác dụng + docs nếu cần thiết */
export const getShopProperties = async ({ session }: GetShopProperties) => {
  try {
    const client = createClient(session);
    const res = await client.request<GetShopPropertiesResponse>(GET_SHOP_PROPERTIES);
    return res;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: __filename,
      additionalData: JSON.stringify(session),
    });
    throw new ShopifyGraphqlException();
  }
};
