import React from 'react';
import { Controller } from 'react-hook-form';

import type { TextInputProps } from 'react-native';
import type { Control } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';

interface InputFormProps extends TextInputProps {
  name: string;
  control: Control
  error?: string;
}

export function InputForm({ name, control, error, ...rest }: InputFormProps) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => <Input {...rest} value={value} onChangeText={onChange} />}
      />
      {!!error && <Error>{error}</Error>}
    </Container>
  );
}
