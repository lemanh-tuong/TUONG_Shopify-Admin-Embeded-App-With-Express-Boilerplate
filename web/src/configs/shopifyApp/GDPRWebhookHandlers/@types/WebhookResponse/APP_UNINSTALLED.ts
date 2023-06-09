/** CONVENTION: Yêu cầu
  1. Kèm link docs
  2. readonly và optional đúng với tài liệu shopify
 */

/** @see https://shopify.dev/docs/api/admin-rest/2023-01/resources/webhook#event-topics */
export interface APP_UNINSTALLED {
  id: number;
  name: string;
  email: string;
  domain: any;
  province: string;
  country: string;
  address1: string;
  zip: string;
  city: string;
  source: any;
  phone: string;
  latitude: any;
  longitude: any;
  primary_locale: string;
  address2: any;
  created_at: any;
  updated_at: any;
  country_code: string;
  country_name: string;
  currency: string;
  customer_email: string;
  timezone: string;
  iana_timezone: any;
  shop_owner: string;
  money_format: string;
  money_with_currency_format: string;
  weight_unit: string;
  province_code: string;
  taxes_included: any;
  auto_configure_tax_inclusivity: any;
  tax_shipping: any;
  county_taxes: any;
  plan_display_name: string;
  plan_name: string;
  has_discounts: boolean;
  has_gift_cards: boolean;
  myshopify_domain: any;
  google_apps_domain: any;
  google_apps_login_enabled: any;
  money_in_emails_format: string;
  money_with_currency_in_emails_format: string;
  eligible_for_payments: boolean;
  requires_extra_payments_agreement: boolean;
  password_enabled: any;
  has_storefront: boolean;
  finances: boolean;
  primary_location_id: number;
  cookie_consent_level: string;
  visitor_tracking_consent_preference: string;
  checkout_api_supported: boolean;
  multi_location_enabled: boolean;
  setup_required: boolean;
  pre_launch_enabled: boolean;
  enabled_presentment_currencies: string[];
  transactional_sms_disabled: boolean;
  marketing_sms_consent_enabled_at_checkout: boolean;
}
