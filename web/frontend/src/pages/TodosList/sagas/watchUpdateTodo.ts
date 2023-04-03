import { takeLatest, retry, put, SagaReturnType } from 'redux-saga/effects';
import { anotherServices } from 'services/AnotherServices';
import { todosActions } from '../todoSlice';

/**
 * CONVENTION:
    1. Comment rõ các properties: tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Mô tả + sơ đồ luồng
    3. Handle lỗi cẩn thận - message cần i18n, code error cần định nghĩa enum, ... - mọi thứ ở response trả về để debug + biết đường xử lý in ra cái gì (thiên về kĩ thuật ) không phải thứ để in ra FE
 */

function* handleUpdateTodo({ payload }: ReturnType<typeof todosActions.updateTodoRequest>) {
  try {
    const response: SagaReturnType<typeof anotherServices.todos.updateTodo> = yield retry(
      3,
      1000,
      anotherServices.todos.updateTodo,
      { id: payload.id, data: payload.data },
    );
    yield put(todosActions.updateTodoSuccess({ data: response }));
  } catch (error) {
    console.log(error);
    // FIXME: Xử lý lỗi để đưa ra message
    yield put(todosActions.updateTodoFailure({ id: payload.id, message: 'Có gì đó sai sai' }));
  }
}

export function* watchUpdateTodo() {
  yield takeLatest(todosActions.updateTodoRequest, handleUpdateTodo);
}
