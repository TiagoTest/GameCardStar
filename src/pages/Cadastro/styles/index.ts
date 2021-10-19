import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Colors } from '../../../shared/styles/colors';

export const BackgroundDiv = styled.div`
  height: 100vh;
  width: 100vw;
`;

const appearFromRight = keyframes`
  from {
    opacity:0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const CustomDiv = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  width: 400px;
  height: 600px;
  display: flex;
  padding-top: 10px;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  @media (max-width: 653px) {
    width: 300px;
    height: 580px;
    padding: 16px;
  }
`;

export const Logo = styled.img`
  width: 120px;
  height: 80px;
`;

export const CustomButton = styled(Button)`
  &.MuiButton-root {
    margin-top: 8px;
    margin-bottom: 8px;
    background-color: ${Colors.green8};
    color: ${Colors.white};
    width: 200px;
    height: 56px;
    border-radius: 10px;

    font-weight: bold;

    transition: 0.5s;

    &:hover {
      background: ${Colors.green7};
      color: ${Colors.white};
    }
  }
`;

export const CustomTitleRegister = styled(Typography)`
  &.MuiTypography-root {
    font-size: 32px;
    font-weight: bold;
    color: ${Colors.white};
    padding: 20px 0 16px;
  }
`;

export const CustomTextRegister = styled(Typography)`
  font-size: 14px;
  color: ${Colors.white};
  padding: 4px;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${Colors.green4};
`;

export const CustomTextLogin = styled(Typography)`
  font-size: 14px;
  color: ${Colors.white};
  padding: 24px 0px 10px 0px;
`;

export const LinkLogin = styled.a`
  text-decoration: none;
  transition: 0.4s;
  color: ${Colors.green4};

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  &.MuiTypography-colorPrimary {
    color: ${Colors.strongRed};
  }
`;
