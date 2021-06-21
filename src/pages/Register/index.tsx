import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';

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

export function Register() {
  const { control, handleSubmit } = useForm();
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
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
            control={control}
            name="name"
            placeholder="Nome"
          />
          <InputForm
            control={control}
            name="amount"
            placeholder="Preço"
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
  )
}
