/**
 * CONVENTION:
    - link docs
    - tác dụng
    - định nghĩa và comment rõ ràng đầu vào đầu ra
    - ...
 */

const data: AppModels.Todo[] = [
  { id: '100', title: 'Todo 100', description: 'Todo 100' },
  { id: '101', title: 'Todo 101', description: 'Todo 101' },
  { id: '102', title: 'Todo 102', description: 'Todo 102' },
  { id: '103', title: 'Todo 103', description: 'Todo 103' },
  { id: '104', title: 'Todo 104', description: 'Todo 104' },
  { id: '105', title: 'Todo 105', description: 'Todo 105' },
];

export const loadmoreTodos = () => {
  return new Promise<AppModels.Todo[]>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};
