import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  AsyncStorage,
  Keyboard,
} from "react-native";
import { Text, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

const AddTodo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos != null) loadTodo();
  });

  const updateAsyncStorage = async (todos) => {
    try {
      await AsyncStorage.removeItem("todos");
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      alert(err);
    }
  };
  const addTodo = async () => {
    if (value.length <= 0) return;
    try {
      Keyboard.dismiss();
      todos.push({
        text: value,
        key: Math.random().toString(),
        checked: false,
      });
      loadTodo();
      await updateAsyncStorage(todos);
    } catch (err) {
      alert(err);
    }
  };
  const loadTodo = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if (todos && todos.length > 0) {
        setTodos(JSON.parse(todos));
      }
    } catch (err) {
      alert(err);
    }
  };
  const removeTodo = (id) => {
    try {
      todos.map(async (todo, i) => {
        if (todo.key == id) {
          todos.splice(i, 1);
          await updateAsyncStorage(todos);
          setTodos(todos);
        }
      });
    } catch (err) {
      alert(err);
    }
  };

  // added timeout to prevent onPress() spam
  const checkedTodo = (id) => {
    setTimeout(() => {
      try {
        todos.map(async (todo, i) => {
          if (todo.key == id) {
            todo.checked = !todo.checked;
            await updateAsyncStorage(todos);
            setTodos(todos);
          }
        });
      } catch (err) {
        alert(err);
      }
    }, 300);
  };
  return (
    <View style={styles.container}>
      <Header title={"ZADACI"} />
      <View style={styles.todoList}>
        <SafeAreaView>
          <FlatList
            style={styles.todoList}
            data={todos}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.taskWrapper}>
                <TouchableOpacity onPress={() => checkedTodo(item.key)}>
                  <MaterialCommunityIcons
                    name={
                      item.checked
                        ? "check-circle"
                        : "checkbox-blank-circle-outline"
                    }
                    size={25}
                    color={item.checked ? "#0dca6f" : "#7c8396"}
                  />
                </TouchableOpacity>
                <View>
                  <Text
                    style={styles.taskText}
                    style={
                      item.checked
                        ? {
                            textDecorationLine: "line-through",
                            color: "#c0c7d8",
                            fontSize: 17,
                          }
                        : {
                            textDecorationLine: "none",
                            color: "#c0c7d8",
                            fontSize: 17,
                          }
                    }
                  >
                    {item.text}
                  </Text>
                </View>
                <AntDesign
                  name="delete"
                  size={25}
                  color="#7c8396"
                  onPress={() => removeTodo(item.key)}
                />
              </View>
            )}
          />
        </SafeAreaView>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 0, width: 400 }}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={(value) => setValue(value)}
          placeholder={"Unesite novi zadatak..."}
          placeholderTextColor="#9ba2b5"
          value={value}
        />
      </View>
      <View style={{ position: "absolute", bottom: 25, right: 5 }}>
        <LinearGradient
          colors={["#0dafd2", "#0dafd2", "#0dafd2"]}
          style={styles.linearGrad}
        >
          <TouchableOpacity onPress={() => addTodo()}>
            <AntDesign name="plus" size={35} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};
export default AddTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191B1F",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  itemContainer: {
    paddingVertical: 32,
    paddingHorizontal: 0,
    borderRadius: 6,
    marginHorizontal: 0,
    alignItems: "center",
    width: 200,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 18,
  },
  textInput: {
    fontSize: 17.5,
    padding: 20,
    backgroundColor: "#131518",
    borderRightWidth: 0,
    borderColor: "black",
    color: "#BBBDBF",
  },
  taskWrapper: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    borderColor: "black",
    borderBottomWidth: 0.5,
    width: 350,
    justifyContent: "space-between",
    minHeight: 40,
  },
  task: {
    paddingLeft: 0,
    marginTop: 6,
    fontSize: 17,
    fontWeight: "bold",
    color: "#7c8396",
  },
  taskText: {
    paddingLeft: 0,
    marginTop: 6,
    fontSize: 17,
    fontWeight: "bold",
  },
  verticalLine: {
    textDecorationLine: "line-through",
  },
  todoList: {
    flex: 1,
    marginTop: 0,
  },
  linearGrad: {
    padding: 17,
    borderRadius: 50,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});
