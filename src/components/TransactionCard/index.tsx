import React from 'react';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardProps {
  title: string;
  amount: number;
  type: 'income' | 'outcome';
  category: Category;
  date: string;
}

export function TransactionCard({ title, amount, type, category, date }: TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === 'outcome' && '- '}
        {Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(amount)}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
