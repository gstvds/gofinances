import React, { useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }

  async function handleSignInWithApple() {
    try {
      setLoading(true);
      return await signInWithApple();
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Apple');
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas{'\n'}finanças de forma{'\n'}muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={Google} onPress={handleSignInWithGoogle} />
          <SignInSocialButton title="Entrar com Apple" svg={Apple} onPress={handleSignInWithApple} />
        </FooterWrapper>

        {loading && <ActivityIndicator size="small" color={theme.colors.shape} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  );
}
