/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface UpdateTodoRequest {
  id: AppModels.Todo['id'];
  data: Omit<AppModels.Todo, 'id'>;
}

export interface UpdateTodoSuccess {
  data: AppModels.Todo;
}

export interface UpdateTodoFailure {
  id: AppModels.Todo['id'];
  message: string;
}
