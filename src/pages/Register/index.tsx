import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import type { TRANSACTION_TYPE } from '../../components/Form/TransactionTypeButton';
import { STORAGE_KEYS } from '../../utils/types';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

interface RegisterFormData {
  name: string;
  amount: string;
}

const registerFormSchema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  amount: yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O preço é obrigatório'),
});

export function Register() {
  const navigation = useNavigation();
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(registerFormSchema),
  });
  const { errors } = formState;
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>('income');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { user } = useAuth();

  function handleTransactionType(type: TRANSACTION_TYPE) {
    setTransactionType(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: RegisterFormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(`${STORAGE_KEYS.transactions}${user.id}`);
      const currentData = data ? JSON.parse(data) : [];

      await AsyncStorage.setItem(`${STORAGE_KEYS.transactions}${user.id}`, JSON.stringify([...currentData, newTransaction]));

      reset();
      setCategory({ key: 'category', name: 'Categoria' });

      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              control={control}
              autoCorrect={false}
              error={errors.name?.message}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
            />
            <InputForm
              control={control}
              error={errors.amount?.message}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
            />

            <TransactionTypes>
              <TransactionTypeButton
                type="income"
                title="Income"
                onPress={() => handleTransactionType('income')}
                selected={transactionType === 'income'}
              />
              <TransactionTypeButton
                type="outcome"
                title="Outcome"
                onPress={() => handleTransactionType('outcome')}
                selected={transactionType === 'outcome'}
              />
            </TransactionTypes>
            <CategorySelectButton title={category.name} onPress={handleOpenSelectCategory} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal animationType="slide" visible={categoryModalOpen}>
          <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategory} />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
