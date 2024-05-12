import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { BoardContextValue } from '../types/BoardContextValue';
import { Column, ColumnToCreate, ColumnToUpdate } from '../types/Column';
import { Task, TaskToCreate, TaskToUpdate } from '../types/Task';
import { useFetching } from '../hooks/useFetching';
import {
  getColumns,
  createColumn as createColumnService,
  updateColumn as updateColumnService,
  deleteColumn as deleteColumnService,
} from '../services/columnService';
import {
  getTasks,
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from '../services/taskService';

export const BoardContext = createContext<BoardContextValue>({
  columns: [],
  tasks: [],
  setColumns: () => {
    return;
  },
  setTasks: () => {
    return;
  },
  createTask: () => Promise.resolve(),
  updateTask: () => Promise.resolve(),
  deleteTask: () => Promise.resolve(),
  createColumn: () => Promise.resolve(),
  updateColumn: () => Promise.resolve(),
  deleteColumn: () => Promise.resolve(),
});

export const BoardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { fetching: fetchColumns } = useFetching(async () => {
    const columns = (await getColumns()) as Column[];
    columns.sort((a, b) => a.order - b.order);
    setColumns(columns);
  });

  const { fetching: fetchTasks } = useFetching(async () => {
    const tasks = (await getTasks()) as Task[];
    tasks.sort((a, b) => a.order - b.order);
    setTasks(tasks);
  });

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, []);

  const createTask = async (columnId: number) => {
    const taskToAdd: TaskToCreate = {
      title: `Task ${tasks.length + 1}`,
      content: 'Task content',
      columnId,
    };
    const task = await createTaskService(taskToAdd);
    setTasks([...tasks, task]);
  };

  const updateTask = async (taskId: number, newTask: TaskToUpdate) => {
    const updatedTask = await updateTaskService(taskId, { ...newTask });
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: number) => {
    await deleteTaskService(id);
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const createColumn = async () => {
    const columnToAdd: ColumnToCreate = {
      title: `Column ${columns.length + 1}`,
    };
    const column = await createColumnService(columnToAdd);
    setColumns([...columns, column]);
  };

  const updateColumn = async (columnId: number, newColumn: ColumnToUpdate) => {
    const updatedColumn = await updateColumnService(columnId, { ...newColumn });
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return { ...updatedColumn };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  const deleteColumn = async (id: number) => {
    await deleteColumnService(id);
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
