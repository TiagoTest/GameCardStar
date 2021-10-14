import { IResponseSession } from '../../../models/Session';

export interface AuthState {
  user: IResponseSession;
}
export const AUTH_INITIAL_STATE: AuthState = {
  user: {} as IResponseSession,
};
