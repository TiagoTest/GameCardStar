/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IResponseSession } from '../../../models/Session';
import { AuthState } from './constants';
import { AuthActions } from '../../types/auth.types';
import { GenericContext } from '../genericContext';

export type AuthenticationDispatch = (action: AuthenticationAction) => void;

export function authReducer(state: AuthState, action: AuthenticationAction): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS: {
      return { ...state, user: action.payload ?? ({} as IResponseSession) };
    }
    case AuthActions.LOGIN_FAILURE: {
      return { ...state };
    }
    case AuthActions.LOGOUT: {
      return { user: {} as IResponseSession };
    }
    default: {
      throw new Error(`Ação não identificada: ${action}`);
    }
  }
}

type AuthenticationAction =
  | GenericContext<AuthActions.LOGIN_SUCCESS, IResponseSession>
  | GenericContext<AuthActions.LOGIN_FAILURE>
  | GenericContext<AuthActions.LOGOUT>;
