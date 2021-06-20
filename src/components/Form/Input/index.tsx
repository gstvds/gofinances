import React from 'react';
import type { TextInputProps } from 'react-native';

import { Container } from './styles';

type InputProps = TextInputProps;

export function Input({...rest}: InputProps) {
  return (
    <Container {...rest} />
  );
}
