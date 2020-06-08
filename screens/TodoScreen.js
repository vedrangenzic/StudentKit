import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import Todo from '../components/Todo';
import ErrorBoundary from 'react-native-error-boundary'


export default class TodoScreen extends Component {
  render() {
    return (
     <ErrorBoundary>
       <Todo />
     </ErrorBoundary>  
    ); 
  }
}