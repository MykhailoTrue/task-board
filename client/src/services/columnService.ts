import { ColumnWithoutId } from '../types/Column';
import axiosService from './axiosService';

export const getColumns = async () => {
  const res = await axiosService.get('columns');
  return res.data;
};

export const createColumn = async (column: ColumnWithoutId) => {
  const res = await axiosService.post('columns', column);
  return res.data;
};

export const updateColumn = async (id: number, column: ColumnWithoutId) => {
  const res = await axiosService.put(`columns/${id}`, column);
  return res.data;
};

export const deleteColumn = async (id: number) => {
  const res = await axiosService.delete(`columns/${id}`);
  return res.data;
};
