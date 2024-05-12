export interface Column {
  id: number;
  order: number;
  title: string;
}

export interface ColumnWithoutId {
  title: string;
  order: number;
}

export interface ColumnToUpdate {
  title?: string;
  order?: number;
}

export interface ColumnToCreate {
  title: string;
}
