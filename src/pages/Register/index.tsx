import React, { useState } from 'react';

import type { TRANSACTION_TYPE } from '../../components/Form/TransactionTypeButton';

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

export function Register() {
  const [transactionType, setTransactionType] = useState<TRANSACTION_TYPE>('income');

  function handleTransactionType(type: TRANSACTION_TYPE) {
    setTransactionType(type);
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
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}
