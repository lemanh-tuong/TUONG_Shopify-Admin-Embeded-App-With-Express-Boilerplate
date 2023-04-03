/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface DeleteTodoRequest {
  id: AppModels.Todo['id'];
}

export interface DeleteTodoSuccess {
  id: AppModels.Todo['id'];
}

export interface DeleteTodoFailure {
  id: AppModels.Todo['id'];
  message: string;
}
