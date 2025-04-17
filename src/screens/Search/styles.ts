import { Platform, StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
    paddingTop: Platform.OS === 'android' && StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#f0f0f0",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#f0f0f0",
    paddingHorizontal: 10,
  },
  searchButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    marginLeft: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  linkButtonPressed: {
    opacity: 0.7,
  },
  linkText: {
    color: "#3b82f6",
    fontSize: 16,
    marginLeft: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  disabledIcon: {
    color: "#666",
  },
  activeIcon: {
    color: "#f0f0f0",
  },
  errorText: {
    color: '#ff4444',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  permissionText: {
    color: '#ff8800',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});