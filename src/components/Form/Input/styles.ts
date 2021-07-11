import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps {
  active?: boolean;
}

export const Container = styled(TextInput)<InputProps>`
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 8px;

  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};

  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;

  ${(props) => props.active && css`
    border-width: 3px;
    border-color: ${props.theme.colors.attention};
  `};
`;
