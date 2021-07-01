import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import type { TransactionCardProps } from '../../components/TransactionCard';
import { STORAGE_KEYS } from '../../utils/types';

export interface TransactionListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<TransactionListProps[]>([]);

  async function loadTransactions() {
    const response = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
    const parsedTransactions = response ? JSON.parse(response) : [];

    const transactions: TransactionListProps[] = parsedTransactions.map((item: TransactionListProps) => {
      const amount = Number(item.amount);
      console.log(item);
      const date = Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(item.date));
      return { id: item.id, name: item.name, amount, type: item.type, category: item.category, date };
    });
    setData(transactions);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

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