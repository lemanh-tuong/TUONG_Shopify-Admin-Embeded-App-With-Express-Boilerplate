import { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ExitIframe } from './ExitIframe';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

export const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route
          /** WARNING: Update nếu có sự thay đổi giá trị "exitIframePath" tại file khởi tạo shopify app express */
          path="/exitiframe"
          element={<ExitIframe />}
        />
        <Route path="*" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
};
