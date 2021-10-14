import { Route } from 'react-router-dom';
import { AutenticacaoScreen } from '../pages/Autenticacao/AutenticacaoScreen';

export const AutenticacaoRoute = () => {
  return <Route path="/" component={AutenticacaoScreen} />;
};
