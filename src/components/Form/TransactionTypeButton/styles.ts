import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps extends IconProps {
  selected: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border: 1.5px solid ${(props) => props.theme.colors.text};
  border-radius: 5px;

  ${(props) => props.selected && props.type === 'income' && css`
    background-color: ${props.theme.colors.success_light};
    border: none;
  `};

  ${(props) => props.selected && props.type === 'outcome' && css`
    background-color: ${props.theme.colors.attention_light};
    border: none;
  `};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 35px;
`;

interface IconProps {
  type: 'income' | 'outcome';
}

export const Icon = styled(Feather)<IconProps>`
  color: ${(props) => props.type === 'income' ? props.theme.colors.success : props.theme.colors.attention};
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
