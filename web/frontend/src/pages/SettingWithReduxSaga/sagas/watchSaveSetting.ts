import { appBridgeSelector } from 'pages/Initialization';
import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { internalServices } from 'services/InternalServices';
import { getActionType } from 'wiloke-react-core/utils';
import { saveSetting } from '../actions';
import { settingSelector } from '../selectors';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Mô tả + sơ đồ luồng
    3. Handle lỗi cẩn thận - message cần i18n, code error cần định nghĩa enum, ... - mọi thứ ở response trả về để debug + biết đường xử lý in ra cái gì (thiên về kĩ thuật ) không phải thứ để in ra FE
 */

/** @description Mô tả + sơ đồ luồng */
function* handleSaveSetting({ payload }: ReturnType<typeof saveSetting.request>) {
  const appBridge: SagaReturnType<typeof appBridgeSelector> = yield select(appBridgeSelector);
  const { setting }: SagaReturnType<typeof settingSelector> = yield select(settingSelector);
  try {
    if (setting) {
      const settingResponse: SagaReturnType<typeof internalServices.setting.saveSetting> = yield retry(
        3,
        1000,
        internalServices.setting.saveSetting,
        { setting, appBridge },
      );
      yield put(saveSetting.success({ setting: settingResponse }));
    } else {
      yield put(saveSetting.failure(undefined));
      // FIXME: Xử lý lỗi để đưa ra message
      payload.onFailure('Có gì đó sai sai');
    }
  } catch (err) {
    // FIXME: Xử lý lỗi để đưa ra message
    payload.onFailure('Có gì đó sai sai 2');
    yield put(saveSetting.failure(undefined));
  }
}

export function* watchSaveSetting() {
  yield takeLatest(getActionType(saveSetting.request), handleSaveSetting);
}
