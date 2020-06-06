import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Linking from 'expo-linking';
import * as IntentLauncher from 'expo-intent-launcher';
import getDirections from 'react-native-google-maps-directions';
import get from 'lodash/get';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const initialRegion = {
    latitude: 37.321996988,
    longitude: -122.0325472123455
};

export default class Map extends Component {
    state = {
        coords: null,
    }

    handleGetDirections = (id) => {
        const data = {
           source: {
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude
          },
          destination: {
            latitude: this.props.places[id].coords.latitude,
            longitude: this.props.places[id].coords.longitude
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode
            }
          ],
        }
     
        getDirections(data)
      }

    renderMarkers() {
        return this.props.places.map((place, i) => (
            
            <Marker
                key={i}
                title={place.name}
                coordinate={place.coords}
                onCalloutPress={() => this.handleGetDirections(i, option)}
            >
                <Callout tooltip>
                    <View>
                        <View style={styles.bubble}>
                            <View>
                            <Text style={styles.name}>{place.name}</Text>                            
                            <Text>A short description</Text>
                            </View>
                            <MaterialCommunityIcons name="bullseye-arrow" size={40} color="dodgerblue" />
                        </View>
                    </View>
                </Callout>
            </Marker>
        ));
    }

    render() {
        const { location } = this.props;
        const region = {
            latitude: get(location, 'coords.latitude', null),
            longitude: get(location, 'coords.longitude', null),
            ...deltas
        };
        if (!region.latitude || !region.longitude) {
            return (
                <View>
                    <Text>Loading map...</Text>
                </View>
            );
        }

        return (
            <MapView
                style={styles.container}
                region={region}
                initialRegion={{ ...initialRegion, ...deltas }}
                showsUserLocation
                showsMyLocationButton
            >
                {this.renderMarkers()}
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        justifyContent:'space-between',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 250,
        marginBottom: 55
    },
    // Arrow below the bubble
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
    },
    // Character name
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
});