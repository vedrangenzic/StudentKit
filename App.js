import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from './navigation/MainNavigator';


const Tab = createBottomTabNavigator();

export default class App extends Component{
  render(){
  return (
    <BottomTab />
  );
}
}