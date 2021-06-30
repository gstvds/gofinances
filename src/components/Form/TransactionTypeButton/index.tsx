import React from 'react';
import type { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Button, Icon, Title } from './styles';

enum ICONS {
  income = 'arrow-up-circle',
  outcome = 'arrow-down-circle',
}

export type TRANSACTION_TYPE = keyof typeof ICONS;

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: TRANSACTION_TYPE;
  selected: boolean;
}

export function TransactionTypeButton({ title, type, selected, ...rest }: TransactionTypeButtonProps) {
  return (
    <Container type={type} selected={selected}>
      <Button {...rest}>
        <Icon type={type} name={ICONS[type]} />
        <Title>
          {title}
        </Title>
      </Button>
    </Container>
  )
}
