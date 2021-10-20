import { Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IQuestion } from '../../models/Question';
import { ModalGeneric } from '../../shared/components/ModalGeneric';
import { Question } from './Question';
import * as S from './styles';

const perguntaFake: IQuestion[] = [
  {
    id: 'tetret',
    name: 'A camisa é verde asdasdakldkaksdlk asldklaksdlaksdlklkl sdsdk sadasdkaksd dsadaskdak asdkasodoas ?',
    response: true,
    reward: '1',
  },
  { id: 'tetret2', name: 'A camisa é verde?', response: true, reward: '1' },
  { id: 'tetretw', name: 'A camisa é verde?', response: true, reward: '1' },
  { id: 'tetretd', name: 'A camisa é verde?', response: true, reward: '1' },
  { id: 'tetrets', name: 'A camisa é verde?', response: true, reward: '1' },
];

export const QuestionsPage = () => {
  const [correctResponseAmount, setCorrectResponseAmount] = useState<number>(0);
  const [incorrectResponseAmount, setICorrectResponseAmount] = useState<number>(0);
  const [percentResponse, setPercentResponse] = useState<number>(0);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalFail, setOpenModalFail] = useState<boolean>(false);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const responses: boolean[] = [];

  const { reward } = useParams<{ reward: string }>();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const getQuestions = () => {
    setQuestions(perguntaFake);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const rewardFormated = Number(reward);
  const rewardIsInteger = Number.isInteger(rewardFormated);
  const rewardIsValid = rewardFormated > 0 && rewardFormated < 17 && rewardIsInteger;
  const quizValid = rewardIsValid && questions.length > 0;

  const verifyResponse = (correctResponse: boolean, index: number) => {
    if (correctResponse) {
      const newAmountCorrect = correctResponseAmount + 1;
      setCorrectResponseAmount(newAmountCorrect);
    } else {
      const newAmountIncorrect = incorrectResponseAmount + 1;
      setICorrectResponseAmount(newAmountIncorrect);
    }
  };

  const returnToDashboard = () => history.push('/dashboard');

  const actionButtonConfirmSuccess = () => {
    //loading
    setOpenModalSuccess(false);
    // chamar api e adicionar o troféu do usuario
    returnToDashboard();
  };
  const actionButtonCancelFail = () => {
    setOpenModalFail(false);
    returnToDashboard();
  };

  const actionButtonConfirmFail = () => {
    setOpenModalFail(false);
  };

  const validateQuestions = () => {
    console.log(correctResponseAmount);
    console.log(incorrectResponseAmount);
    
    const questionsResponseAmount = correctResponseAmount + incorrectResponseAmount;
    const totalQuestions = questions.length;
    const quizCompleted = questionsResponseAmount === totalQuestions;

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
          <S.Title>Para conquistar o troféu você deve ter um aproveitamento de no mínimo 60% das questões.</S.Title>
          {questions.map((question, index) => (
            <Question key={question.id} verifyResponse={verifyResponse} questionData={question} index={index} />
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
              textButtonCancel="Voltar outra hora"
              textButtonConfirm="Tentar novamente"
              actionButtonConfirm={actionButtonConfirmFail}
              actionButtonCancel={actionButtonCancelFail}
            />
          )}
        </>
      )}
    </S.Container>
  );
};
