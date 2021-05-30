import React from 'react';

import { Container, Header, UserContainer, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards } from './styles';

import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserContainer>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/gstvds.png' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserContainer>
      </Header>
      <HighlightCards>
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </HighlightCards>
    </Container>
  );
}