import { ActionTypes } from 'wiloke-react-core/utils';
import { changeSetting, getDefaultSetting, saveSetting } from '../actions';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface State {
  /** @description Mô tả nếu cần */
  statusRequest: Status;
  /** @description Mô tả nếu cần */
  statusSave: Status;
  /** @description Mô tả nếu cần */
  setting: AppModels.Setting | null;
  /** @description Mô tả nếu cần */
  modalSaveCompleteVisible: boolean;
  /** @description Mô tả nếu cần */
  modalRatingVisible: boolean;
}

export type Actions = ActionTypes<typeof getDefaultSetting | typeof saveSetting | typeof changeSetting>;
