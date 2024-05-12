import { IconPlus } from '@tabler/icons-react';
import { Column } from '../types/Column';
import { useContext, useMemo, useState } from 'react';
import ColumnContainer from '../components/ColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { BoardContext } from '../context/BoardContext';
import TaskCard from '../components/TaskCard';
import { Task } from '../types/Task';
import { updateColumnOrder } from '../services/columnService';
import { updateTask, updateTasksOrder } from '../services/taskService';

const BoardPage = () => {
  const { columns, tasks, setColumns, setTasks, createColumn } =
    useContext(BoardContext);
  const columnsIds = useMemo(
    () => columns.map((column) => `column-${column.id}`),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    console.log('drag start', event);
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log('drag end', event);
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === 'Column';
    if (!isActiveAColumn) return;

    const getMovedColumns = () => {
      const activeIndex = columns.findIndex(
        (col) => `column-${col.id}` === activeId
      );
      const overIndex = columns.findIndex(
        (col) => `column-${col.id}` === overId
      );
      return arrayMove(columns, activeIndex, overIndex);
    };
    const movedColumns = getMovedColumns();
    const movedColumnsIds = movedColumns.map((c) => c.id);
    updateColumnOrder(movedColumnsIds);

    setColumns(movedColumns);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      const taskToUpdateColumnId: { id?: number; columnId?: number } = {};
      const getMovedTasks = () => {
        const activeIndex = tasks.findIndex((t) => `task-${t.id}` === activeId);
        const overIndex = tasks.findIndex((t) => `task-${t.id}` === overId);

        if (tasks[activeIndex].columnId != tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;

          taskToUpdateColumnId.id = tasks[activeIndex].id;
          taskToUpdateColumnId.columnId = tasks[overIndex].columnId;

          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      };

      const movedTasks = getMovedTasks();
      const movedTasksIds = movedTasks.map((t) => t.id);

      if (taskToUpdateColumnId.columnId && taskToUpdateColumnId.id) {
        updateTask(taskToUpdateColumnId.id, {
          columnId: taskToUpdateColumnId.columnId,
        });
      }
      updateTasksOrder(movedTasksIds);
      setTasks(movedTasks);
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      const taskToUpdateColumnId: { id?: number; columnId?: number } = {};
      const getMovedTasks = () => {
        const activeIndex = tasks.findIndex((t) => `task-${t.id}` === activeId);

        tasks[activeIndex].columnId = +overId.toString().replace('column-', '');

        taskToUpdateColumnId.id = tasks[activeIndex].id;
        taskToUpdateColumnId.columnId = tasks[activeIndex].columnId;

        console.log('DROPPING TASK OVER COLUMN', { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      };

      const movedTasks = getMovedTasks();
      const movedTasksIds = movedTasks.map((t) => t.id);

      if (taskToUpdateColumnId.columnId && taskToUpdateColumnId.id) {
        updateTask(taskToUpdateColumnId.id, {
          columnId: taskToUpdateColumnId.columnId,
        });
      }
      updateTasksOrder(movedTasksIds);
      setTasks(movedTasks);
    }
  };

  return (
    <div
      className="
         m-auto
         flex
         min-h-screen
         w-full
         items-center 
         overflow-x-auto
         overflow-y-hidden
         px-[40px]"
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((t) => t.columnId === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => createColumn()}
            className="
        h-[60px]
        w-[350px] 
        min-w-[350px] 
        cursor-pointer 
        rounded-md 
        bg-primaryBackground border-2
        border-columnBackground p-4 
        ring-rose-500 
        hover:ring-2
        flex
        items-center
        gap-4
  "
          >
            <p className="text-lg">Add column</p>
            <IconPlus className="h-6 w-6" />
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter((t) => t.columnId === activeColumn.id)}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default BoardPage;
