import { Dispatch, SetStateAction } from 'react';
import { Column } from './Column';
import { Task } from './Task';

export interface BoardContextValue {
  columns: Column[];
  tasks: Task[];
  createTask: (columnId: number) => void;
  updateTask: (id: number, task: Task) => void;
  deleteTask: (id: number) => void;

  createColumn: () => void;
  updateColumn: (id: number, column: Column) => void;
  deleteColumn: (id: number) => void;

  setTasks: Dispatch<SetStateAction<Task[]>>;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}
