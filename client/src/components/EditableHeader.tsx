import { IconTrash } from '@tabler/icons-react';
import { FC, useState } from 'react';

interface EditableHeaderProps {
  value: string;
  onChangeValue: (value: string) => void;
  onDelete: () => void;
  onUpdate: () => void;
  numberIndex?: number;
}

const EditableHeader: FC<EditableHeaderProps> = ({
  value,
  onChangeValue,
  onDelete,
  onUpdate,
  numberIndex,
}) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div
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
        {numberIndex && <div>{numberIndex}</div>}
        {editMode ? (
          <input
            className="
                  bg-black 
                  focus:border-rose-500 
                  border-rounded 
                  outline-none 
                  flex-grow
                  px-2"
            value={value}
            onChange={(e) => {
              onChangeValue(e.target.value);
            }}
            type="text"
            autoFocus
            onBlur={() => setEditMode(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setEditMode(false);
                onUpdate();
              }
            }}
          />
        ) : (
          <div className="flex-grow">{value}</div>
        )}
        <button onClick={() => onDelete()}>
          <IconTrash />
        </button>
      </div>
    </div>
  );
};

export default EditableHeader;
