import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthenticationContext } from '../../context/reducers/auth/authContext';
import { IQuestion } from '../../models/Question';
import { getQuestionsByReward } from '../../services/question.service';
import { addRewardByUser } from '../../services/user.service';
import { ModalGeneric } from '../../shared/components/ModalGeneric';
import { ModalLoadingSpinner } from '../../shared/components/ModalLoadingSpinner/ModalLoadingSpinner';
import { Question } from './Question';
import * as S from './styles';

interface ITemplateResponse {
  idQuestion: string;
  responseCorrect: null | boolean;
}

export const QuestionsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [percentResponse, setPercentResponse] = useState<number>(0);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalFail, setOpenModalFail] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [responses, setResponses] = useState<ITemplateResponse[]>([]);

  const { reward } = useParams<{ reward: string }>();
  const history = useHistory();
  const { state } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();

  const getQuestions = async () => {
    try {
      setLoading(true);

      const responseApi = await getQuestionsByReward(reward);

      const arrayResponse: ITemplateResponse[] = [];

      responseApi.forEach(item => {
        arrayResponse.push({ idQuestion: item.id, responseCorrect: null });
      });

      setResponses(arrayResponse);
      setQuestions(responseApi);
    } catch (error) {
      enqueueSnackbar('Falha ao buscar perguntas.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rewardFormated = Number(reward);
  const rewardIsInteger = Number.isInteger(rewardFormated);
  const rewardIsValid = rewardFormated > 0 && rewardFormated < 17 && rewardIsInteger;
  const quizValid = rewardIsValid && questions.length > 0;

  const verifyResponse = (response: boolean, idQuestion: string) => {
    const responsesCopy = responses;

    responsesCopy.forEach(item => {
      const equalId = item.idQuestion === idQuestion;

      if (equalId) {
        item.responseCorrect = response;
      }
    });

    setResponses(responsesCopy);
  };

  const returnToDashboard = () => history.push('/dashboard');

  const actionButtonConfirmSuccess = async () => {
    try {
      const { user } = state;
      setLoading(true);
      setOpenModalSuccess(false);

      const userId = user.id;
      await addRewardByUser(userId, reward);
    } catch (error) {
      enqueueSnackbar('Falha ao resgatar troféu.', { variant: 'error' });
    } finally {
      setLoading(false);
      returnToDashboard();
    }
  };
  const actionButtonCancelFail = () => {
    setOpenModalFail(false);
    returnToDashboard();
  };
  const actionButtonConfirmFail = () => {
    setOpenModalFail(false);
  };

  const validateQuestions = () => {
    let correctResponseAmount = 0;
    let nullResponseAmount = 0;

    responses.forEach(item => {
      const responseNull = item.responseCorrect === null;
      const responseCorrect = item.responseCorrect === true;

      if (responseNull) {
        nullResponseAmount += 1;
      }
      if (responseCorrect) {
        correctResponseAmount += 1;
      }
    });

    const totalQuestions = questions.length;
    const quizCompleted = nullResponseAmount === 0;

    if (quizCompleted) {
      const percent = (correctResponseAmount * 100) / totalQuestions;
      setPercentResponse(percent);

      const quizApproved = percent >= 60;

      if (quizApproved) {
        setOpenModalSuccess(true);
      } else {
        setOpenModalFail(true);
      }
    } else {
      enqueueSnackbar('É obrigatório responder todas as perguntas.', { variant: 'error' });
    }
  };

  return (
    <S.Container>
      {quizValid && (
        <>
          <ModalLoadingSpinner aberto={loading} />
          <S.Title>Para conquistar o troféu você deve ter um aproveitamento de no mínimo 60% das questões.</S.Title>
          {questions.map((question, index) => (
            <Question key={question.id} verifyResponse={verifyResponse} questionData={question} />
          ))}
          <Grid spacing={2} container justifyContent="flex-end">
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <S.ButtonCancel onClick={returnToDashboard} fullWidth variant="outlined">
                Cancelar
              </S.ButtonCancel>
            </Grid>
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <S.ButtonConfirm onClick={validateQuestions} fullWidth variant="outlined">
                Confirmar
              </S.ButtonConfirm>
            </Grid>
          </Grid>
          {openModalSuccess && (
            <ModalGeneric
              title="Parabéns!"
              subtitle={`Você acertou ${percentResponse}% das perguntas.`}
              icon="success"
              textButtonConfirm="Receber troféu"
              actionButtonConfirm={actionButtonConfirmSuccess}
            />
          )}
          {openModalFail && (
            <ModalGeneric
              title="Ops!"
              subtitle={`Você acertou ${percentResponse}% das perguntas, para conquistar o troféu você precisa acertar no mínimo 60%.`}
              icon="fail"
              buttonCancel
              textButtonCancel="Desistir"
              textButtonConfirm="Corrigir"
              actionButtonConfirm={actionButtonConfirmFail}
              actionButtonCancel={actionButtonCancelFail}
            />
          )}
        </>
      )}
    </S.Container>
  );
};
