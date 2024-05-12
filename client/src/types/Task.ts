export type Task = {
  id: number;
  title: string;
  content: string;
  columnId: number;
};

export type TaskWithoutId = {
  title: string;
  content: string;
  columnId: number;
};
