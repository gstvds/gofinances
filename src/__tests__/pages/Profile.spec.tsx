import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../pages/Profile';

test('check if show correctly user input name placeholder', () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText('Nome');

  expect(inputName.props.placeholder).toBeTruthy();
});
