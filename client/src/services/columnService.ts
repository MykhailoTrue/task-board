import axiosService from './axiosService';

export const getColumns = async () => {
  const res = await axiosService.get('columns');
  return res.data;
};
