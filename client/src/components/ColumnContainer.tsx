import { FC, useContext, useMemo, useState } from 'react';
import { Column as ColumnInterface } from '../types/Column';
import { IconPlus } from '@tabler/icons-react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';
import EditableHeader from './EditableHeader';
import { BoardContext } from '../context/BoardContext';
import { useFetching } from '../hooks/useFetching';
import Loader from './ui/ModalWindow/Loader';

interface ColumnContainerProps {
  column: ColumnInterface;
  tasks: Task[];
}

const ColumnContainer: FC<ColumnContainerProps> = ({ column, tasks }) => {
  const { deleteColumn, updateColumn, createTask } = useContext(BoardContext);
  const tasksIds = useMemo(
    () => tasks.map((task) => `task-${task.id}`),
    [tasks]
  );

  const { fetching: createTaskFetching, isLoading: isTaskCreating } =
    useFetching(createTask);

  const [title, setTitle] = useState(column.title);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.id}`,
    data: {
      type: 'Column',
      column: {
        ...column,
        id: `column-${column.id}`,
      },
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
    w-[350px] 
    min-w-[350px]
    opacity-40
    border-2
    border-rose-500
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col"
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      w-[350px] 
      min-w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      bg-columnBackground"
    >
      <div {...attributes} {...listeners}>
        <EditableHeader
          value={title}
          onChangeValue={setTitle}
          onDelete={async () => await deleteColumn(column.id)}
          onUpdate={async () => {
            await updateColumn(column.id, { title });
          }}
          numberIndex={tasks.length}
        />
      </div>
      {/*tasks container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </SortableContext>
      </div>
      {isTaskCreating ? (
        <Loader />
      ) : (
        <button
          className="
      flex gap-2 items-center border-columnBackground 
      border-2 rounded-md p-4 border-x-columnBackground 
      hover:text-rose-500 active:bg-black"
          onClick={() => createTaskFetching(column.id)}
        >
          <IconPlus /> Add tasks
        </button>
      )}
    </div>
  );
};

export default ColumnContainer;
