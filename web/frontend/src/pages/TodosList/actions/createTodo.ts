/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface CreateTodoRequest {
  data: Omit<AppModels.Todo, 'id'>;
}

export interface CreateTodoSuccess {
  data: AppModels.Todo;
}

export interface CreateTodoFailure {
  message: string;
}
