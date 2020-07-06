import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, AsyncStorage } from 'react-native';
import { Keyboard, Alert, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AddCounter = () => {
    const [value, setValue] = useState('')
    const [counters, setCounters] = useState([])
    
    useEffect(() => {
        if(counters != null)  loadCounters();
    });

    const updateAsyncStorage = async (counters) => {

        try {

            await AsyncStorage.removeItem('counters');
            await AsyncStorage.setItem('counters', JSON.stringify(counters));

        } catch (err) {
            alert(err)
        }

    }

    const addCounter = async () => {

        if (value.length <= 0)
            return;

        try {
         
            Keyboard.dismiss();
            counters.push({ text: value, key: Math.random().toString(), count: 0 });
            await updateAsyncStorage(counters);
            loadCounters();
            
        
        } catch (err) {

            alert(err);

        }

    }
    const loadCounters = async () => {
        try {

            const counters = await AsyncStorage.getItem('counters');
            if (counters && counters.length > 0) {
                setCounters(JSON.parse(counters))

            }

        } catch (err) {

            alert(err)

        }
    }
    
    const deleteCounter = (id) => {
        Alert.alert(
            'Delete',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: () => {
                        try {

                            counters.map(async (counter, i) => {

                                if (counter.key == id) {
                                    counters.splice(i, 1)
                                    await updateAsyncStorage(counters);
                                    setCounters(counters);
                                }

                            });
                        } catch (err) {
                            
                            alert(err);

                        }

                    }
                },
                { text: 'Cancel', onPress: () => void(0), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    // added timeout to prevent onPress() spam
    const incrementCount = (id) => {
        setTimeout(() => {
            try {

                counters.map(async (counter, i) => {

                    if (counter.key == id) {
                        counter.count = counter.count + 1;
                        await updateAsyncStorage(counters);
                        setCounters(counters);
                    }

                });
            } catch (err) {
                alert(err);

            }
        }, 300)
    }

    //added timeout to disable onPress() spam
    const decrementCount = (id) => {
        setTimeout(() => {

            try {

                counters.map(async (counter, i) => {

                    if (counter.key == id) {
                        counter.count = counter.count - 1;
                        await updateAsyncStorage(counters);
                        setCounters(counters);
                    }

                });
            } catch (err) {
                alert(err);

            }
        }, 300)
    }

    return (

        <View style={styles.container}>
            <View style={styles.todoList}>
                <SafeAreaView >
                    <FlatList
                        style={styles.todoList}
                        data={counters}
                        renderItem={({ item }) =>
                            <TouchableOpacity onLongPress={() => deleteCounter(item.key)}>
                                <View style={styles.taskWrapper}>
                                    <TouchableOpacity onPress={() => incrementCount(item.key)}>
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
                                    <TouchableOpacity onPress={() => decrementCount(item.key)}>
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
                    <TouchableOpacity onPress={() => addCounter()}>
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
    content: {
        justifyContent: "center"
    }
})