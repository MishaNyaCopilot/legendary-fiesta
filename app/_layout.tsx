import "../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SubscriptionProvider } from "../context/SubscriptionContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SubscriptionProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </SubscriptionProvider>
    </SafeAreaProvider>
  );
}