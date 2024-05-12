import { Dispatch, SetStateAction } from 'react';
import { Column, ColumnToUpdate } from './Column';
import { Task } from './Task';

export interface BoardContextValue {
  columns: Column[];
  tasks: Task[];
  createTask: (columnId: number) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  createColumn: () => Promise<void>;
  updateColumn: (id: number, column: ColumnToUpdate) => Promise<void>;
  deleteColumn: (id: number) => Promise<void>;

  setTasks: Dispatch<SetStateAction<Task[]>>;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}
