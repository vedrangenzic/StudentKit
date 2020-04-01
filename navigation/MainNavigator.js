import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoScreen from '../screens/TodoScreen';
import MapScreen from '../screens/MapScreen';
import CounterScreen from '../screens/CounterScreen';

const Tab = createBottomTabNavigator();

export default class BottomTab extends Component {
    render(){
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Todo" component={TodoScreen} />
                <Tab.Screen name="Counter" component={CounterScreen} />
                <Tab.Screen name="Map" component={MapScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
}
