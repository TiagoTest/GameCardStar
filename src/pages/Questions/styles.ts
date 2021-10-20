import { Button, ButtonProps, Radio, RadioProps } from '@material-ui/core';
import styled from 'styled-components';
import { Colors } from '../../shared/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.screen};

  min-height: 100vh;
  padding: 32px;
`;

export const Title = styled.h3`
  margin-bottom: 24px;
`;

export const ContainerQuestion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  background-color: ${Colors.white};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const TitleQuestion = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.gray3};
`;

export const CustomRadio = styled(Radio)<RadioProps>`
  &.MuiButtonBase-color {
    &:hover {
      background-color: none;
    }
  }

  & .MuiSvgIcon-root {
    color: ${Colors.green7};
  }
`;

export const LabelRadio = styled.span`
  color: ${Colors.gray3};
`;

export const ButtonCancel = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: ${Colors.gray4};
    background-color: ${Colors.white};
    border: none;
    height: 60px;

    transition: 0.2s;

    &:hover {
      background-color: ${Colors.whiteSmooth};
    }
  }
`;

export const ButtonConfirm = styled(Button)<ButtonProps>`
  &.MuiButton-root {
    color: ${Colors.white};
    background-color: ${Colors.green7};
    border: none;
    height: 60px;

    transition: 0.2s;

    &:hover {
      background-color: ${Colors.green8};
    }
  }
`;
