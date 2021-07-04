import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Alert } from 'react-native';

import Apple from '../../assets/apple.svg';
import Google from '../../assets/google.svg';
import Logo from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

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
  const { signInWithGoogle } = useAuth();

  async function handleSignWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
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
          <SignInSocialButton title="Entrar com Google" svg={Google} onPress={handleSignWithGoogle} />
          <SignInSocialButton title="Entrar com Apple" svg={Apple} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
