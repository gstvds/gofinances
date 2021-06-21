import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import type { TRANSACTION_TYPE } from '../../components/Form/TransactionTypeButton';

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
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerFormSchema),
  });
  const { errors } = formState;
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>('income');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionType(type: TRANSACTION_TYPE) {
    setTransactionType(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleRegister(form: RegisterFormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
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
