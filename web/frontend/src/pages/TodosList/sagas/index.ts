import { watchCreateTodo } from './watchCreateTodo';
import { watchDeleteTodo } from './watchDeleteTodo';
import { watchGetTodos } from './watchGetTodos';
import { watchLoadmoreTodos } from './watchLoadmoreTodos';
import { watchUpdateTodo } from './watchUpdateTodo';

export const sagasTodo = [watchCreateTodo, watchDeleteTodo, watchGetTodos, watchLoadmoreTodos, watchUpdateTodo];
