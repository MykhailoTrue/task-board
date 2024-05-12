export type Task = {
  id: number;
  title: string;
  order: number;
  content: string;
  columnId: number;
};

export type TaskToCreate = {
  title: string;
  content: string;
  columnId: number;
};

export type TaskToUpdate = {
  title?: string;
  content?: string;
  order?: number;
  columnId?: number;
};
