/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

const data: AppModels.Todo[] = [
  { id: '1', title: 'Todo 1', description: 'Todo 1' },
  { id: '2', title: 'Todo 2', description: 'Todo 2' },
  { id: '3', title: 'Todo 3', description: 'Todo 3' },
  { id: '4', title: 'Todo 4', description: 'Todo 4' },
  { id: '5', title: 'Todo 5', description: 'Todo 5' },
  { id: '6', title: 'Todo 6', description: 'Todo 6' },
];

export const getTodos = () => {
  return new Promise<AppModels.Todo[]>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
