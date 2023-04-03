import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import { fetchAPI } from 'utils/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { initialization } from '../actions/initialization';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Mô tả + sơ đồ luồng
    3. Handle lỗi cẩn thận - message cần i18n, code error cần định nghĩa enum, ... - mọi thứ ở response trả về để debug + biết đường xử lý in ra cái gì (thiên về kĩ thuật ) không phải thứ để in ra FE
 */

// FIXME: Nên được tách ra folder services để có thể viết tool gen ra
interface ResponseSuccess {
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  email: string;
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  myshopifyDomain: string;
  /** Để sử dụng cho tính năng redirect đến shopify editor - nơi active theme app extension */
  themeId: number | null;
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
}

/** @description Mô tả + sơ đồ luồng */
function* handleInitialization({ payload }: ReturnType<typeof initialization.request>) {
  try {
    // FIXME: Nên được tách ra folder services để có thể viết tool gen ra
    const res: AxiosResponse<ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: `${payload.appBridge.localOrigin}/api/initialization`,
      baseURL: '',
    });

    yield put(
      initialization.success({
        themeId: res.data.themeId,
        appExtensionActived: res.data.appExtensionActived,
        email: res.data.email,
        shopDomain: res.data.myshopifyDomain,
      }),
    );
  } catch (error) {
    console.log('watchInitialization', error);
    yield put(initialization.failure(undefined));
  }
}

export function* watchInitialization() {
  yield takeLatest(getActionType(initialization.request), handleInitialization);
}
