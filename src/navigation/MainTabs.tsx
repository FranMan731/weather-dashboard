import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from '@/screens/Search/SearchScreen';
import FavoritesScreen from '@/screens/Favorites/FavoritesScreen';
import { TabIconProps } from '@/types/navigation';

const Tab = createBottomTabNavigator();
type TabRouteName = 'Search' | 'Favorites';

const TabIcon = ({ routeName, focused, color, size }: TabIconProps) => {
    switch (routeName) {
      case 'Search':
        return <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />;
      case 'Favorites':
        return <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />;
      default:
        return null;
    }
  };

export default function MainTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, size}) => (
                <TabIcon routeName={route.name} focused={navigation.isFocused()} color={color} size={size} />
              ),
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    );
  }