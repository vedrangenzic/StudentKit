import React, { Component } from 'react';
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