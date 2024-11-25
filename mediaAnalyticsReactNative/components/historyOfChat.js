import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HistoryOfChats = () => {
  const navigation = useNavigation();

  const [chats, setChats] = useState([
    {
      id: "1",
      titleSymptoms: "Чат 1",
      titlePreparats: "",
      contentSymptoms: "Це перший чат",
      contentPreparats: "Препарати",
      activeTab: "symptoms",
    },
  ]);

  const handleChatPress = (chat) => {
    navigation.navigate("MediaAnalytics", { chat, setChats });
  };

  const handleChatPressNew = (chatId) => {
    navigation.navigate("MediaAnalytics", { setChats });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#007bff" }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Медичний помічник</Text>
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchInput} placeholder="Шукати чат" />
              <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchIcon}>🔍</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content}>
            {chats.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={styles.listItem}
                onPress={() => handleChatPress(chat)}
              >
                <Text style={styles.listItemText}>
                  {chat.activeTab === "symptoms"
                    ? chat.titleSymptoms
                    : chat.titlePreparats}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => handleChatPressNew()}
          >
            <Text style={styles.floatingButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007bff",
    padding: 16,
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  content: {
    padding: 16,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  listItemText: {
    fontSize: 16,
  },
  floatingButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#ff5252",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HistoryOfChats;
