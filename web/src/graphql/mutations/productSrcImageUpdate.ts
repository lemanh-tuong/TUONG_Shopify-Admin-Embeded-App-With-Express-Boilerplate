import { ShopifyGraphqlException } from 'exceptions';
import { BaseParams } from 'graphql/@types/Session';
import { createClient } from 'graphql/utils/createClient';
import { gql, Variables } from 'graphql-request';
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

interface ProductSrcImageUpdateVariables extends Variables {
  /** @description Mô tả nếu cần */
  productId: string;
  /** @description Mô tả nếu cần */
  image: {
    id: string;
    src: string;
  };
}

export interface ProductSrcImageResponse {
  productImageUpdate: {
    image: {
      id: string;
      originalSrc: string;
    };
    userErrors: Array<{
      field: string;
      message: string;
    }>;
  };
}

const PRODUCT_SRC_IMAGE_UPDATE = gql`
  mutation productImageUpdate($productId: ID!, $image: ImageInput!) {
    productImageUpdate(productId: $productId, image: $image) {
      image {
        id
        originalSrc
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface ProductSrcImageUpdate extends BaseParams {
  variables: ProductSrcImageUpdateVariables;
}

/** @description Tác dụng + docs nếu cần thiết */
export const productSrcImageUpdate = async ({ session, variables }: ProductSrcImageUpdate) => {
  try {
    const client = createClient(session);
    const res = await client.request<ProductSrcImageResponse, ProductSrcImageUpdateVariables>(
      PRODUCT_SRC_IMAGE_UPDATE,
      variables,
    );
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
