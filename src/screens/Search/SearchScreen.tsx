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
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";

const SearchScreen = observer(() => {
  const { weatherStore } = useStore();
  const theme = useTheme();
  const styles = useSearchScreenStyles();
  const [searchText, setSearchText] = useState(weatherStore.searchText);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce implementation
  const handleDebouncedSearch = useCallback(
    (text: string) => {
      // Clear any existing timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      
      // Set a new timeout
      debounceTimeout.current = setTimeout(() => {
        weatherStore.setSearchText(text);
      }, 500);
    },
    [weatherStore]
  );

  // Update local state and execute debounced search
  const handleTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      handleDebouncedSearch(text);
    },
    [handleDebouncedSearch]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  // Memoize search function
  const handleSearch = useCallback(() => {
    weatherStore.searchWeather();
  }, [weatherStore]);

  // Memoize current position search function
  const handleCurrentPositionSearch = useCallback(async () => {
    await weatherStore.searchByCurrentPosition();
  }, [weatherStore]);

  // Memoize error message
  const errorMessage = useMemo(() => {
    if (!weatherStore.error) return null;
    return weatherStore.error.message.includes("location")
      ? getLocationErrorText(weatherStore.error)
      : weatherStore.error.message;
  }, [weatherStore.error]);

  // Memoize WeatherItem component to avoid unnecessary rerenders
  const weatherItem = useMemo(() => {
    if (!weatherStore.weatherData || weatherStore.error) return null;
    return <WeatherItem weatherData={weatherStore.weatherData} />;
  }, [weatherStore.weatherData, weatherStore.error]);

  // Memoize skeleton loader
  const weatherSkeleton = useMemo(
    () => (
      <View style={styles.weatherItemContainer}>
        <WeatherItemSkeleton />
      </View>
    ),
    [styles.weatherItemContainer]
  );

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
              value={searchText}
              onChangeText={handleTextChange}
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
              onPress={handleCurrentPositionSearch}
              disabled={weatherStore.isSearching}
              icon="navigate"
              style={styles.locationButton}
            >
              Current Position
            </LinkButton>
          </View>

          <RecentSearches />

          {weatherStore.error && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          {weatherStore.isSearching
            ? weatherSkeleton
            : weatherItem && (
                <View style={styles.weatherItemContainer}>{weatherItem}</View>
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