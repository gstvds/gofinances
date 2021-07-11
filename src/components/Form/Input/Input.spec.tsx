import React from 'react';
import { render } from '@testing-library/react-native';

import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/styles/theme';

// When testing components that have contexts, we need to pass the providers around the component
const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Test suit: Input', () => {
  it('should have a specific border when active ', () => {
    const { getByTestId } = render(
      <Input testID="input-email" active placeholder="e-mail" keyboardType="email-address" autoCorrect={false} />,
      {
        wrapper: Providers // Adds this wrapper around the component to test
      }
    );

    const inputComponent = getByTestId('input-email');
    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
