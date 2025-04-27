import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: -2,
    marginBottom: 10,
    marginTop: 2,
  },

  cardContainer: {
    width: "100%",
    backgroundColor: Colors.dark.backgroundCard,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginTop: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  completedCardContainer: {
    backgroundColor: Colors.dark.backgroundCard,
    opacity: 0.8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },

  //Buttons Section
  button: {
    backgroundColor: Colors.dark.backgroundCard,
    borderRadius: 5,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonMark: {
    backgroundColor: "#16c571",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  completedButton: {
    backgroundColor: Colors.dark.backgroundCard,
  },

  //Names Section
  nameContainer: {
    height: "100%",
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: Colors.dark.backgroundCard,
  },
  completedName: {
    textDecorationLine: "line-through",
    fontWeight: "300",
    fontSize: 16,
    color: "#8a8a8a",
  },
  completedContainer: {
    backgroundColor: "#1f1f1f",
  },

  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  timeLeftText: {
    fontSize: 12,
    color: "#0a7ea4",
    marginTop: 2,
  },
});
