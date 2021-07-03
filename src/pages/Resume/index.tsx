import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../../utils/types';
import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title, Content } from './styles';

interface Transaction {
  name: string;
  amount: number;
  type: 'income' | 'outcome';
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: number;
  color: string;
  key: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
    const parsedResponse: Transaction[] = response ? JSON.parse(response) : [];

    const expenses = parsedResponse.filter((expenses) => expenses.type === 'outcome');

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let total = 0;

      expenses.forEach((expense) => {
        if (expense.category === category.key) total += expense.amount;
      });

      if (total > 0) totalByCategory.push({ name: category.name, color: category.color, key: category.key, total });
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resume</Title>
      </Header>

      <Content>
        {
          totalByCategories.map((item) => (
            <HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color} />
          ))
        }
      </Content>
    </Container>
  );
}
