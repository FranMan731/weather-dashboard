import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "@/contexts/StoreContext";
import { getLocationErrorText } from "@/utils/location.utils";
import { useStyles } from "@/hooks/useStyles";
import { TextInputWithIcon } from "@/components/inputs";
import { PrimaryButton, LinkButton } from "@/components/buttons";
import { Text } from "@/components/texts/Text";
import { useTheme } from "@/contexts/ThemeContext";

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

  const styles = useSearchScreenStyles();

  const handleSearch = () => {
    searchWeather();
  };

  const handleCurrentPositionSearch = () => {
    searchByCurrentPosition();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title} variant="h2">
          Weather Search
        </Text>

        <View style={styles.inputContainer}>
          <TextInputWithIcon
            iconName="search"
            placeholder="Enter city or location"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
            editable={!isSearching}
            iconPosition="right"
          />
        </View>

        <View style={styles.buttonsContainer}>
          <PrimaryButton
            onPress={handleSearch}
            disabled={isSearching}
            isLoading={isSearching}
            style={styles.searchButton}
            title={isSearching ? "Searching..." : "Search"}
          />

          <LinkButton
            onPress={handleCurrentPositionSearch}
            disabled={isSearching}
            icon="navigate"
            style={styles.locationButton}
          >
            Current Position
          </LinkButton>
        </View>

        {error && (
          <Text style={styles.errorText}>
            {error.message.includes("location")
              ? getLocationErrorText(error)
              : error.message}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const useSearchScreenStyles = () => {
  const theme = useTheme();
  const { create } = useStyles();

  return create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.m,
      paddingTop: theme.spacing.xxl,
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
      width: '100%',
    },
    buttonsContainer: {
      gap: theme.spacing.s,
      paddingHorizontal: 10,
    },
    searchButton: {
      width: '100%',
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
  });
};

export default SearchScreen;