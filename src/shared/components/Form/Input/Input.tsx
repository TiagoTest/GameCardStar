import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { Colors } from '../../../styles/colors';
import * as S from './styles/index';

interface Props {
  name: string;
  type: string;
  placeholder: string;
  field: string;
  toggleIconPassword?: boolean;
  handleTogglePassowrd?: () => void;
  handleHiddenPassowrd?: () => void;
  togglePassword?: boolean;
}

export function Input({
  name,
  placeholder,
  field,
  toggleIconPassword,
  handleTogglePassowrd,
  handleHiddenPassowrd,
  togglePassword,
  ...rest
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <S.CustomDiv>
      <S.CustomDivInput>
        <div style={{ marginTop: 16, fontSize: 12 }}>{field}</div>
        <S.CustomInput
          defaultValue={defaultValue}
          inputRef={inputRef}
          {...rest}
          placeholder={placeholder}
          style={{ padding: 4, border: 'none' }}
          endAdornment={
            toggleIconPassword &&
            (togglePassword ? (
              <BsFillEyeFill
                style={{ cursor: 'pointer' }}
                fontSize={20}
                color={Colors.gray2}
                onClick={handleTogglePassowrd}
              />
            ) : (
              <BsFillEyeSlashFill
                style={{ cursor: 'pointer' }}
                color={Colors.gray2}
                fontSize={20}
                onClick={handleHiddenPassowrd}
              />
            ))
          }
        />
      </S.CustomDivInput>
      {error && (
        <span
          style={{
            color: '#f00',
            flexDirection: 'column',
            display: 'flex',
            fontSize: 14,
            marginTop: 5,
          }}>
          {error}
        </span>
      )}
    </S.CustomDiv>
  );
}
