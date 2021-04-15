import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Register from './pages/register';
import Login from './pages/login';
import Settings from './pages/settings';
import Feed from './pages/feed';

import logo from './assets/andres.png';

// import { Container } from './styles';

const RootStack = createStackNavigator({
  Feed,
  }, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTitle: () =>  <Image source={logo} />,
      headerStyle: {
        backgroundColor: '#FF8585'
      },
    },
  });

const Routes = createAppContainer(RootStack);

export default Routes;

