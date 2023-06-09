import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { checkHeadersForReauthorization } from 'utils/checkHeadersForReauthorization';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

/**
 * SHOPIFY_APP_TEMPLATE_NODE:
 * A hook that returns an auth-aware fetch function.
 * @desc The returned fetch function that matches the browser's fetch API
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * It will provide the following functionality:
 *
 * 1. Add a `X-Shopify-Access-Token` header to the request.
 * 2. Check response for `X-Shopify-API-Request-Failure-Reauthorize` header.
 * 3. Redirect the user to the reauthorization URL if the header is present.
 *
 * @returns {Function} fetch function
 */
type RTUseAuthenticatedFetch = (uri: RequestInfo, options: RequestInit | undefined) => Promise<Response | null>;
export const useAuthenticatedFetch = (): RTUseAuthenticatedFetch => {
  const app = useAppBridge();
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);
    checkHeadersForReauthorization(response.headers, app);
    return response;
  };
};
