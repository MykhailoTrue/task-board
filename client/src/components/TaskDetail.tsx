import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import EditableHeader from './EditableHeader';
import { IconEdit } from '@tabler/icons-react';
import EditableContent from './EditableContent';

const TaskDetail = () => {
  const { id } = useParams();
  const { tasks, updateTask, deleteTask } = useContext(BoardContext);
  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === +(id as string));
  const [editContent, setEditContent] = useState(false);
  const [content, setContent] = useState(task?.content || '');

  if (!task) {
    navigate('/board');
    return <></>;
  }
  return (
    <div>
      <EditableHeader
        value={task.title}
        onChangeValue={(title) => updateTask(task.id, { ...task, title })}
        onDelete={() => {
          navigate('/board');
          deleteTask(task.id);
        }}
        onUpdate={() => {
          return;
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
            updateTask(task.id, { ...task, content });
          }}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
