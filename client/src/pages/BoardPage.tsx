import { IconPlus } from '@tabler/icons-react';
import { Column } from '../types/Column';
import { useContext, useMemo, useState } from 'react';
import ColumnContainer from '../components/ColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { BoardContext } from '../context/BoardContext';

const BoardPage = () => {
  const { columns, setColumns } = useContext(BoardContext);
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 500, distance: 10 },
    })
  );

  const { tasks, createColumn } = useContext(BoardContext);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }
    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) {
      return;
    }

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
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
      >
        <div className="m-auto flex gap-4">
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
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter((t) => t.columnId === activeColumn.id)}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default BoardPage;
