/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

interface UpdateTodo {
  id: AppModels.Todo['id'];
  data: Omit<AppModels.Todo, 'id'>;
}

export const updateTodo = ({ id, data }: UpdateTodo) => {
  return new Promise<AppModels.Todo>(resolve => {
    setTimeout(() => {
      resolve({
        ...data,
        id,
      });
    }, 1000);
  });
};
