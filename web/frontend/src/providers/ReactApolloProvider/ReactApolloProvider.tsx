import { ApolloClient, ApolloProvider, createHttpLink, HttpOptions, InMemoryCache } from '@apollo/client';
import { AppBridgeState, ClientApplication } from '@shopify/app-bridge';
import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { IS_DEV_MODE } from 'configs/env';
import { initializationSelector } from 'pages/Initialization';
import { FC, PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { checkHeadersForReauthorization } from 'utils/checkHeadersForReauthorization';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

const userLoggedInFetch = (app: ClientApplication<AppBridgeState>): HttpOptions['fetch'] => {
  const fetchFunction = authenticatedFetch(app);

  return async (uri: Parameters<typeof fetchFunction>[0], options: Parameters<typeof fetchFunction>[1]) => {
    const response = await fetchFunction(uri, options);
    checkHeadersForReauthorization(response.headers, app);
    return response;
  };
};

export const ReactApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useAppBridge();
  const { shopDomain } = useSelector(initializationSelector);

  const requestHeaders = useMemo<Record<string, string>>(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (shopDomain) {
      headers['X-ShopName'] = shopDomain;
    }
    return headers;
  }, [shopDomain]);

  const client = new ApolloClient({
    connectToDevTools: IS_DEV_MODE,
    cache: new InMemoryCache(),
    link: createHttpLink({
      includeExtensions: true,
      includeUnusedVariables: true,
      credentials: 'include',
      headers: requestHeaders,
      uri: '/api/graphql', // WARNING: Update nếu có sự thay đổi giá trị biến "graphqlUrl" tại file config env liên quan đến shopify
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
