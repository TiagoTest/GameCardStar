/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularProgress } from '@material-ui/core';
import { FormHandles, FormHelpers, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { IRequestSession } from '../../models/Session';
import { Input } from '../../shared/components/Form';
import { MainContainer } from '../../shared/components/styled/MainContainer';
import { Colors } from '../../shared/styles/colors';
import * as S from './styles/index';

interface FormData {
  email: string;
  password: string;
}

interface AutenticacaoProps {
  navigateToRegister: () => void;
  actionCreateSession: (data: IRequestSession) => Promise<boolean>;
  loading: boolean;
}

export const Autenticacao = ({ navigateToRegister, actionCreateSession, loading }: AutenticacaoProps) => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const handleVisiblePassword = () => {
    setTogglePassword(false);
  };

  const handleHiddenPassword = () => {
    setTogglePassword(true);
  };

  const handleSubmit: SubmitHandler<FormData> = async (data: FormData, { reset }: FormHelpers) => {
    try {
      formRef.current!.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('Digite um e-mail válido.').required('O e-mail e obrigatório'),
        password: Yup.string().required('A senha e obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await actionCreateSession(data);
      formRef.current!.setErrors({});

      if (response) {
        history.push('/dashboard');
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          formRef.current?.setFieldError(error.path!, error.message);
        });
      }
    }
  };

  return (
    <MainContainer>
      <S.CustomDiv>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <S.CustomTitleLogin>Login</S.CustomTitleLogin>
          <Input type="email" name="email" placeholder="Insira seu e-mail" field="E-mail" />
          <Input
            type={togglePassword ? 'text' : 'password'}
            name="password"
            placeholder="Insira sua senha"
            field="Senha"
            toggleIconPassword
            togglePassword={togglePassword}
            handleTogglePassowrd={handleVisiblePassword}
            handleHiddenPassowrd={handleHiddenPassword}
          />
          <S.CustomTextRegister>
            Para se registrar{' '}
            <S.CustomLink onClick={navigateToRegister} underline="none">
              <b>clique aqui.</b>
            </S.CustomLink>
          </S.CustomTextRegister>

          <S.CustomButton disabled={loading} type="submit">
            {loading && <CircularProgress size={30} style={{ color: Colors.white, marginRight: 6 }} />}
            Entrar
          </S.CustomButton>
        </Form>
      </S.CustomDiv>
    </MainContainer>
  );
};
