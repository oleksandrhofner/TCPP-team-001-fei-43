import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MediaAnalytics from "./components/MediaAnalytics";
import HistoryOfChats from "./components/historyOfChat";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HistoryOfChats"
          component={HistoryOfChats}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="MediaAnalytics"
          component={MediaAnalytics}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default App;
