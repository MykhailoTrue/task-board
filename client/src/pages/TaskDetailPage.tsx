import { useNavigate } from 'react-router-dom';
import TaskDetail from '../components/TaskDetail';
import ModalWindow from '../components/ui/ModalWindow/ModalWindow';

const TaskDetailPage = () => {
  const navigate = useNavigate();

  return (
    <ModalWindow opened={true} onClose={() => navigate('/board')}>
      <TaskDetail />
    </ModalWindow>
  );
};

export default TaskDetailPage;
