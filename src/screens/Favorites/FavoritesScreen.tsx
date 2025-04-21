import React from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl, SafeAreaView } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/contexts/StoreContext";
import { Text } from "@/components/texts/Text";
import { WeatherItem } from "@/components/Item/WeatherItem";
import { useTheme } from "@/contexts/ThemeContext";
import { WeatherItemSkeleton } from "@/components/skeletons/WeatherItemSkeleton";

const FavoritesScreen = observer(() => {
  const { favoriteStore } = useStore();
  const theme = useTheme();
  const styles = createStyles(theme);

  if (!favoriteStore) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>
          Favorites will be available after signing in
        </Text>
      </View>
    );
  }

  if (favoriteStore.loading && favoriteStore.favorites.length === 0) {
    return <WeatherItemSkeleton />;
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
      <View style={styles.container}>
        <Text style={styles.messageText}>No favorites yet</Text>
        <Text style={styles.subMessageText}>
          Save locations to see them here
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
            tintColor={theme.colors.primary}
          />
        }
        renderItem={({ item }) => (
          <WeatherItem 
            weatherData={item.data} 
            style={styles.item}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
    </SafeAreaView>
  );
});

const createStyles = (theme: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  messageText: {
    ...theme.typography.h4,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    textAlign: 'center',
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
  subMessageText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  listContent: {
    padding: theme.spacing.s,
  },
  item: {
    marginBottom: theme.spacing.s,
  },
});

export default FavoritesScreen;