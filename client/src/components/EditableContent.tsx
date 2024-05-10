import { FC } from 'react';

interface EditableContentProps {
  editContent: boolean;
  setEditContent: (value: boolean) => void;
  value: string;
  onChangeValue: (value: string) => void;
  onUpdate: () => void;
  previewValue: string | undefined;
}

const EditableContent: FC<EditableContentProps> = ({
  value,
  onChangeValue,
  onUpdate,
  editContent,
  setEditContent,
  previewValue,
}) => {
  if (!editContent) {
    return <p className="break-words">{previewValue}</p>;
  }

  return (
    <div className="flex flex-col">
      <textarea
        value={value}
        onChange={(e) => {
          onChangeValue(e.target.value);
        }}
        className="w-full px-2 py-1 rounded-md border-2 focus:outline-none text-primaryBackground"
      />
      <div className="flex justify-end">
        <button
          className="bg-primaryBackground text-white px-2 py-1 rounded-md"
          onClick={() => {
            onUpdate();
            setEditContent(false);
          }}
        >
          Save
        </button>
        <button
          className="bg-primaryBackground text-white px-2 py-1 rounded-md"
          onClick={() => {
            setEditContent(false);
            onChangeValue(previewValue || '');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditableContent;
