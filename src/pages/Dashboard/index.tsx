import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import type { TransactionCardProps } from '../../components/TransactionCard';

import { STORAGE_KEYS } from '../../utils/types';

import {
  Container,
  Header,
  UserContainer,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: number;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [highlight, setHighlight] = useState<HighlightData>({ entries: { total: 0 }, expenses: { total: 0 } });

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
    const parsedTransactions = response ? JSON.parse(response) : [];

    let entries = { total: 0 };
    let expenses = { total: 0 };

    const mappedTransactions: TransactionListProps[] = parsedTransactions.map((item: TransactionListProps) => {
      if (item.type === 'income') entries.total += Number(item.amount);
      else if (item.type === 'outcome') expenses.total += Number(item.amount);

      const amount = Number(item.amount);
      const date = Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(item.date));
      return { id: item.id, name: item.name, amount, type: item.type, category: item.category, date, entries, expenses };
    });
    setTransactions(mappedTransactions);
    setHighlight({ entries, expenses })
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

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
          <LogoutButton onPress={() => null}>
            <Icon name="power" />
          </LogoutButton>
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard type='income' title="Entradas" amount={highlight.entries.total} lastTransaction="Última entrada dia 13 de abril" />
        <HighlightCard type='outcome' title="Saídas" amount={highlight.expenses.total} lastTransaction="Última saída dia 03 de abril" />
        <HighlightCard type='total' title="Total" amount={highlight.entries.total - highlight.expenses.total} lastTransaction="01 à 16 de abril" />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard {...item} />
          )}
        />
      </Transactions>
    </Container>
  );
}