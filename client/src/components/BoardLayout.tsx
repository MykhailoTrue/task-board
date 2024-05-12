import { Outlet } from 'react-router-dom';
import BoardPage from '../pages/BoardPage';
import { BoardProvider } from '../context/BoardContext';

const BoardLayout = () => {
  return (
    <>
      <BoardProvider>
        <BoardPage />
        <Outlet />
      </BoardProvider>
    </>
  );
};

export default BoardLayout;
