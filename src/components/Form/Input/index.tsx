import React from 'react';
import type { TextInputProps } from 'react-native';

import { Container } from './styles';

interface InputProps extends TextInputProps {
  active?: boolean;
}

export function Input({ active, ...rest }: InputProps) {
  return (
    <Container active={active} {...rest} />
  );
}
