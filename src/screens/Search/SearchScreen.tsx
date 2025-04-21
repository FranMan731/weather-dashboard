import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@/contexts/StoreContext";
import { getLocationErrorText } from "@/utils/location.utils";
import { useStyles } from "@/hooks/useStyles";
import { TextInputWithIcon } from "@/components/inputs";
import { PrimaryButton, LinkButton } from "@/components/buttons";
import { Text } from "@/components/texts/Text";
import { useTheme } from "@/contexts/ThemeContext";
import { WeatherItem } from "@/components/Item/WeatherItem";
import { observer } from "mobx-react-lite";
import { RecentSearches } from "./components/RecentSearches";
import { WeatherItemSkeleton } from "@/components/skeletons/WeatherItemSkeleton";

const SearchScreen = observer(() => {
  const { weatherStore } = useStore();

  const styles = useSearchScreenStyles();

  const handleSearch = () => {
    weatherStore.searchWeather();
  };

  const handleCurrentPositionSearch = async () => {
    await weatherStore.searchByCurrentPosition();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title} variant="h2">
            Weather Search
          </Text>

          <View style={styles.inputContainer}>
            <TextInputWithIcon
              iconName="search"
              placeholder="Enter city or location"
              value={weatherStore.searchText}
              onChangeText={(text) => {
                weatherStore.setSearchText(text);
              }}
              style={styles.input}
              editable={!weatherStore.isSearching}
              iconPosition="right"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <PrimaryButton
              onPress={handleSearch}
              disabled={weatherStore.isSearching}
              isLoading={weatherStore.isSearching}
              style={styles.searchButton}
              title={weatherStore.isSearching ? "Searching..." : "Search"}
            />

            <LinkButton
              onPress={() => handleCurrentPositionSearch()}
              disabled={weatherStore.isSearching}
              icon="navigate"
              style={styles.locationButton}
            >
              Current Position
            </LinkButton>
          </View>

          <RecentSearches />

          {weatherStore.error && (
            <Text style={styles.errorText}>
              {weatherStore.error.message.includes("location")
                ? getLocationErrorText(weatherStore.error)
                : weatherStore.error.message}
            </Text>
          )}

          {weatherStore.isSearching ? (
            <View style={styles.weatherItemContainer}>
              <WeatherItemSkeleton />
            </View>
          ) : (
            weatherStore.weatherData &&
            !weatherStore.error && (
              <View style={styles.weatherItemContainer}>
                <WeatherItem weatherData={weatherStore.weatherData} />
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const useSearchScreenStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.m,
      paddingTop: theme.spacing.xxl,
      paddingBottom: theme.spacing.m,
    },
    title: {
      color: theme.colors.text,
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
      marginBottom: theme.spacing.xxl,
      textAlign: "center",
    },
    inputContainer: {
      marginBottom: theme.spacing.xs,
      paddingHorizontal: 10,
    },
    input: {
      width: "100%",
    },
    buttonsContainer: {
      gap: theme.spacing.s,
      paddingHorizontal: 10,
      marginBottom: theme.spacing.m,
    },
    searchButton: {
      width: "100%",
    },
    locationButton: {
      alignSelf: "center",
    },
    errorText: {
      color: theme.colors.error,
      textAlign: "center",
      marginTop: theme.spacing.m,
      paddingHorizontal: theme.spacing.m,
    },
    weatherItemContainer: {
      marginTop: theme.spacing.m,
    },
  });
};

export default SearchScreen;
