import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import LatestSearches from "./components/LatestSearches";
import { useStore } from "@/stores/storeContext";
import { getLocationErrorText } from "@/utils/location.utils";

const SearchScreen = () => {
  const {
    weatherStore: {
      isSearching,
      searchText,
      searchWeather,
      setSearchText,
      searchByCurrentPosition,
      error,
    },
  } = useStore();

  const handleSearch = () => {
    searchWeather();
  };

  const handleCurrentPositionSearch = () => {
    searchByCurrentPosition();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Weather Search</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter city or location"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          <Pressable
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.buttonPressed,
              isSearching && styles.buttonDisabled,
            ]}
            onPress={handleSearch}
            disabled={isSearching}
          >
            <Ionicons
              name="search"
              size={20}
              color={
                isSearching
                  ? styles.disabledIcon.color
                  : styles.activeIcon.color
              }
            />
          </Pressable>
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.linkButton,
              pressed && styles.linkButtonPressed,
              isSearching && styles.buttonDisabled,
            ]}
            onPress={handleCurrentPositionSearch}
            disabled={isSearching}
          >
            <Ionicons
              name="navigate"
              size={18}
              color={
                isSearching ? styles.disabledIcon.color : styles.linkText.color
              }
            />
            <Text style={styles.linkText}>
              {isSearching ? "Searching..." : "Current Position"}
            </Text>
          </Pressable>
        </View>

        {error && (
          <Text style={styles.errorText}>
            {error.message.includes("location")
              ? getLocationErrorText(error)
              : error.message}
          </Text>
        )}
      </SafeAreaView>
    </View>
  );
};

export default SearchScreen;
