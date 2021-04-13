import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import Routes from './routes';
// import { Container } from './styles';

const App = () => {
    return (
        <>
          <StatusBar backgroundColor="#FF8585" barStyle="dark-content" />
          <Routes /> 
        </>
      );
}

export default App;