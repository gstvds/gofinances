import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

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
  TransactionList,
  LoadContainer,
} from './styles';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  total: number;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionListProps[]>([]);
  const [highlight, setHighlight] = useState<HighlightData>({ entries: { total: 0, lastTransaction: '' }, expenses: { total: 0, lastTransaction: '' } });
  const theme = useTheme();
  const { signOut, user } = useAuth();

  function getLastTransactionDate(collection: TransactionListProps[], type: 'outcome' | 'income') {
    const lastDate = new Date(Math.max.apply(Math, collection
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime())));
    const parsedLastDate = Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long' }).format(new Date(lastDate));

    return parsedLastDate;
  }

  async function loadTransactions() {
    try {
      const response = await AsyncStorage.getItem(`${STORAGE_KEYS.transactions}${user.id}`);
      const parsedTransactions: TransactionListProps[] = response ? JSON.parse(response) : [];

      let entries = { total: 0, lastTransaction: '' };
      let expenses = { total: 0, lastTransaction: '' };

      const mappedTransactions: TransactionListProps[] = parsedTransactions.map((item: TransactionListProps) => {
        if (item.type === 'income') entries.total += Number(item.amount);
        else if (item.type === 'outcome') expenses.total += Number(item.amount);

        const amount = Number(item.amount);
        const date = Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(item.date));
        return { id: item.id, name: item.name, amount, type: item.type, category: item.category, date, entries, expenses };
      });
      setTransactions(mappedTransactions);

      entries.lastTransaction = getLastTransactionDate(parsedTransactions, 'income');
      expenses.lastTransaction = getLastTransactionDate(parsedTransactions, 'outcome');

      setHighlight({ entries, expenses });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {loading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserContainer>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => signOut()}>
                <Icon name="power" />
              </LogoutButton>
            </UserContainer>
          </Header>
          <HighlightCards>
            <HighlightCard type='income' title="Entradas" amount={highlight.entries.total} lastTransaction={`Última entrada dia ${highlight.entries.lastTransaction}`} />
            <HighlightCard type='outcome' title="Saídas" amount={highlight.expenses.total} lastTransaction={`Última saída dia ${highlight.expenses.lastTransaction}`} />
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
        </>
      )}
    </Container>
  );
}