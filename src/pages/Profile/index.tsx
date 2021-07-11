import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export function Profile() {
  return (
    <View
      testID="view-container"
    >
      <Text testID="text-title">
        Perfil
      </Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Gustavo"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Silva"
      />

      <Button
        title="Salvar"
        onPress={() => null}
      />
    </View>
  );
}
