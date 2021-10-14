import styled from 'styled-components';
import BackgroundLogin from '../../../assets/BackgroundLogin.jpg';
import { ContainerCenter } from './ContainerCenter';

export const MainContainer = styled(ContainerCenter)`
  background: url(${BackgroundLogin});
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
