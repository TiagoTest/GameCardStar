import { RadioGroup } from '@material-ui/core';
import { useState } from 'react';
import { IQuestion } from '../../models/Question';
import * as S from './styles';

interface IQuestionProps {
  questionData: IQuestion;
  verifyResponse: (response: boolean, idQuestion: string) => void;
}

export const Question = ({ questionData, verifyResponse }: IQuestionProps) => {
  const [valueQuestion, setValueQuestion] = useState<string>('');
  const titleQuestion = questionData.name;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const valueBoolean = value === 'true';
    const correctResponse = valueBoolean === questionData.response;
    const idQuestion = questionData.id;

    verifyResponse(correctResponse, idQuestion);
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
