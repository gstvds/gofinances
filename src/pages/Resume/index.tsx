import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';

import { STORAGE_KEYS } from '../../utils/types';
import { categories } from '../../utils/categories';

import { HistoryCard } from '../../components/HistoryCard';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './styles';

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
  const [loading, setLoading] = useState(false);
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'previous' | 'next') {
    const newDate = action === 'previous' ? subMonths(selectedDate, 1) : addMonths(selectedDate, 1);
    setSelectedDate(newDate);
  }

  async function loadData() {
    setLoading(true);
    try {
      const response = await AsyncStorage.getItem(`${STORAGE_KEYS.transactions}${user.id}`);
      const parsedResponse: Transaction[] = response ? JSON.parse(response) : [];
  
      const expenses = parsedResponse.filter((expense) =>
        expense.type === 'outcome' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
      );
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('previous')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>
            {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
          </Month>
          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>
        {loading ? (
          <LoadContainer>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </LoadContainer>
        ) : (
          <>
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
          </>
        )}
      </Content>
    </Container>
  );
}
