import React, { useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { WeatherResponse } from "@/types/weather";
import { darkTheme } from "@/theme/darkTheme";
import { observer } from "mobx-react-lite";
import { useStore } from "@/contexts/StoreContext";
import { Ionicons } from "@expo/vector-icons";

interface WeatherItemProps {
  weatherData: WeatherResponse;
  style?: ViewStyle;
}

export const WeatherItem: React.FC<WeatherItemProps> = observer(
  ({ weatherData, style }) => {
    const theme = useTheme();
    const { favoriteStore } = useStore();
    const styles = createStyles(theme);
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const formatTemp = (temp: number) => `${Math.round(temp)}°C`;

    const weatherIcon = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@4x.png`;

    const toggleFavorite = useCallback(async () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      if (favoriteStore?.isFavorite(weatherData.id)) {
        try {
          await favoriteStore.removeFavorite(weatherData.id);
        } catch (error) {
          console.error("Error removing favorite:", error);
        }
        return;
      }

      debounceTimeout.current = setTimeout(async () => {
        try {
          await favoriteStore?.addFavorite(weatherData);
        } catch (error) {
          console.error("Error adding favorite:", error);
        }
      }, 300);
    }, [favoriteStore, weatherData]);

    useEffect(() => {
      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, []);

    return (
      <View style={[styles.container, style]}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {weatherData.name}, {weatherData.sys.country}
            </Text>
            <TouchableOpacity
              onPress={toggleFavorite}
              disabled={favoriteStore?.loading}
              style={styles.favoriteButton}
            >
              {favoriteStore?.loading ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Ionicons
                  name={
                    favoriteStore?.isFavorite(weatherData.id)
                      ? "heart"
                      : "heart-outline"
                  }
                  size={24}
                  color={
                    favoriteStore?.isFavorite(weatherData.id)
                      ? theme.colors.error
                      : theme.colors.textSecondary
                  }
                />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.descriptionText}>
            {weatherData.weather[0].description}
          </Text>
        </View>

        <View style={styles.mainInfo}>
          <Image
            source={{ uri: iconUrl }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text style={styles.temperatureText}>
            {formatTemp(weatherData.main.temp)}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Thermal sensation</Text>
            <Text style={styles.detailValue}>
              {formatTemp(weatherData.main.feels_like)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Humidity</Text>
            <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Wind</Text>
            <Text style={styles.detailValue}>{weatherData.wind.speed} m/s</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Pressure</Text>
            <Text style={styles.detailValue}>
              {weatherData.main.pressure} hPa
            </Text>
          </View>
        </View>
      </View>
    );
  }
);

const createStyles = (theme: typeof darkTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.large,
      padding: theme.spacing.m,
      margin: theme.spacing.s,
      shadowColor: theme.colors.overlay,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      marginBottom: theme.spacing.m,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      paddingBottom: theme.spacing.s,
    },
    locationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    locationText: {
      ...theme.typography.h2,
      color: theme.colors.text,
      textAlign: "center",
      flex: 1,
    },
    favoriteButton: {
      padding: theme.spacing.s,
    },
    descriptionText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: "center",
      textTransform: "capitalize",
    },
    mainInfo: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: theme.spacing.m,
    },
    weatherIcon: {
      width: 100,
      height: 100,
    },
    temperatureText: {
      ...theme.typography.h1,
      color: theme.colors.text,
      marginLeft: theme.spacing.m,
    },
    detailsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: theme.spacing.m,
    },
    detailItem: {
      width: "48%",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.borderRadius.medium,
      padding: theme.spacing.s,
      marginBottom: theme.spacing.s,
    },
    detailLabel: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.xs,
    },
    detailValue: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
  });