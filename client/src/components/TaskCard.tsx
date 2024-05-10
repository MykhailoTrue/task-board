import { FC, useContext, useState } from 'react';
import { Task } from '../types/Task';
import { IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { BoardContext } from '../context/BoardContext';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskCardProps {
  task: Task;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { deleteTask } = useContext(BoardContext);
  const navigate = useNavigate();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative
      "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
      bg-primaryBackground p-2.5 h-[100px] 
      min-h-[100px] items-center flex text-left 
      rounded-xl hover:ring-2 hover:ring-inset 
      hover:ring-rose-500 cursor-grab relative"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={() => navigate(`/board/card/${task.id}`)}
    >
      {task.title}
      {mouseIsOver && (
        <button
          onClick={(e) => {
            deleteTask(task.id);
            e.stopPropagation();
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackground p-2 rounded
          opacity-60 hover:opacity-100"
        >
          <IconTrash />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
