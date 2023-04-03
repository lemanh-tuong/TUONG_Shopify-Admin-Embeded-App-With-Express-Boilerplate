import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from 'react-query';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

/** @desc See: https://react-query.tanstack.com/reference/QueryClientProvider#_top */
export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
