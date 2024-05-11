import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { BoardContextValue } from '../types/BoardContextValue';
import { Column } from '../types/Column';
import { Task } from '../types/Task';

export const BoardContext = createContext<BoardContextValue>({
  columns: [],
  tasks: [],
  setColumns: () => {
    return;
  },
  setTasks: () => {
    return;
  },
  createTask: () => {
    return;
  },
  updateTask: () => {
    return;
  },
  deleteTask: () => {
    return;
  },
  createColumn: () => {
    return;
  },
  updateColumn: () => {
    return;
  },
  deleteColumn: () => {
    return;
  },
});

export const BoardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setColumns([
      { id: 10, title: 'Column 1' },
      { id: 20, title: 'Column 2' },
    ]);
    setTasks([
      { id: 1, title: 'Task 1', content: 'Task content', columnId: 10 },
      { id: 2, title: 'Task 2', content: 'Task content', columnId: 20 },
    ]);
  }, []);

  const createTask = (columnId: number) => {
    const taskToAdd: Task = {
      id: tasks.length + 1,
      title: `Task ${tasks.length + 1}`,
      content: 'Task content',
      columnId,
    };
    setTasks([...tasks, taskToAdd]);
  };

  const updateTask = (taskId: number, newTask: Task) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...newTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const createColumn = () => {
    const columnToAdd: Column = {
      id: columns.length + 1,
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const updateColumn = (columnId: number, newColumn: Column) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return { ...newColumn };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const deleteColumn = (id: number) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  };

  return (
    <BoardContext.Provider
      value={{
        columns,
        tasks,
        setColumns,
        setTasks,
        createTask,
        updateTask,
        deleteTask,
        createColumn,
        updateColumn,
        deleteColumn,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
