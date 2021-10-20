import { RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import { IQuestion } from '../../models/Question';
import * as S from './styles';

interface IQuestionProps {
  index: number;
  questionData: IQuestion;
  verifyResponse: (correctResponse: boolean, index: number) => void;
}

export const Question = ({ questionData, verifyResponse, index }: IQuestionProps) => {
  const [valueQuestion, setValueQuestion] = useState<string>('');
  const titleQuestion = questionData.name;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const valueBoolean = value === 'true';
    const correctResponse = valueBoolean === questionData.response;
    
    verifyResponse(correctResponse, index);
    setValueQuestion(value);
  };

  const verifyChecked = (value: string) => value === valueQuestion;

  return (
    <S.ContainerQuestion>
      <S.TitleQuestion>{titleQuestion}</S.TitleQuestion>
      <RadioGroup value={valueQuestion} onChange={handleChange}>
        <div>
          <S.CustomRadio checked={verifyChecked('true')} value={true} />
          <S.LabelRadio>Verdadeiro</S.LabelRadio>
        </div>
        <div>
          <S.CustomRadio checked={verifyChecked('false')} value={false} />
          <S.LabelRadio>Falso</S.LabelRadio>
        </div>
      </RadioGroup>
    </S.ContainerQuestion>
  );
};
