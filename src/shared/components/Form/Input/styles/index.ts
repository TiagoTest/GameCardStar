import styled from 'styled-components';
import { Input } from '@material-ui/core';

export const CustomDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;

  @media (max-width: 639px) {
    width: 100%;
  }
`;

export const CustomDivInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CustomInput = styled(Input)`
  &.MuiInput-underline:after {
    border-bottom: none;
    padding: 10px;
  }
`;
