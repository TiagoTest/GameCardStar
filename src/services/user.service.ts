import { IRequestCreateUser, IResponseCreateUser } from '../models/CreateUser';
import { IResult } from '../models/Result';
import { axiosPostApi } from '../utils/useAxios';

export const createUser = async (data: IRequestCreateUser) => {
  const response = await axiosPostApi<IResult<IResponseCreateUser>>('user/create', data);
  return response;
};
