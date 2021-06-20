import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: 100%;
  padding: 16px 18px;
  margin-bottom: 8px;

  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};

  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
`;
