import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@/components/texts/Text';
import { useTheme } from '@/contexts/ThemeContext';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/contexts/StoreContext';
import { Ionicons } from '@expo/vector-icons';

export const RecentSearches = observer(() => {
  const { weatherStore } = useStore();
  const theme = useTheme();
  
  const styles = createStyles(theme);

  const handleSearchAgain = (search: string) => {
    weatherStore.setSearchText(search);
    weatherStore.searchWeather();
  };

  const handleClearHistory = async () => {
    try {
      await weatherStore.clearRecentSearches();
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  if (weatherStore.recentSearches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={handleClearHistory}>
          <Ionicons name="trash-outline" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={weatherStore.recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.searchItem} 
            onPress={() => handleSearchAgain(item)}
          >
            <Text style={styles.searchText}>{item}</Text>
            <Ionicons name="search" size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  title: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body.fontSize,
  },
  listContent: {
    paddingHorizontal: theme.spacing.s,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.medium,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginRight: theme.spacing.s,
  },
  searchText: {
    color: theme.colors.text,
    marginRight: theme.spacing.s,
  },
});