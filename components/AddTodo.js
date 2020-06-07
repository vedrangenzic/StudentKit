import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Button, Modal, AsyncStorage, Keyboard } from 'react-native';
import { Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import data from '../TempData';
import { LinearGradient } from 'expo-linear-gradient';

const AddTodo = () => {
    const [value, setValue] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        loadTodo();
    });

    const updateAsyncStorage = async (todos) => {

        return new Promise(async (resolve, reject) => {

            try {

                await AsyncStorage.removeItem('todos');
                await AsyncStorage.setItem('todos', JSON.stringify(todos));
                return resolve(true);

            } catch (e) {
                return reject(e);
            }

        });

    }

    const addTodo = async () => {

        if (value.length <= 0)
            return;

        try {

            todos.push({ text: value, key: Math.random().toString(), checked: false });
            await updateAsyncStorage(todos);


        } catch (err) {

            console.log(err);

        }

    }
    const loadTodo = async () => {
        try {

            const todos = await AsyncStorage.getItem('todos');
            if (todos && todos.length > 0) {
                setTodos(JSON.parse(todos))

            }

        } catch (err) {

            console.log(err)

        }
    }
    const removeTodo = (id) => {
        try {
            todos.map( async (todo, i) => {
            
            if(todo.key == id){
            let index = todos.indexOf(todo);
            todos.splice(index, 1)
            await updateAsyncStorage(todos);
            setTodos(todos);



            }
            });



        } catch (err) {
            alert(err);

        }
    }


    const handleAddTodo = () => {
        if (value.length > 0) {
            setTodos([{ text: value, key: todos.length.toString(), checked: false }, ...todos])
            setValue('')
        }
    }

    const handleDeleteTodo = (id) => {
        setTodos(
            todos.filter((todo) => {
                if (todo.key !== id) return true
            })
        )
    }

    const handleChecked = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.key === id) todo.checked = !todo.checked;
                return todo;
            })
        )
    }

    return (

        <View style={styles.container}>
            <View style={styles.todoList}>
                <SafeAreaView >
                    <FlatList
                        style={styles.todoList}
                        data={todos}
                        renderItem={({ item }) =>
                            <View style={styles.taskWrapper}>
                                <TouchableOpacity onPress={() => handleChecked(item.key)}>
                                    <Entypo
                                        name={item.checked ? "circle-with-plus" : "circle"}
                                        size={30}
                                        color="#BB350F"
                                        style={{ marginLeft: 15 }}
                                    />
                                </TouchableOpacity>

                                <View>
                                    {item.checked && <View style={styles.verticalLine}></View>}
                                    <Text style={styles.task}>{item.text}</Text>
                                </View>
                                <AntDesign
                                    name="closesquare"
                                    size={30}
                                    color="#BB350F"
                                    style={{ marginLeft: 25 }}
                                    onPress={() => removeTodo(item.key)}
                                />
                            </View>}
                        keyExtractor={item => item.key}
                    />
                </SafeAreaView>
            </View>

            <View style={{ position: 'absolute', bottom: 0, left: 0, width: 400 }}>
                <TextInput
                    style={{ padding: 30, backgroundColor: '#191B1F', borderRightWidth: 0, borderColor: 'black', color: "#BBBDBF" }}
                    multiline={true}
                    onChangeText={(value) => setValue(value)}
                    placeholder={'Add new task here...'}
                    placeholderTextColor="#BBBDBF"
                    value={value}
                />
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <LinearGradient
                    colors={['#BB350F', '#EE540F', '#DD4E0C']}
                    style={{ padding: 17, borderRadius: 50, position: 'absolute', bottom: 8, right: 8 }}
                >
                    <TouchableOpacity onPress={() => addTodo()}>
                        <AntDesign name="plus" size={35} color="white" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

        </View>
    )
}
export default AddTodo;

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
    }


})