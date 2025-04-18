import { AppProviders } from "@/AppProviders";
import RootNavigator from "@/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AppProviders>
        <RootNavigator />
      </AppProviders>
    </NavigationContainer>
  );
}
