import { FC, useState } from 'react';
import { Column as ColumnInterface } from '../types/Column';
import { IconTrash } from '@tabler/icons-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ColumnContainerProps {
  column: ColumnInterface;
  deleteColumn: (id: number) => void;
  updateColumn: (columnId: number, title: string) => void;
}

const ColumnContainer: FC<ColumnContainerProps> = ({
  column,
  deleteColumn,
  updateColumn,
}) => {
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
      flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="
        bg-primaryBackground
        text-md
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        font-bold
        p-3
        border-columnBackground
        border-4
      "
      >
        <div className="flex gap-2 items-center">
          <div>{column.id}</div>
          {editMode ? (
            <input
              className="
                  bg-black 
                  focus:border-rose-500 
                  border-rounded 
                  outline-none 
                  px-2"
              value={column.title}
              onChange={(e) => {
                updateColumn(column.id, e.target.value);
              }}
              type="text"
              defaultValue={column.title}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditMode(false);
                }
              }}
            />
          ) : (
            <div className="flex-grow">{column.title}</div>
          )}
          <button onClick={() => deleteColumn(column.id)}>
            <IconTrash />
          </button>
        </div>
      </div>
      {/*task container */}
      <div className="flex flex-grow">container</div>
      <div>footer</div>
      {/*task footer */}
    </div>
  );
};

export default ColumnContainer;
