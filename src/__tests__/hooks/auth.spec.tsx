import { mocked } from 'ts-jest/utils';
import { act, renderHook } from '@testing-library/react-hooks';
import { logInAsync, LogInResult } from 'expo-google-app-auth';

import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth');

describe('Test suit: auth hook', () => {
  it('should be able to sign in with an existing Google account', async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockResolvedValue({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'johndoe@test.com',
        givenName: 'John',
        photoUrl: 'john_doe.png'
      },
    } as LogInResult);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toMatchObject({
      id: 'any_id',
      email: 'johndoe@test.com',
      name: 'John',
      photo: 'john_doe.png'
    });
  });

  it('should not be able to connect if Google authentication was canceled', async () => {
    const googleMocked = mocked(logInAsync);
    googleMocked.mockResolvedValue({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
