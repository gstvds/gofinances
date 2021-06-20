import React from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

enum ICONS {
  income = 'arrow-up-circle',
  outcome = 'arrow-down-circle',
}

export type TRANSACTION_TYPE = keyof typeof ICONS;

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: TRANSACTION_TYPE;
  selected: boolean;
}

export function TransactionTypeButton({ title, type, selected, ...rest }: TransactionTypeButtonProps) {
  return (
    <Container {...rest} type={type} selected={selected}>
      <Icon type={type} name={ICONS[type]} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}
