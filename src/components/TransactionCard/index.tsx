import React from 'react';
import { categories } from '../../utils/categories';

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
  name: string;
  amount: number;
  type: 'income' | 'outcome';
  category: string;
  date: string;
}

export function TransactionCard({ name, amount, type, category, date }: TransactionCardProps) {
  const [ findCategory ] = categories.filter((item) => item.key === category);

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === 'outcome' && '- '}
        {Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(amount)}
      </Amount>
      <Footer>
        <Category>
          <Icon name={findCategory.icon} />
          <CategoryName>{findCategory.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
