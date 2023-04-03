import { createReducer, handleAction } from 'wiloke-react-core/utils';
import { Actions, State } from '../@types';

/**
 * CONVENTION:
    - Mô tả nếu cần 
 */

const defaultState: State = {
  statusInitialization: 'idle',
  appBridge: null,
  shopDomain: null,
  email: null,
  themeId: null,
  appExtensionActived: null,
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@Initialization/initializationRequest', ({ state, action }) => {
    const { appBridge } = action.payload;
    return {
      ...state,
      statusInitialization: 'loading',
      appBridge,
    };
  }),
  handleAction('@Initialization/initializationSucess', ({ state, action }) => {
    const { themeId, appExtensionActived, email, shopDomain } = action.payload;
    return {
      ...state,
      statusInitialization: 'success',
      shopDomain,
      email,
      appExtensionActived,
      themeId,
    };
  }),
  handleAction('@Initialization/initializationFailure', ({ state }) => {
    return {
      ...state,
      statusInitialization: 'failure',
    };
  }),
]);
