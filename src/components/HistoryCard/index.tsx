import React from 'react';

import { Container, Title, Amount } from './styles';

interface HistoryCardProps {
  color: string;
  title: string;
  amount: number;
}

export function HistoryCard({ color, title, amount }: HistoryCardProps) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(amount)}</Amount>
    </Container>
  );
}
