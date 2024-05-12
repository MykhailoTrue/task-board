import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import EditableHeader from './EditableHeader';
import { IconEdit } from '@tabler/icons-react';
import EditableContent from './EditableContent';
import { getTaskById } from '../services/taskService';
import { Task } from '../types/Task';
import { useFetching } from '../hooks/useFetching';
import Loader from './ui/ModalWindow/Loader';

const TaskDetail = () => {
  const { id } = useParams();
  const { updateTask, deleteTask } = useContext(BoardContext);
  const [editContent, setEditContent] = useState(false);
  const [task, setTask] = useState<Task | null>(null);

  const navigate = useNavigate();

  const {
    fetching: fetchTask,
    isLoading: isTaskFetching,
    error,
  } = useFetching(async () => {
    const task = await getTaskById(+id! as number);
    setTask(task);
    setTitle(task.title);
  });

  useEffect(() => {
    fetchTask();
  }, []);

  const [content, setContent] = useState(task?.content || '');

  const [title, setTitle] = useState(task?.title || '');

  if (error) {
    navigate('/board');
  }

  if (isTaskFetching || !task) {
    return <Loader />;
  }

  return (
    <div>
      <EditableHeader
        value={title}
        onChangeValue={setTitle}
        onDelete={async () => {
          navigate('/board');
          await deleteTask(task.id);
        }}
        onUpdate={async () => {
          await updateTask(task.id, { title });
        }}
      />
      <div className="p-3 flex flex-col">
        <div className="flex justify-between">
          <h2 className="text-md font-bold">Content</h2>
          <button
            className="bg-primaryBackground text-white px-2 py-1 rounded-md"
            onClick={() => setEditContent(true)}
          >
            <IconEdit />
          </button>
        </div>

        <EditableContent
          previewValue={task.content}
          value={content}
          onChangeValue={setContent}
          editContent={editContent}
          setEditContent={setEditContent}
          onUpdate={() => {
            updateTask(task.id, { content });
          }}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
