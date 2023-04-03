import { createReducer, handleAction } from 'wiloke-react-core/utils';
import { Actions, State } from '../@types';

/**
 * CONVENTION:
    - Mô tả nếu cần 
 */

const defaultState: State = {
  statusRequest: 'idle',
  statusSave: 'idle',
  setting: null,
  modalSaveCompleteVisible: false,
  modalRatingVisible: false,
};

export const reducerSetting = createReducer<State, Actions>(defaultState, [
  handleAction('@Setting/getDefaultSettingRequest', ({ state }) => {
    return { ...state, statusRequest: 'loading' };
  }),
  handleAction('@Setting/getDefaultSettingSuccess', ({ state, action }) => {
    const { setting } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      setting,
    };
  }),
  handleAction('@Setting/getDefaultSettingFailure', ({ state }) => {
    return {
      ...state,
      statusRequest: 'failure',
    };
  }),
  handleAction('@Setting/saveSettingRequest', ({ state }) => {
    return {
      ...state,
      statusSave: 'loading',
    };
  }),
  handleAction('@Setting/saveSettingSuccess', ({ state }) => {
    return {
      ...state,
      statusSave: 'success',
    };
  }),
  handleAction('@Setting/saveSettingFailure', ({ state }) => {
    return {
      ...state,
      statusSave: 'failure',
    };
  }),
  handleAction('@Setting/changeSetting', ({ state, action }) => {
    if (state.setting) {
      const { data } = action.payload;
      return {
        ...state,
        setting: {
          ...state.setting,
          ...data,
        },
      };
    }
    return state;
  }),
]);
