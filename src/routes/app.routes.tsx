import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';

import { Dashboard } from '../pages/Dashboard';
import { Register } from '../pages/Register';
import { Platform } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoute() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons size={size} color={color} name="format-list-bulleted" />
          ))
        }}
        />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons size={size} color={color} name="attach-money" />
          ))
        }}
        />
      <Screen
        name="Resumoe"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons size={size} color={color} name="pie-chart" />
          ))
        }}
      />
    </Navigator>
  )
}
