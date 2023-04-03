import { useAppBridge } from '@shopify/app-bridge-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInitialization } from './actions/initialization';
import { InitializationFailure } from './components/InitializationFailure';
import { InitializationLoading } from './components/InitializationLoading';
import { NotFoundTheme } from './components/NotFoundTheme';
import { initializationSelector } from './selectors';

/**
 * CONVENTION: Yêu cầu
    1. Mô tả nếu cần 
 */

/** @description Mô tả nếu cần */
export const Initialization = () => {
  const { statusInitialization, shopDomain, themeId } = useSelector(initializationSelector);

  const app = useAppBridge();
  const init = useInitialization();

  useEffect(() => {
    init.request({ appBridge: app });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);

  if (statusInitialization === 'success' && shopDomain && !themeId) {
    return <NotFoundTheme />;
  }

  if (statusInitialization === 'failure') {
    return <InitializationFailure />;
  }

  return <InitializationLoading />;
};
