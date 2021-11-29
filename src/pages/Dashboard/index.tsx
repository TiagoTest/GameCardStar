import { Grid, IconButton } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthenticationContext } from '../../context/reducers/auth/authContext';
import { getAllRewards } from '../../services/user.service';
import { ModalLoadingSpinner } from '../../shared/components/ModalLoadingSpinner/ModalLoadingSpinner';
import * as S from './styles';
import { rewards } from './values';
import { IoMdPower } from 'react-icons/io';
import { AuthAsyncActions } from '../../context/actions/authAsyncAction';

export const DashboardPage = () => {
  const [userReward, setUserReward] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();
  const { state } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();
  const { logoutRequestAction } = AuthAsyncActions();

  const logout = () => {
    logoutRequestAction();
    history.push('/');
  };

  const { user } = state;

  const getRewardUser = async () => {
    try {
      setLoading(true);
      const userId = user.id;
      const response = await getAllRewards(userId);
      const rewardArray: string[] = [];

      response.data.forEach(item => {
        rewardArray.push(item.reward);
      });

      setUserReward(rewardArray);
    } catch (error) {
      enqueueSnackbar('Falha ao buscar dados do usuário.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const field = document.createElement('input');
    field.setAttribute('type', 'text');
    document.body.appendChild(field);

    setTimeout(function () {
      field.focus();
      setTimeout(function () {
        field.setAttribute('style', 'display:none;');
      }, 50);
    }, 50);

    getRewardUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToQuestions = (id: number) => {
    const route = `/questions/${id}`;
    history.push(route);
  };

  const rewardsComponent = rewards.map(item => {
    const active = userReward.includes(item.id.toString());
    const redirect = active ? () => {} : () => navigateToQuestions(item.id);

    return (
      <Grid key={item.id} item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
        <S.Card onClick={redirect} $active={active} src={item.url} alt={item.id.toString()} />
      </Grid>
    );
  });
  return (
    <S.Container>
      <ModalLoadingSpinner aberto={loading} />
      <S.DivTitle>
        <S.Title>Olá {user.userName}, seja bem vindo!</S.Title>
        <IconButton onClick={logout}>
          <IoMdPower color="red" />
        </IconButton>
      </S.DivTitle>
      <S.Subtitle>Selecione uma fase que não esteja destacada:</S.Subtitle>
      <S.Content>
        <Grid container spacing={3}>
          {rewardsComponent}
        </Grid>
      </S.Content>
    </S.Container>
  );
};
