import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
    marginTop: -30,
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "#a1a1a1",
  },
  form: {
    marginTop: 0,
    flexDirection: "row",
    width: "100%",
  },
  input: {
    height: 50,
    borderRadius: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: "85%",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#262626",
    color: "white",
  },
  button: {
    backgroundColor: "#0a7ea4",
    marginLeft: 1,
    borderRadius: 6,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "normal",
  },
  listEmptyText: {
    color: "#b5b5b5",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  listItem: {
    width: "100%",
    marginBottom: 10,
  },
});
