import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, View, Button, Modal, KeyboardAvoidingView } from 'react-native';
import { Keyboard, Alert, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import data from '../TempData';
import { LinearGradient } from 'expo-linear-gradient';

const AddCounter = () => {
    const [value, setValue] = useState('')
    const [counters, setCounters] = useState([])
    handleAddCounter = () => {
        if (value.length > 0) {
            setCounters([{ text: value, key: counters.length.toString(), count: 0 }, ...counters])
            setValue('')
        }
        Keyboard.dismiss()
    }

    handleDeleteCounter = (id) => {
        Alert.alert(
            'Delete',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: () => setCounters(
                        counters.filter((counter) => {
                            if (counter.key !== id) return true
                        })
                    )
                },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
        setCounters(
            counters.filter((counter) => {
                if (counter.key !== id) return true
            })
        )
    }

    handleCount = (id) => {
        setCounters(
            counters.map((counter) => {
                if (counter.key === id) counter.count = counter.count + 1;
                return counter;
            })
        )
    }
    handleDecrement = (id) => {
        setCounters(
            counters.map((counter) => {
                if (counter.key === id) counter.count = counter.count - 1;
                return counter;
            })
        )
    }
    return (

        <View style={styles.container}>
            <View style={styles.todoList}>
                <SafeAreaView >
                    <FlatList
                        style={styles.todoList}
                        data={counters}
                        renderItem={({ item }) =>
                            <TouchableOpacity onLongPress={() => handleDeleteCounter(item.key)}>
                                <View style={styles.taskWrapper}>
                                    <TouchableOpacity onPress={() => handleCount(item.key)}>
                                        <Entypo
                                            name={"plus"}
                                            size={30}
                                            color="#BB350F"
                                            style={{ marginLeft: 15 }}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.content}>
                                        <Text style={styles.task}>{item.text}</Text>
                                        <Text style={styles.count}> {item.count}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDecrement(item.key)}>
                                        <Entypo
                                            name={"minus"}
                                            size={30}
                                            color="#BB350F"
                                            style={{ marginLeft: 25 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>}
                        keyExtractor={item => item.key}
                    />
                </SafeAreaView>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, width: 400 }}>
                <TextInput
                    style={{ padding: 30, backgroundColor: '#191B1F', borderRightWidth: 0, borderColor: 'black', color: "#BBBDBF" }}
                    multiline={true}
                    onChangeText={(value) => setValue(value)}
                    placeholder={'Add new class here...'}
                    placeholderTextColor="#BBBDBF"
                    value={value}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <LinearGradient
                    colors={['#BB350F', '#EE540F', '#DD4E0C']}
                    style={{ padding: 17, borderRadius: 50, position: 'absolute', bottom: 8, right: 8 }}
                >
                    <TouchableOpacity onPress={() => handleAddCounter()}>
                        <AntDesign name="plus" size={35} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}
export default AddCounter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#191B1F",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    },
    itemContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom: 18
    },
    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18

    },
    taskWrapper: {
        marginTop: 10,
        padding: 15,
        flexDirection: 'row',
        borderColor: 'black',
        borderBottomWidth: .5,
        width: 350,
        justifyContent: 'space-between',
        minHeight: 40,
    },
    task: {
        paddingLeft: 0,
        marginTop: 6,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A8A9AB',
    },
    verticalLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginLeft: -30,
        zIndex: 9999,
        width: 100,
        position: 'absolute',
        marginTop: 18
    },
    todoList: {
        flex: 1,
        marginTop: 32
    },
    count: {
        paddingLeft: 45,
        paddingTop: 2
    },
    content:{
        justifyContent: "center"
    }


})