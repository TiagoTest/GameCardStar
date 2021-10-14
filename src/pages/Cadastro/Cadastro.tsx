/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CircularProgress } from '@material-ui/core';
import { FormHandles, FormHelpers, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import Logo from '../../assets/Logo.svg';
import { IRequestCreateUser } from '../../models/CreateUser';
import { Input } from '../../shared/components/Form';
import { MainContainer } from '../../shared/components/styled/MainContainer';
import { Colors } from '../../shared/styles/colors';
import * as S from './styles/index';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ICadastro {
  actionCreateUser: (data: IRequestCreateUser) => Promise<boolean>;
  loading: boolean;
}

export const Cadastro = ({ actionCreateUser, loading }: ICadastro) => {
  const formRef = useRef<FormHandles>(null);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState<boolean>(false);

  const handleVisiblePassword = () => {
    setTogglePassword(false);
  };

  const handleHiddenPassword = () => {
    setTogglePassword(true);
  };

  const handleVisiblePasswordConfirm = () => {
    setTogglePasswordConfirm(false);
  };

  const handleHiddenPasswordConfirm = () => {
    setTogglePasswordConfirm(true);
  };

  const handleSubmit: SubmitHandler<FormData> = async (data: FormData, { reset }: FormHelpers) => {
    try {
      formRef.current!.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome e obrigatório'),
        email: Yup.string().email('Digite um e-mail').required('O e-mail e obrigatório'),
        password: Yup.string().required('A senha e obrigatoria'),
        passwordVerification: Yup.string()
          .required('A confirmacao e obrigatória')
          .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
      });
      await schema.validate(data, { abortEarly: false });

      const request: IRequestCreateUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await actionCreateUser(request);
      if (response) {
        reset();
      }

      formRef.current!.setErrors({});
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
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}>
          <S.Logo src={Logo} alt="logo" />
          <S.CustomTitleRegister>Register</S.CustomTitleRegister>
          <Input type="name" name="name" placeholder="Insira seu nome" field="Nome" />
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
          <Input
            type={togglePasswordConfirm ? 'text' : 'password'}
            name="passwordVerification"
            placeholder="Confirme sua senha"
            field="Confirme sua senha"
            toggleIconPassword
            togglePassword={togglePasswordConfirm}
            handleTogglePassowrd={handleVisiblePasswordConfirm}
            handleHiddenPassowrd={handleHiddenPasswordConfirm}
          />
          <S.CustomTextLogin>
            Para efetuar login{' '}
            <S.LinkLogin href="/">
              <b>clique aqui.</b>
            </S.LinkLogin>
          </S.CustomTextLogin>

          <S.CustomButton disabled={loading} type="submit">
            {loading && <CircularProgress size={30} style={{ color: Colors.white, marginRight: 6 }} />} Registrar-se
          </S.CustomButton>
        </Form>
      </S.CustomDiv>
    </MainContainer>
  );
};
