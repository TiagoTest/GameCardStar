import { IRequestCreateUser, IResponseCreateUser } from '../models/CreateUser';
import { IResult } from '../models/Result';
import { axiosPostApi } from '../utils/useAxios';

export const createUser = async (data: IRequestCreateUser) => {
  const response = await axiosPostApi<IResult<IResponseCreateUser>>('user/create', data);
  return response;
};

export const addRewardByUser = async (userId: string, reward: string) => {
  const body = {
    userId,
    reward,
  };

  const response = await axiosPostApi('user/add-reward', body);

  return response;
};
