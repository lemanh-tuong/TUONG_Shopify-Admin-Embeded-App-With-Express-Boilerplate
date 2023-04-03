import { AppBridgeState, ClientApplication } from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Polyfill, browser security
 */

/** @description Check xem request headers lỗi đó có phải do Authentication hay không. Nếu có thì thực hiện redirect để refresh */
export const checkHeadersForReauthorization = (headers: Headers, app: ClientApplication<AppBridgeState>) => {
  if (headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
    const authUrlHeader = headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') || `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith('/') ? `https://${window.location.host}${authUrlHeader}` : authUrlHeader,
    );
  }
};
