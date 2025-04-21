import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { darkTheme } from '@/theme/darkTheme';

export const WeatherItemSkeleton = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const shimmerAnim = new Animated.Value(0);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const ShimmerPlaceholder = ({ style }: { style: any }) => (
    <View style={[style, { overflow: 'hidden' }]}>
      <View style={[style, { backgroundColor: theme.colors.surfaceVariant }]} />
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShimmerPlaceholder style={styles.locationPlaceholder} />
        <ShimmerPlaceholder style={styles.favoriteButtonPlaceholder} />
      </View>
      <ShimmerPlaceholder style={styles.descriptionPlaceholder} />
      
      <View style={styles.mainInfo}>
        <ShimmerPlaceholder style={styles.iconPlaceholder} />
        <ShimmerPlaceholder style={styles.tempPlaceholder} />
      </View>

      <View style={styles.detailsContainer}>
        {[1, 2, 3, 4].map((item) => (
          <ShimmerPlaceholder key={item} style={styles.detailItemPlaceholder} />
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: typeof darkTheme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.large,
    padding: theme.spacing.m,
    margin: theme.spacing.s,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  locationPlaceholder: {
    height: 24,
    width: '60%',
    borderRadius: theme.borderRadius.small,
  },
  favoriteButtonPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  descriptionPlaceholder: {
    height: 16,
    width: '40%',
    alignSelf: 'center',
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.m,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.m,
  },
  iconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: theme.borderRadius.medium,
  },
  tempPlaceholder: {
    height: 40,
    width: 80,
    borderRadius: theme.borderRadius.medium,
    marginLeft: theme.spacing.m,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: theme.spacing.m,
  },
  detailItemPlaceholder: {
    width: '48%',
    height: 60,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.s,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});