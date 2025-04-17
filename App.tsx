import { AuthProvider } from "@/contexts/AuthContext";
import { ApolloProvider } from "@/contexts/ApolloContext";
import RootNavigator from "@/navigation/RootNavigator";
import { StoreProvider } from "@/stores/storeContext";

export default function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <ApolloProvider>
          <RootNavigator />
        </ApolloProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
