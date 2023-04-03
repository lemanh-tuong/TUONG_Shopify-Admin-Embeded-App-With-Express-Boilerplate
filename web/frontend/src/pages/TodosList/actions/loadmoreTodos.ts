/**
 * CONVENTION: Yêu cầu 
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
 */

export interface LoadmoreTodosRequest {
  s?: string;
  page: number;
}

export interface LoadmoreTodosSuccess {
  data: AppModels.Todo[];
}

export interface LoadmoreTodosFailure {
  message: string;
}
