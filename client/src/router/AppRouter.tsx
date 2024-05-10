import BoardLayout from '../components/BoardLayout';
import { Route, Routes } from 'react-router-dom';
import TaskDetailPage from '../pages/TaskDetailPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/board" element={<BoardLayout />}>
        <Route path="card/:id" element={<TaskDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
