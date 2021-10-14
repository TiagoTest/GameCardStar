import { LinearProgress } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { CustomRoute } from '../shared/components/CustomRoute/CustomRoute';
import { AutenticacaoRoute } from './Autenticacao.routes';
import { CadastroRoute } from './Cadastro.routes';
import { DashboardRoute } from './Dashboard.routes';

const Routes = () => {
  const ReturnLogin = () => <Redirect to="/dashboard" />;

  const routes = (
    <BrowserRouter>
      <Switch>
        <CustomRoute exact path="/" isPrivate={false} component={AutenticacaoRoute} />
        <CustomRoute exact path="/register" isPrivate={false} component={CadastroRoute} />
        <CustomRoute exact path="/dashboard" isPrivate component={DashboardRoute} />
        <CustomRoute path="*" isPrivate={false} component={ReturnLogin} />
      </Switch>
    </BrowserRouter>
  );

  return (
    <Suspense
      fallback={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <>
          <LinearProgress color="primary" />
          <LinearProgress color="secondary" />
        </>
      }>
      {routes}
    </Suspense>
  );
};

export default Routes;
