/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

interface DeleteTodo {
  id: AppModels.Todo['id'];
}

export const deleteTodo = (_: DeleteTodo) => {
  return new Promise<boolean>(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
