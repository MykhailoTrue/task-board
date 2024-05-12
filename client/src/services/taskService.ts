import { TaskWithoutId } from '../types/Task';
import axiosService from './axiosService';

export const getTasks = async () => {
  const res = await axiosService.get('tasks');
  return res.data;
};

export const getTaskById = async (id: number) => {
  const res = await axiosService.get(`tasks/${id}`);
  return res.data;
};

export const createTask = async (task: TaskWithoutId) => {
  const res = await axiosService.post('tasks', task);
  return res.data;
};

export const updateTask = async (id: number, task: TaskWithoutId) => {
  const res = await axiosService.put(`tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await axiosService.delete(`tasks/${id}`);
  return res.data;
};
