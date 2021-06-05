import React from 'react';

import { Container, Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

interface HighlightCardProps {
  title: string;
  amount: number;
  lastTransaction: string;
  type: 'income' | 'outcome' | 'total';
}

enum IconTypes {
  income = 'arrow-up-circle',
  outcome = 'arrow-down-circle',
  total = 'dollar-sign'
}

export function HighlightCard({ title, amount, lastTransaction, type }: HighlightCardProps){
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon type={type} name={IconTypes[type]} />
      </Header>
      
      <Footer>
        <Amount type={type}>R$ {Intl.NumberFormat('pt-BR', { currency: 'BRL' }).format(amount)}</Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Footer>
    </Container>
  );
}
