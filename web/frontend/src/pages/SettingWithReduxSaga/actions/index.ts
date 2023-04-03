import {
  createAction,
  createAsyncAction,
  createDispatchAction,
  createDispatchAsyncAction,
} from 'wiloke-react-core/utils';

/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

interface ChangeSetting {
  data: Partial<AppModels.Setting>;
}
/** @description Mô tả và tách file nếu cần */
export const changeSetting = createAction('@Setting/changeSetting', (payload: ChangeSetting) => ({
  ...payload,
}));

/** @description Mô tả và tách file nếu cần */
export const getDefaultSetting = createAsyncAction([
  '@Setting/getDefaultSettingRequest',
  '@Setting/getDefaultSettingSuccess',
  '@Setting/getDefaultSettingFailure',
])<undefined, { setting: AppModels.Setting }, undefined>();

/** @description Mô tả và tách file nếu cần */
export const saveSetting = createAsyncAction([
  '@Setting/saveSettingRequest',
  '@Setting/saveSettingSuccess',
  '@Setting/saveSettingFailure',
])<{ onFailure: (message: string) => void }, { setting: AppModels.Setting }, undefined>();

export const useGetDefaultSetting = createDispatchAsyncAction(getDefaultSetting);
export const useSaveSetting = createDispatchAsyncAction(saveSetting);
export const useChangeSetting = createDispatchAction(changeSetting);
