import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthAsyncActions } from '../../context/actions/authAsyncAction';
import { IRequestSession } from '../../models/Session';
import { Autenticacao } from './Autenticacao';

export const AutenticacaoScreen = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { loginRequestAction } = AuthAsyncActions();

  const navigateToRegister = () => {
    history.push('/register');
  };

  const actionCreateSession = async (data: IRequestSession) => {
    try {
      setLoading(true);
      const response = await loginRequestAction(data);
      setLoading(false);
      if (response.success) {
        history.push('/dashboard');
        enqueueSnackbar('Login efetuado com sucesso', { variant: 'success' });
      }
      return response.success;
    } catch (error) {
      setLoading(false);
      enqueueSnackbar('Falha ao efetura login.', { variant: 'error' });
      return false;
    }
  };

  return <Autenticacao loading={loading} navigateToRegister={navigateToRegister} actionCreateSession={actionCreateSession} />;
};

export default AutenticacaoScreen;
