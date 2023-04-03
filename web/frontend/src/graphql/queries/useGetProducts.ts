import { gql, useLazyQuery } from '@apollo/client';
import { handleGraphqlError } from 'providers/ReactApolloProvider';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment mô tả các biến cần truyền nếu có thể 
    3. Chỉ export type của Response (Type Output), Variables (Type Input) và function chính (Main Function)
    4. Link tài liệu nếu có 
    5. Testing nếu có thể
 */

const GET_PRODUCTS = gql`
  query getProducts($quantity: Int!, $cursor: String, $query: String) {
    products(first: $quantity, after: $cursor, query: $query) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          handle
          onlineStorePreviewUrl
          variants(first: 40) {
            edges {
              node {
                price
                compareAtPrice
              }
            }
          }
          featuredImage {
            height
            width
            originalSrc
          }
          priceRangeV2 {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`;

interface ProductsVars {
  quantity: number;
  cursor?: string;
  query?: string;
}

interface VariantsEdges {
  node: {
    price: string;
    compareAtPrice: string;
  };
}

interface ProductsNode {
  cursor: string;
  node: {
    createdAt: string;
    description: string;
    title: string;
    id: string;
    handle: string;
    onlineStorePreviewUrl: string;
    variants: {
      edges: VariantsEdges[];
    };
    featuredImage: {
      originalSrc: string;
      width: number;
      height: number;
    };
    priceRangeV2: {
      minVariantPrice: {
        amount: string;
      };
      maxVariantPrice: {
        amount: string;
      };
    };
  };
}

export interface ProductsInterface {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
    edges: ProductsNode[];
    __typename: any;
  };
}

export const useGetProducts = () => {
  const [getProducts, { data, loading, error }] = useLazyQuery<ProductsInterface, ProductsVars>(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  });
  const handleGetProducts = ({ quantity, query }: ProductsVars) => {
    return getProducts({ variables: { quantity, query } });
  };
  return {
    getProducts: handleGetProducts,
    data,
    loading,
    error: handleGraphqlError(error),
  };
};
