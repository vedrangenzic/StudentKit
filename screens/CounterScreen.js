import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import Counter from '../components/Counter';
import ErrorBoundary from 'react-native-error-boundary';

export default class CounterScreen extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Counter />
      </ErrorBoundary>
    );
  }
}
