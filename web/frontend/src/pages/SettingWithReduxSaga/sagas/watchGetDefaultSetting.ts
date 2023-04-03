import { appBridgeSelector } from 'pages/Initialization';
import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { internalServices } from 'services/InternalServices';
import { getActionType } from 'wiloke-react-core/utils';
import { getDefaultSetting } from '../actions';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Mô tả + sơ đồ luồng
    3. Handle lỗi cẩn thận - message cần i18n, code error cần định nghĩa enum, ... - mọi thứ ở response trả về để debug + biết đường xử lý in ra cái gì (thiên về kĩ thuật ) không phải thứ để in ra FE
 */

/** @description Mô tả + sơ đồ luồng */
function* handleGetDefaultSetting() {
  const appBridge: SagaReturnType<typeof appBridgeSelector> = yield select(appBridgeSelector);
  try {
    const setting: SagaReturnType<typeof internalServices.setting.getSetting> = yield retry(
      3,
      1000,
      internalServices.setting.getSetting,
      { appBridge },
    );
    yield put(getDefaultSetting.success({ setting }));
  } catch (error) {
    console.log('watchGetDefaultSetting', error);
    yield put(getDefaultSetting.failure(undefined));
  }
}

export function* watchGetDefaultSetting() {
  yield takeLatest(getActionType(getDefaultSetting.request), handleGetDefaultSetting);
}
