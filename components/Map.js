import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import get from 'lodash/get';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getPreciseDistance } from 'geolib';

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
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

    getDistance = (place) => {

        const { location } = this.props;
        const dist = getPreciseDistance(

            { latitude: get(location, 'coords.latitude', null), longitude: get(location, 'coords.longitude', null) },
            { latitude: get(place, 'coords.latitude', null), longitude: get(place, 'coords.longitude', null) }) / 1000;
        return dist;
    }

    renderMarkers() {

        return this.props.places.map((place, i) => (

            <Marker
                key={i}
                title={place.name}
                coordinate={place.coords}
                onCalloutPress={() => this.handleGetDirections(i)}
            >
                <Callout tooltip>
                    <View>
                        <View style={styles.bubble}>
                            <View>
                                <Text style={styles.name}>{place.name}</Text>
                                <Text>Distance: {(this.getDistance(place))} km</Text>
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
                <View style={{ backgroundColor: '#191B1F', flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="#D2691E" />
                </View>
            );
        }

        return (
            <MapView
                style={styles.container}
                region={region}
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
        justifyContent: 'space-between',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 15,
        width: 250,
        marginBottom: 55
    },
    name: {
        fontSize: 16,
        marginBottom: 5,
    },
});