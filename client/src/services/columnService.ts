import { ColumnToCreate, ColumnToUpdate } from '../types/Column';
import axiosService from './axiosService';

export const getColumns = async () => {
  const res = await axiosService.get('columns');
  return res.data;
};

export const createColumn = async (column: ColumnToCreate) => {
  const res = await axiosService.post('columns', column);
  return res.data;
};

export const updateColumn = async (id: number, column: ColumnToUpdate) => {
  const res = await axiosService.put(`columns/${id}`, column);
  return res.data;
};

export const deleteColumn = async (id: number) => {
  const res = await axiosService.delete(`columns/${id}`);
  return res.data;
};

export const updateColumnOrder = async (columnIds: number[]) => {
  const res = await axiosService.put('columns/order', { columnIds });
  return res.data;
};
