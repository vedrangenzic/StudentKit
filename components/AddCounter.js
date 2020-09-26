import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, AsyncStorage } from "react-native";
import {
  Keyboard,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";

const AddCounter = () => {
  const [value, setValue] = useState("");
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    if (counters != null) loadCounters();
  });

  const updateAsyncStorage = async (counters) => {
    try {
      await AsyncStorage.removeItem("counters");
      await AsyncStorage.setItem("counters", JSON.stringify(counters));
    } catch (err) {
      alert(err);
    }
  };

  const addCounter = async () => {
    if (value.length <= 0) return;

    try {
      Keyboard.dismiss();
      counters.push({ text: value, key: Math.random().toString(), count: 0 });
      await updateAsyncStorage(counters);
      loadCounters();
    } catch (err) {
      alert(err);
    }
  };
  const loadCounters = async () => {
    try {
      const counters = await AsyncStorage.getItem("counters");
      if (counters && counters.length > 0) {
        setCounters(JSON.parse(counters));
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteCounter = (id) => {
    Alert.alert(
      "Delete",
      "Are you sure?",
      [
        {
          text: "Yes",
          onPress: () => {
            try {
              counters.map(async (counter, i) => {
                if (counter.key == id) {
                  counters.splice(i, 1);
                  await updateAsyncStorage(counters);
                  setCounters(counters);
                }
              });
            } catch (err) {
              alert(err);
            }
          },
        },
        { text: "Cancel", onPress: () => void 0, style: "cancel" },
      ],
      { cancelable: false }
    );
  };

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
    }, 300);
  };
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
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Header title={"DOLAZNOST"} />
      <View style={styles.todoList}>
        <SafeAreaView>
          <FlatList
            style={styles.todoList}
            data={counters}
            renderItem={({ item }) => (
              <TouchableOpacity onLongPress={() => deleteCounter(item.key)}>
                <View style={styles.taskWrapper}>
                  <View style={styles.content}>
                    <Text style={styles.counterText}>{item.text}</Text>
                  </View>
                  <View style={styles.countWrapper}>
                  <TouchableOpacity onPress={() => decrementCount(item.key)}>
                      <AntDesign name={"minuscircleo"} size={20} color="#7c8396" />
                    </TouchableOpacity>                   
                    <Text style={styles.count}> {item.count}</Text>
                    <TouchableOpacity onPress={() => incrementCount(item.key)}>
                      <AntDesign name={"pluscircleo"} size={20} color="#7c8396" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
        </SafeAreaView>
      </View>
      <View style={{ position: "absolute", bottom: 0, left: 0, width: 400 }}>
        <TextInput
          style={styles.textInput}
          multiline={true}
          onChangeText={(value) => setValue(value)}
          placeholder={"Unesite naziv kolegija..."}
          placeholderTextColor="#9ba2b5"
          value={value}
        />
      </View>
      <View style={{ position: "absolute", bottom: 25, right: 5 }}>
        <LinearGradient
          colors={["#0dafd2", "#0dafd2", "#0dafd2"]}
          style={styles.linearGrad}
        >
          <TouchableOpacity onPress={() => addCounter()}>
            <AntDesign name="plus" size={35} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};
export default AddCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191B1F",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  taskWrapper: {
    padding: 20,
    flexDirection: "row",
    borderColor: "black",
    borderBottomWidth: 0.5,
    width: 350,
    justifyContent: "space-between",
    minHeight: 40,
  },
  counterText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7c8396",
  },
  count: {
    fontSize: 40,
    paddingRight: 7,
    fontWeight: "bold",
    color: "#7c8396",
  },
  textInput: {
    fontSize: 17.5,
    padding: 20,
    backgroundColor: "#131518",
    borderRightWidth: 0,
    borderColor: "black",
    color: "#BBBDBF",
  },
  todoList: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    maxWidth: 200,
  },
  countWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linearGrad: {
    padding: 17,
    borderRadius: 50,
    position: "absolute",
    bottom: 8,
    right: 8,
  },
});
