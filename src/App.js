import React from 'react';
import Container from './components/Container/Container';
import Header from './components/Header/Header';
import './App.css'
import Filter from './components/Filter/Filter';
import UserList from './components/UserList/UserList';
import { UserContextComponent } from './business/context';
import Statistic from './components/Statistic/Statistic';

function App() {
  return (
    <UserContextComponent>
      <Container>
        <Header />
        <Filter />
        <UserList />
        <Statistic />
      </Container>
    </UserContextComponent>
  );
}

export default App;
