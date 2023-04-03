/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface GetTodosRequest {
  s?: string;
}

export interface GetTodosSuccess {
  data: AppModels.Todo[];
}

export interface GetTodosFailure {
  message: string;
}
