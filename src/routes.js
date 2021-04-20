import React from 'react';
import { View } from 'react-native';
import { Image, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { AppNavigator } from "./AppNavigator";

import logo from './assets/logo.png';

// import { Container } from './styles';

const RootStack = createStackNavigator({
  AppNavigator,
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

