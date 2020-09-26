import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';


const Header = (props) => {
    
    return (
        <View style={styles.header}>
            <View>
                <Text style={{ fontSize: 20, top: 10, color: '#c0c7d8'}}>
                    {props.title}
                </Text>
            </View>
        </View>

    )

}

export default Header;

const styles = StyleSheet.create({
    header: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#30343e',
        width: '100%',
        padding: 40,
    }
});