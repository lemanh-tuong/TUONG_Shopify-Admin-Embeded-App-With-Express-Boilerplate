import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'store/configureStore';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
