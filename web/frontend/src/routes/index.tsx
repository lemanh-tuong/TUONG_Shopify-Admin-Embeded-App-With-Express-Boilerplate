import { Sidebar } from 'containers/Sidebar';
import { Hello } from 'pages/Hello';
import { Initialization } from 'pages/Initialization';
import { initializationSelector } from 'pages/Initialization';
import { SettingWithReactQuery } from 'pages/SettingWithReactQuery';
import { SettingWithReduxSaga } from 'pages/SettingWithReduxSaga';
import { TodosList } from 'pages/TodosList';
import { useSelector } from 'react-redux';
import { Route, RouteObject, Routes } from 'react-router-dom';
import { View } from 'wiloke-react-core';

/**
 * CONVENTION:
    1. Comment rõ tác dụng cũng như các rằng buộc, lưu ý, tại sao lại như vậy, ...
    2. Comment rõ ràng các properties trong input 
    3. Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
    4. Storybook
    5. Testing
 */

const routes: RouteObject[] = [
  { path: '/', element: <Hello /> },
  { path: '/react-query', element: <SettingWithReactQuery /> },
  { path: '/redux-saga', element: <SettingWithReduxSaga /> },
  { path: '/todos', element: <TodosList /> },
];

export const AppRoutes = () => {
  const { statusInitialization } = useSelector(initializationSelector);

  const renderRoute = ({ element, path }: RouteObject) => {
    return <Route key={path} path={path} element={element} />;
  };

  if (statusInitialization !== 'success') {
    return <Initialization />;
  }
  return (
    <View css={{ display: 'flex' }}>
      <Sidebar />
      <View css={{ marginLeft: `${Sidebar.width}px` }}>
        <Routes>{routes.map(renderRoute)}</Routes>
      </View>
    </View>
  );
};
