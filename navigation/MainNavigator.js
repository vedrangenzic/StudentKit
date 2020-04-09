import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoScreen from '../screens/TodoScreen';
import MapScreen from '../screens/MapScreen';
import CounterScreen from '../screens/CounterScreen';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default class BottomTab extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Map"
                    tabBarOptions={{
                        showLabel: false,
                        activeTintColor:  "#E23915",                        
                        style: {
                            backgroundColor: "#191B1F",
                            borderTopWidth: 0
                        }
                        
                   
                    }}>
                    <Tab.Screen name="Counter" component={CounterScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="plus-one" color={color} size={size} />
                            
                        ),
                    }} />
                    <Tab.Screen name="Map" component={MapScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="map" color={color} size={size} />
                        )
                    }} />
                    <Tab.Screen name="Todo" component={TodoScreen} options={{
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="add-to-list" color={color} size={size} />
                        ),
                    }} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
