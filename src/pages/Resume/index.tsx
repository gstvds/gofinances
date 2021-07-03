import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { STORAGE_KEYS } from '../../utils/types';
import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title, Content, ChartContainer } from './styles';

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
  percentage: number;
  percentageFormatted: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const theme = useTheme();

  async function loadData() {
    const response = await AsyncStorage.getItem(STORAGE_KEYS.transactions);
    const parsedResponse: Transaction[] = response ? JSON.parse(response) : [];

    const expenses = parsedResponse.filter((expenses) => expenses.type === 'outcome');
    const expensesTotal = expenses.reduce((accumulator: number, expense: Transaction) => {
      return accumulator + expense.amount;
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let total = 0;

      expenses.forEach((expense) => {
        if (expense.category === category.key) total += expense.amount;
      });

      if (total > 0) {
        const percentage = (total / expensesTotal);
        totalByCategory.push({
          name: category.name,
          color: category.color,
          key: category.key,
          total,
          percentage,
          percentageFormatted: Intl.NumberFormat('pt-BR', { style: 'percent' }).format(percentage),
        });
      }
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              }
            }}
            labelRadius={50}
            x="percentageFormatted"
            y="total"
          />
        </ChartContainer>
        {
          totalByCategories.map((item) => (
            <HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color} />
          ))
        }
      </Content>
    </Container>
  );
}
