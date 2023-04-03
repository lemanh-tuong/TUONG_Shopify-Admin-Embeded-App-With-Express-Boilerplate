/** CONVENTION: Yêu cầu
  1. Kèm link docs
  2. readonly và optional đúng với tài liệu shopify
 */

export interface BULK_OPERATIONS_FINISH {
  admin_graphql_api_id: string;
  completed_at: string;
  created_at: string;
  error_code: any;
  status: string;
  type: string;
}
