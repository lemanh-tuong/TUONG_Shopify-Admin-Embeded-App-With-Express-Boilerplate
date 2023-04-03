import { Provider, ProviderProps as AppBridgeProviderProps } from '@shopify/app-bridge-react';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotFoundApiKey } from './components/NotFoundApiKey';
import { NotFoundHost } from './components/NotFoundHost';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

/**
 * SHOPIFY_APP_TEMPLATE_NODE:
 * A component to configure App Bridge.
 * @desc A thin wrapper around AppBridgeProvider that provides the following capabilities:
 *
 * 1. Ensures that navigating inside the app updates the host URL.
 * 2. Configures the App Bridge Provider, which unlocks functionality provided by the host.
 *
 * See: https://shopify.dev/apps/tools/app-bridge/react-components
 */
export const AppBridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const history = useMemo(
    () => ({
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate],
  );

  const routerConfig: AppBridgeProviderProps['router'] = useMemo(() => ({ history, location }), [history, location]);

  // SHOPIFY_APP_TEMPLATE_NODE:
  // The host may be present initially, but later removed by navigation.
  // By caching this in state, we ensure that the host is never lost.
  // During the lifecycle of an app, these values should never be updated anyway.
  // Using state in this way is preferable to useMemo.
  // See: https://stackoverflow.com/questions/60482318/version-of-usememo-for-caching-a-value-that-will-never-change
  const [{ apiKey, forceRedirect, host }] = useState(() => {
    const host = new URLSearchParams(location.search).get('host') || window.hostFromUrlSearchParams;

    window.hostFromUrlSearchParams = host;

    return {
      host,
      apiKey: process.env.SHOPIFY_API_KEY,
      forceRedirect: true,
    };
  });

  if (!apiKey) {
    return <NotFoundApiKey />;
  }

  if (!host) {
    return <NotFoundHost />;
  }

  return (
    <Provider config={{ apiKey, forceRedirect, host }} router={routerConfig}>
      {children}
    </Provider>
  );
};
