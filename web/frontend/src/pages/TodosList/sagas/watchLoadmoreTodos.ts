import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { anotherServices } from 'services/AnotherServices';
import { todosActions } from '../todoSlice';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Mô tả + sơ đồ luồng
    3. Handle lỗi cẩn thận - message cần i18n, code error cần định nghĩa enum, ... - mọi thứ ở response trả về để debug + biết đường xử lý in ra cái gì (thiên về kĩ thuật ) không phải thứ để in ra FE
 */

function* handleLoadmoreTodos(_: ReturnType<typeof todosActions.loadmoreTodosRequest>) {
  try {
    const response: SagaReturnType<typeof anotherServices.todos.loadmoreTodos> = yield retry(
      3,
      1000,
      anotherServices.todos.loadmoreTodos,
    );
    yield put(todosActions.loadmoreTodosSuccess({ data: response }));
  } catch (error) {
    console.log('watchLoadmoreTodos', error);
    // FIXME: Xử lý lỗi để đưa ra message
    yield put(todosActions.loadmoreTodosFailure({ message: 'Có gì đó sai sai' }));
  }
}

export function* watchLoadmoreTodos() {
  yield takeLatest(todosActions.loadmoreTodosRequest, handleLoadmoreTodos);
}
