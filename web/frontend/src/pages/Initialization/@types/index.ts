import { ActionTypes } from 'wiloke-react-core/utils';
import { initialization } from '../actions/initialization';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */
export interface State {
  /** @description Trạng thái action đang thực hiện */
  statusInitialization: Status;
  /** @description App bridge của shopify */
  appBridge: AppBridge | null;
  /** @description Domain của shop */
  shopDomain: string | null;
  /** @description Email của shop */
  email: string | null;
  /** @description "ID" của theme đang được active */
  themeId: number | null;
  /** @description Trạng thái "App embed extension" đã được active hay chưa  */
  appExtensionActived: boolean | null;
}

export type Actions = ActionTypes<typeof initialization>;
