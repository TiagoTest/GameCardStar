import { Route } from 'react-router-dom';
import { AutenticacaoPage } from '../pages/Autenticacao';

export const LoginRoute = () => {
  return <Route path="/" component={AutenticacaoPage} />;
};
