import { LATEST_API_VERSION } from '@shopify/shopify-api';

/** CONVENTION: Yêu cầu
 1. Comment mô tả tác dụng của các biến môi trường được định nghĩa 
 2. Sử dụng các tag WARNING:, DANGER: cho những thứ cần lưu ý 
 */

/** DANGER: Những thứ liên quan đến shopify và các service hosting ===> không nên update */
/** @description Shopify API Version */
export const apiVersion = process.env.API_VERSION ?? LATEST_API_VERSION;

/** @description Shopify API Key */
export const shopifyApiKey = process.env.SHOPIFY_API_KEY;

/** @description Shopify API Secret */
export const shopifyApiSecret = process.env.SHOPIFY_API_SECRET;

/**
 * App scopes
 * @see https://shopify.dev/docs/api/usage/access-scopes
 */
export const scopes =
  process.env.SCOPES ||
  'read_orders,write_orders,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_checkouts,write_checkouts,read_content,write_content,read_customer_merge,write_customer_merge,read_customers,write_customers,read_discounts,write_discounts,read_draft_orders,write_draft_orders,read_files,write_files,read_fulfillments,write_fulfillments,read_gift_cards,write_gift_cards,read_inventory,write_inventory,read_legal_policies,read_locales,write_locales,read_locations,read_metaobject_definitions,write_metaobject_definitions,read_metaobjects,write_metaobjects,read_marketing_events,write_marketing_events,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_orders,write_orders,read_payment_terms,write_payment_terms,read_price_rules,write_price_rules,read_products,write_products,read_product_listings,read_publications,write_publications,read_purchase_options,write_purchase_options,read_reports,write_reports,read_resource_feedbacks,write_resource_feedbacks,read_script_tags,write_script_tags,read_shipping,write_shipping,read_shopify_payments_disputes,read_shopify_payments_payouts,read_returns,write_returns,read_themes,write_themes,read_translations,write_translations,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,read_order_edits,write_order_edits';

/** @description Base url các apis sẽ được định nghĩa */
export const baseUrlForApis = '/api';
/**
 * @description Url sẽ lắng nghe webhook shopify bắn về
 * WARNING: Lưu ý khi thay đổi giá trị biến này. Shopify không hề tự động update giá trị trường "callbackUrl" -> Shopify sẽ liên tục báo về webhook process not return 200 -> Nếu lỗi này xảy quá nhiêu Shopify sẽ tự động xoá webhook đó đi ====> Khi đó phải viết và chạy 1 cron để update "callbackUrl" bằng "offlineToken" trong database và "Shopify Graphql API" hoặc "Shopify REST API"
 */
export const webhookUrl = `${baseUrlForApis}/webhooks`;
/** @description Url lắng nghe luồng auth của shopify bắn về */
export const authUrl = `${baseUrlForApis}/auth`;
/** @description Url lắng nghe luồng auth của shopify bắn về */
export const authCallbackUrl = `${baseUrlForApis}/auth/callback`;
/** @description Graphql cho client */
export const graphqlUrl = `${baseUrlForApis}/graphql`;
/** <------------------------------------------------------------------------------------------> */
