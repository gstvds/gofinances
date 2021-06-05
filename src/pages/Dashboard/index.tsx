import React from 'react';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import type { TransactionCardProps } from '../../components/TransactionCard';

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

const data: TransactionListProps[] = [
  {
    id: '1',
    title: 'Desenvolvimento de site',
    amount: 12000.4123123,
    category: {
      name: 'Vendas',
      icon: 'dollar-sign',
    },
    type: 'income' as const,
    date: '13/04/2020',
  },
  {
    id: '2',
    title: 'Hamburgueria Pizzy',
    amount: 59,
    category: {
      name: 'Alimentação',
      icon: 'coffee',
    },
    type: 'outcome' as const,
    date: '10/04/2020',
  },
  {
    id: '3',
    title: 'Aluguel do apartamento',
    amount: 1200,
    category: {
      name: 'Casa',
      icon: 'home',
    },
    type: 'outcome' as const,
    date: '27/03/2020',
  },
];

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/gstvds.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard type='income' title="Entradas" amount={17400} lastTransaction="Última entrada dia 13 de abril" />
        <HighlightCard type='outcome' title="Saídas" amount={1259} lastTransaction="Última saída dia 03 de abril" />
        <HighlightCard type='total' title="Total" amount={16141} lastTransaction="01 à 16 de abril" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard {...item} />
          )}
        />
      </Transactions>
    </Container>
  );
}