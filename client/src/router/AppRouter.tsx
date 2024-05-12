import BoardLayout from '../components/BoardLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import TaskDetailPage from '../pages/TaskDetailPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={'/board'} />} />
      <Route path="/board" element={<BoardLayout />}>
        <Route path="card/:id" element={<TaskDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/board'} />} />
    </Routes>
  );
};

export default AppRouter;
