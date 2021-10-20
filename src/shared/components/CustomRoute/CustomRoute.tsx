import { ComponentType } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthenticationContext } from '../../../context/reducers/auth/authContext';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const CustomRoute = ({ isPrivate = true, component: Component, ...rest }: CustomRouteProps) => {
  const { state } = useAuthenticationContext();

  const authenticated = state.user.token;
  const openRoute = !isPrivate;

  const privateRoute = () => {
    if (isPrivate) {
      if (authenticated) {
        return <Component />;
      }
      return <Redirect to="/" />;
    }
    if (openRoute && authenticated) {
      return <Redirect to="/dashboard" />;
    }

    return <Component />;
  };

  return <Route {...rest} render={privateRoute} />;
};
