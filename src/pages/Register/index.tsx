import React, { useState } from 'react';
import { Modal } from 'react-native';

import type { TRANSACTION_TYPE } from '../../components/Form/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

export function Register() {
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

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

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

        <Button title="Enviar" />
      </Form>

      <Modal animationType="slide" visible={categoryModalOpen}>
        <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategory} />
      </Modal>
    </Container>
  )
}
