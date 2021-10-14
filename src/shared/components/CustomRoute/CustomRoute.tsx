import React, { ComponentType } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const CustomRoute = ({ isPrivate = true, component: Component, ...rest }: CustomRouteProps) => {

  const authenticated = false;
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
