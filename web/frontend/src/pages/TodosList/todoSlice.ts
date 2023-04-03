import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateTodoRequest, CreateTodoSuccess, CreateTodoFailure } from './actions/createTodo';
import { DeleteTodoRequest, DeleteTodoSuccess, DeleteTodoFailure } from './actions/deleteTodo';
import { GetTodosRequest, GetTodosSuccess, GetTodosFailure } from './actions/getTodos';
import { LoadmoreTodosRequest, LoadmoreTodosSuccess, LoadmoreTodosFailure } from './actions/loadmoreTodos';
import { UpdateTodoRequest, UpdateTodoSuccess, UpdateTodoFailure } from './actions/updateTodo';

interface State {
  statusRequest: string;
  statusLoadmore: string;
  statusCreating: string;
  queueUpdating: string[];
  queueDeleting: string[];
  todos: AppModels.Todo[];
}

const initialState: State = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  statusCreating: 'idle',
  queueUpdating: [],
  queueDeleting: [],
  todos: [],
};

const todosSlice = createSlice({
  name: '@Todos',
  initialState,
  reducers: {
    getTodosRequest: (state, _action: PayloadAction<GetTodosRequest>) => {
      return {
        ...state,
        statusRequest: 'loading',
      };
    },
    getTodosSuccess: (state, action: PayloadAction<GetTodosSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusRequest: 'success',
        todos: data,
      };
    },
    getTodosFailure: (state, _action: PayloadAction<GetTodosFailure>) => {
      return {
        ...state,
        statusRequest: 'failure',
      };
    },
    loadmoreTodosRequest: (state, _action: PayloadAction<LoadmoreTodosRequest>) => {
      return {
        ...state,
        statusLoadmore: 'loading',
      };
    },
    loadmoreTodosSuccess: (state, action: PayloadAction<LoadmoreTodosSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusLoadmore: 'success',
        todos: state.todos.concat(data),
      };
    },
    loadmoreTodosFailure: (state, _action: PayloadAction<LoadmoreTodosFailure>) => {
      return {
        ...state,
        statusRequest: 'failure',
      };
    },
    createTodoRequest: (state, _action: PayloadAction<CreateTodoRequest>) => {
      return {
        ...state,
        statusCreating: 'loading',
      };
    },
    createTodoSuccess: (state, action: PayloadAction<CreateTodoSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreating: 'success',
        todos: state.todos.concat(data),
      };
    },
    createTodoFailure: (state, _action: PayloadAction<CreateTodoFailure>) => {
      return {
        ...state,
        statusCreating: 'failure',
      };
    },
    updateTodoRequest: (state, action: PayloadAction<UpdateTodoRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdating: state.queueUpdating.concat(id),
      };
    },
    updateTodoSuccess: (state, action: PayloadAction<UpdateTodoSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdating: state.queueUpdating.filter(item => item !== data.id),
        todos: state.todos.map(todo => {
          if (todo.id === data.id) {
            return data;
          }
          return todo;
        }),
      };
    },
    updateTodoFailure: (state, action: PayloadAction<UpdateTodoFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdating: state.queueUpdating.filter(item => item !== id),
      };
    },
    deleteTodoRequest: (state, action: PayloadAction<DeleteTodoRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.concat(id),
      };
    },
    deleteTodoSuccess: (state, action: PayloadAction<DeleteTodoSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== id),
        todos: state.todos.filter(todo => todo.id !== id),
      };
    },
    deleteTodoFailure: (state, action: PayloadAction<DeleteTodoFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleting: state.queueDeleting.filter(item => item !== id),
      };
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const todosActions = todosSlice.actions;
