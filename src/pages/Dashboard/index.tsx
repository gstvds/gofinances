import React from 'react';

import { Container, Header, UserContainer, UserInfo, Photo, User, UserGreeting, UserName, Icon } from './styles';

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
    </Container>
  );
}