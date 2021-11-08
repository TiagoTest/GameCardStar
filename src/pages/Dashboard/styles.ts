import styled from 'styled-components';
import { Colors } from '../../shared/styles/colors';

interface CardProps {
  $active: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 32px;
  background-color: ${Colors.screen};
`;

export const DivTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.gray3};
`;

export const Subtitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.gray2};
  margin-top: 32px;
`;

export const Content = styled.div`
  margin-top: 32px;
`;

export const Card = styled.img<CardProps>`
  width: 150px;
  height: 150px;
  border-radius: 30px;
  align-self: center;

  opacity: ${props => (props.$active ? 1 : 0.2)};
`;
