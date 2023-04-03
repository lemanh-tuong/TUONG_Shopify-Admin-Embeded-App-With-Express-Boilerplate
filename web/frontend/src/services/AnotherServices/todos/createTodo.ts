import { v4 } from 'uuid';

/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

type CreateTodo = Omit<AppModels.Todo, 'id'>;

export const createTodo = (formValues: CreateTodo): Promise<AppModels.Todo> => {
  return new Promise<AppModels.Todo>(resolve => {
    setTimeout(() => {
      resolve({
        ...formValues,
        id: v4(),
      });
    }, 1000);
  });
};
