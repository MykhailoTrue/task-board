import BoardPage from '../pages/BoardPage';
import { Navigate } from 'react-router-dom';

export const publicRoutes = [
  { path: 'board', element: <BoardPage /> },
  { path: '*', element: <Navigate to="/board" /> },
];

// export default publicRoutes;
