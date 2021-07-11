import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../pages/Profile';

describe('Test suit: Profile', () => {
  it('should show correctly user input name placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome');

    expect(inputName).toBeTruthy();
  });

  it('should load user data', () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId('input-name');
    const inputSurname = getByTestId('input-surname');

    expect(inputName.props.value).toEqual('Gustavo');
    expect(inputSurname.props.value).toEqual('Silva');
  });

  it('should render title correctly', () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId('text-title');

    expect(textTitle.props.children).toContain('Perfil');
  });
});
