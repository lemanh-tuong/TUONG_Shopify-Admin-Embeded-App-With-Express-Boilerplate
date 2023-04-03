import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { State } from '../@types';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

/** @description Mô tả nếu cần */
export const initialization = createAsyncAction([
  '@Initialization/initializationRequest',
  '@Initialization/initializationSucess',
  '@Initialization/initializationFailure',
])<
  { appBridge: AppBridge },
  Pick<Required<State>, 'appExtensionActived' | 'email' | 'shopDomain' | 'themeId'>,
  undefined
>();

export const useInitialization = createDispatchAsyncAction(initialization);
