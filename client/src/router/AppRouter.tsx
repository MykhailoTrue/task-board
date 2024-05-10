import { publicRoutes } from './publicRoutes';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route {...route} key={route.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
