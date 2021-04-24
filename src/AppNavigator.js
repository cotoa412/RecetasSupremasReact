import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"

import Register from './pages/register';
import Login from './pages/login';
import Settings from './pages/settings';
import Feed from './pages/feed';
import AddPost from './pages/addPost'

const Stack = createStackNavigator();
const Tabs  = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions= {{
      showLabel : false,
      style: {
        position: 'absolute',
        bottom: 5,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        height: 40,
        ...style.shadow
      }

    }}
  >
    <Tabs.Screen name = "Feed" component ={Feed} options = {{
      tabBarIcon: ({focused}) => (
        <View>
          <Image
           source = {require('./assets/home.png')} 
           resizeMode ="contain"
           style = {{
             width: 30,
             height: 30,
             tintColor: focused ? '#FF8585' : "#000000"
           }}
          />
          
        </View>
      )
    }} />
    <Tabs.Screen name= "AddPost" component={AddPost} options = {{
      tabBarIcon: ({focused}) => (
        <View>
          <Image
           source = {require('./assets/add.png')} 
           resizeMode ="contain"
           style = {{
             width: 25,
             height: 25,
             tintColor: focused ? '#FF8585' : "#000000"
           }}
          />
        </View> 
      )
    }} />

<Tabs.Screen name= "Register" component={Register} options = {{
      tabBarIcon: ({focused}) => (
        <View>
          <Image
           source = {require('./assets/profile.png')} 
           resizeMode ="contain"
           style = {{
             width: 25,
             height: 25,
             tintColor: focused ? '#FF8585' : "#000000"
           }}
          />
        </View> 
      )
    }} />
    
    <Tabs.Screen name= "Settings" component={Settings} options = {{
      tabBarIcon: ({focused}) => (
        <View>
          <Image
           source = {require('./assets/settings.png')} 
           resizeMode ="contain"
           style = {{
             width: 20,
             height: 20,
             tintColor: focused ? '#FF8585' : "#000000"
           }}
          />
          
        </View>
      )
    }} />
  </Tabs.Navigator>
);

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width:0,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={TabsScreen}  />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  </NavigationContainer>
);