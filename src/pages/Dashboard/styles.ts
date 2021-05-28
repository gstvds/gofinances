import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary}
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: purple;
`;
