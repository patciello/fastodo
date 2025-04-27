import { Home } from "@/src/Home";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </>
  );
}
