import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const MediaAnalytics = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chat, setChats } = route.params;

  const [searchTitleSymptoms, setTitleSymptoms] = useState(
    chat ? chat.titleSymptoms : ""
  );
  const [searchTitlePreparats, setTitlePreparats] = useState(
    chat ? chat.titlePreparats : ""
  );
  const [searchTextPreparats, setSearchTextPreparats] = useState(
    chat ? chat.contentSymptoms : "Деф"
  );
  const [searchTextSymptoms, setSearchTextSymptoms] = useState(
    chat ? chat.contentSymptoms : "Деф"
  );
  const [activeTab, setActiveTab] = useState(
    chat ? chat.activeTab : "symptoms"
  );
  const [isChatCreated, setIsChatCreated] = useState(!!chat);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const addNewChat = () => {
    const updatedChat = {
      id: chat ? chat.id : Date.now().toString(),
      titleSymptoms: searchTitleSymptoms,
      titlePreparats: searchTitlePreparats,
      contentSymptoms: searchTextPreparats,
      contentPreparats: searchTextSymptoms,
      activeTab,
    };
    if (!isChatCreated) {
      setChats((prevChats) =>
        chat
          ? prevChats.map((existingChat) =>
              existingChat.id === chat.id ? updatedChat : existingChat
            )
          : [...prevChats, updatedChat]
      );
    }
    setIsChatCreated(true);
    Keyboard.dismiss();
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#007bff" }} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <Text style={styles.backButtonText}>{"< Back"} </Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>Медичний помічник</Text>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "symptoms" && styles.activeTab,
                ]}
                onPress={() => toggleTab("symptoms")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "symptoms" && styles.tabTextActive,
                  ]}
                >
                  Симптоми
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "medications" && styles.activeTab,
                ]}
                onPress={() => toggleTab("medications")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "medications" && styles.tabTextActive,
                  ]}
                >
                  Препарати
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              {activeTab === "symptoms" ? (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Введіть симптоми"
                  value={searchTitleSymptoms}
                  onChangeText={setTitleSymptoms}
                  onSubmitEditing={addNewChat}
                />
              ) : (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Введіть препарати"
                  value={searchTitlePreparats}
                  onChangeText={setTitlePreparats}
                  onSubmitEditing={addNewChat}
                />
              )}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={addNewChat}
              >
                <Text style={styles.searchIcon}>🔍</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content}>
            {activeTab === "symptoms" ? (
              <Text>{searchTextSymptoms}</Text>
            ) : (
              <Text>{searchTextPreparats}</Text>
            )}
          </ScrollView>
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
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 25,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#0066cc",
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#007bff",
    fontWeight: "bold",
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
});

export default MediaAnalytics;
