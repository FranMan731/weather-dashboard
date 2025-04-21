import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/contexts/StoreContext";
import { Text } from "@/components/texts/Text";
import { WeatherItem } from "@/components/Item/WeatherItem";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme } from "@/theme/darkTheme";

const FavoritesScreen = observer(() => {
  const { favoriteStore } = useStore();
  const theme = useTheme();
  const styles = createStyles(theme);

  if (favoriteStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (favoriteStore.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading favorites</Text>
      </View>
    );
  }

  if (favoriteStore.favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet</Text>
        <Text style={styles.emptySubtext}>
          Search and save locations to see them here
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={favoriteStore.favorites}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={favoriteStore.loading}
              onRefresh={() => favoriteStore.refreshFavorites()}
              colors={[theme.colors.primary]}
            />
          }
          renderItem={({ item }) => (
            <WeatherItem weatherData={item.data} style={styles.item} />
          )}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
});

const createStyles = (theme: typeof darkTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.body.fontSize,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.m,
      backgroundColor: theme.colors.background,
    },
    emptyText: {
      ...theme.typography.h3,
      color: theme.colors.text,
      marginBottom: theme.spacing.s,
      textAlign: "center",
    },
    emptySubtext: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: "center",
      maxWidth: "80%",
    },
    listContent: {
      padding: theme.spacing.s,
    },
    item: {
      marginBottom: theme.spacing.s,
    },
  });

export default FavoritesScreen;
