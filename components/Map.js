import React, { Component } from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import getDirections from "react-native-google-maps-directions";
import get from "lodash/get";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getPreciseDistance } from "geolib";
import MapStyle from "../MapStyle.json";
import Header from "../components/Header";

const deltas = {
  latitudeDelta: 0.522,
  longitudeDelta: 0.3421,
};

export default class Map extends Component {
  state = {
    coords: null,
  };

  handleGetDirections = (id) => {
    const data = {
      source: {
        latitude: this.props.location.latitude,
        longitude: this.props.location.longitude,
      },
      destination: {
        latitude: this.props.places[id].coords.latitude,
        longitude: this.props.places[id].coords.longitude,
      },
      params: [
        {
          key: "travelmode",
          value: "driving", // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate", // this instantly initializes navigation using the given travel mode
        },
      ],
    };

    getDirections(data);
  };

  getDistance = (place) => {
    const { location } = this.props;
    const dist =
      getPreciseDistance(
        {
          latitude: get(location, "coords.latitude", null),
          longitude: get(location, "coords.longitude", null),
        },
        {
          latitude: get(place, "coords.latitude", null),
          longitude: get(place, "coords.longitude", null),
        }
      ) / 1000;
    return dist;
  };

  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker
        key={i}
        title={place.name}
        coordinate={place.coords}
        onCalloutPress={() => this.handleGetDirections(i)}
        pinColor="#0dafd2"
      >
        <Callout tooltip>        
            <View style={styles.bubble}>
            <View style={styles.calloutImg}>
              <Text syle={{display: "block"}}><Image
                    source={place.image}
                    resizeMode="cover"
                    style={styles.calloutImg}
                  /></Text>                
            </View>
              <View style={styles.restaurantInfo}>                               
                <View><Text style={styles.textName}>{place.name}</Text></View>
                <View><Text style={styles.textDistance}>Udaljenost: {this.getDistance(place)} km</Text></View>                                  
              </View>             
          </View>
        </Callout>
      </Marker>
    ));
  }

  render() {
    const { location } = this.props;
    const region = {
      latitude: get(location, "coords.latitude", null),
      longitude: get(location, "coords.longitude", null),
      ...deltas,
    };
    if (!region.latitude || !region.longitude) {
      return (
        <View
          style={{
            backgroundColor: "#191B1F",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0dafd2" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Header title={"KARTA"} />
        <MapView
          style={styles.container}
          region={region}
          showsUserLocation
          showsMyLocationButton
          customMapStyle={MapStyle}
        >
          {this.renderMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    top: 0,
    width: 1,
    backgroundColor: "black",
    height: 10,
  },
  bubble: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 250,
    height: 100
  },
  textName: {
    fontFamily: "sans-serif",
    justifyContent: "space-between",
    textAlignVertical: "top",    
    fontSize: 20,
    fontWeight: "bold"
  },
  textDistance: {
    fontFamily: "sans-serif",
    justifyContent: "space-between",
    textAlignVertical: "top",
    fontSize: 15,
  },
  restaurantInfo: {
    flexDirection: "column",
    width: 100
  },
  calloutImg: {
    width: 100,
    height: 100, 
  },
});
