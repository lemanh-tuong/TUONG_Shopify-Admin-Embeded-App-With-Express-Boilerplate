import { useMutation, gql } from '@apollo/client';
import { handleGraphqlError } from 'providers/ReactApolloProvider';

/**
 * CONVENTION: Yêu cầu
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment mô tả các biến cần truyền nếu có thể 
    3. Chỉ export type của Response (Type Output), Variables (Type Input) và function chính (Main Function)
    4. Link tài liệu nếu có 
    5. Testing nếu có thể
 */

interface BulkOperation {
  id: string;
  status: string;
  completedAt: any;
  objectCount: string;
  rootObjectCount: string;
  query: string;
  partialDataUrl: any;
  fileSize: any;
  errorCode: any;
  createdAt: string;
  type: string;
  url: any;
  __typename: string;
}

interface Result {
  bulkOperation: BulkOperation;
  userErrors: any[];
  __typename: string;
}

const BULK = gql`
  mutation {
    bulkOperationRunQuery(
      query: """
      {
        products(query: "id:6955832344771") {
          edges {
            node {
              id
              createdAt
              updatedAt
              title
              handle
              descriptionHtml
              productType
              options {
                name
                position
                values
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      """
    ) {
      bulkOperation {
        id
        status
        completedAt
        objectCount
        rootObjectCount
        query
        partialDataUrl
        fileSize
        errorCode
        createdAt
        type
        url
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const useBulk = () => {
  const [postBulk, { data, loading, error }] = useMutation<Result, {}>(BULK);
  return {
    data,
    loading,
    error: handleGraphqlError(error),
    postBulk,
  };
};
