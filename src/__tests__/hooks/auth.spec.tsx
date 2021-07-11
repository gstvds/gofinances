import { act, renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => {
      return {
        type: 'success',
        user: {
          id: 'any_id',
          email: 'johndoe@test.com',
          givenName: 'John',
          photoUrl: 'john_doe.png'
        },
      };
    }
  };
});

describe('Test suit: auth hook', () => {
  it('should be able to sign in with an existing Google account', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toMatchObject({
      id: 'any_id',
      email: 'johndoe@test.com',
      name: 'John',
      photo: 'john_doe.png'
    });
  });
});
