import React, { Component } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Map from '../components/Map';
import data from '../RestaurantData';
import Header from  '../components/Header';

export default class MapScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    restaurants: []
  };

  getRestaurants = () => {
    let restaurants = data;
    this.setState({ restaurants });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.getRestaurants();
  };
  
  componentDidMount = () => {
    this.getLocationAsync();
};


  render() {
    const { location, restaurants } = this.state;
    return (
      <Map location={location} places={restaurants}
      />
    );
  }
}