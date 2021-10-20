import { IQuestion } from "../models/Question";
import { IResult } from "../models/Result";
import { axiosGetApi } from "../utils/useAxios";

export const getQuestionsByReward = async (reward: string) => {
    const route = `question/reward/${reward}`;
    const response = await axiosGetApi<IResult<IQuestion[]>>(route);
    return response.data;
  };