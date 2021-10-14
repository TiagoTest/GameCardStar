import { Route } from 'react-router-dom';
import { CadastroScreen } from '../pages/Cadastro/CadastroScreen';

const CadastroRoute = () => {
  return <Route path="/register" component={CadastroScreen} />;
};

export { CadastroRoute };
