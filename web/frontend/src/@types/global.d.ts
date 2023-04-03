import { compose } from '@reduxjs/toolkit';
import { useAppBridge } from '@shopify/app-bridge-react';
import { store } from 'store/configureStore';

/**
 * CONVENTION:
  1. Comment rõ ràng mọi thứ 
 */

/** @description Type global cho toàn app */
declare global {
  /** @description Mô tả  */
  type Status = 'idle' | 'loading' | 'success' | 'failure';
  /** @description Redux state  */
  type AppState = ReturnType<typeof store.getState>;
  /** @description Redux dispatch  */
  type AppDispatch = typeof store.dispatch;
  /** @description Shopify app bridge  */
  type AppBridge = ReturnType<typeof useAppBridge>;
  interface Window {
    /** @description Redux dev tool */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    /** @description giá trị shop trên url search params */
    shopNameFromUrlSearchParams: string | null;
    hostFromUrlSearchParams: string | null;
  }
}
export {};
