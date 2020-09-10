import React, { Component } from 'react';

import Home_S from './src/Home_Screen';
import Dashboard_S from './src/Dashboard_Screen';
import Camera_S from './src/Camera_Screen';
import History from './src/HistoryComponent';
import Login_S from './src/Login_Screen';
import GTT_C_S from './src/assets/components/GTT_Camera_C'


import Screen1 from './src/Screens/Drawer/Drawer_Screen1';
import Screen2 from './src/Screens/Drawer/Drawer_Screen2';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  createHomeStack = () =>
    <Stack.Navigator >
      <Stack.Screen name="Camera" children={this.createDrawer} options={{ headerShown: false }} />
      {/* <Stack.Screen name="Login" component= {Login_S} options= {{headerShown: false}}/> */}
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Dashboard" component={Dashboard_S}/> */}
      <Drawer.Screen name="Camera" component={Camera_S} />
      <Drawer.Screen name="History" component={History} />
    </Drawer.Navigator>


  render() {
    return (
      <NavigationContainer>
        {this.createHomeStack()}
      </NavigationContainer>
    );
  }
}



