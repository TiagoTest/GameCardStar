import { IRequestCreateUser, IResponseCreateUser } from '../models/CreateUser';
import { IResult } from '../models/Result';
import { IUserReward } from '../models/UserReward';
import { axiosPostApi, axiosGetApi } from '../utils/useAxios';

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

export const getAllRewards = async (userId: string) => {
  const route = `user/reward/${userId}`;
  const response = await axiosGetApi<IResult<IUserReward[]>>(route);
  return response;
};
