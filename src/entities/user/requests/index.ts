import axiosInstance from '@/assets/lib/axios/axiosInstance';
import { IUserResponse } from '../model';
import { UserClientEndpoints } from '../api';

const getUserData = async () => {
  try {
    const response = await axiosInstance.get<IUserResponse>(
      UserClientEndpoints.userInfo(),
    );
    const data = response.data;
    return data;
  } catch (e) {
    throw new Error('Ошибка запроса данных');
  }
};

export const userRequests = {
  getUserData,
};
