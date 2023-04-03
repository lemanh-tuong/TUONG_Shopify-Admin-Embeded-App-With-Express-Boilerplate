import { useLazyQuery, gql } from '@apollo/client';
import { handleGraphqlError } from 'providers/ReactApolloProvider';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment mô tả các biến cần truyền nếu có thể 
    3. Chỉ export type của Response (Type Output), Variables (Type Input) và function chính (Main Function)
    4. Link tài liệu nếu có 
    5. Testing nếu có thể
 */

interface Result {
  shop: {
    myshopifyDomain: string;
    email: string;
  };
}

const GET_SHOP_NAME = gql`
  query getShopName {
    shop {
      myshopifyDomain
      email
    }
  }
`;

export const useGetShop = () => {
  const [getShop, { data, loading, error, refetch }] = useLazyQuery<Result, {}>(GET_SHOP_NAME);
  return {
    data,
    loading,
    error: handleGraphqlError(error),
    getShop,
    refetch,
  };
};
