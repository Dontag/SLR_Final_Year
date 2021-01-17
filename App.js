import React, { Component } from 'react';

//Screens
import Camera_S from './src/Camera_Screen';
import History from './src/HistoryComponent';
import Login_S from './src/Login_Screen';
import ConvHistory from './src/ConvHistory';
import TextToGesture from './src/TextToGesture';

//Drawer
import SLRDrawerContent from './src/components/DrawerContent';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends Component {

  createHomeStack = () =>
    <Stack.Navigator initialRouteName={"Camera"} >
      <Stack.Screen name="Camera" children={this.createDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={ConvHistory} options={{ headerShown: false }} />
      <Stack.Screen name="TextToGesture" component={TextToGesture} options={{ headerShown: false }} />
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator initialRouteName={"Camera"} drawerContent={props => <SLRDrawerContent {...props} />}>
      <Drawer.Screen name="Camera" component={Camera_S} />
      <Drawer.Screen name="History" component={ConvHistory} />
      <Drawer.Screen name="Login" component={Login_S} />
    </Drawer.Navigator>


  render() {
    return (
      <NavigationContainer>
        {this.createHomeStack()}
      </NavigationContainer>
    );
  }
}



