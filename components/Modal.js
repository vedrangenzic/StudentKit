import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default class Modal extends Component{
    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={{position: "absolute", top: 64, right: 32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} />
                </TouchableOpacity>
            </KeyboardAvoidingView>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});