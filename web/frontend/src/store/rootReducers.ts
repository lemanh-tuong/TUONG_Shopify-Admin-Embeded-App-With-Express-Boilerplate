import { reducerInitialization } from 'pages/Initialization';
import { reducerSetting } from 'pages/SettingWithReduxSaga';
import { todosReducer } from 'pages/TodosList';

export const rootReducers = {
  initialization: reducerInitialization,
  setting: reducerSetting,
  todos: todosReducer,
};
