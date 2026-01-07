import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import { useSubscription } from "../context/SubscriptionContext";

export default function HomeScreen() {
  const { isSubscribed } = useSubscription();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    if (!isSubscribed) {
      router.replace("/paywall");
    }
  }, [isSubscribed, rootNavigationState?.key]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-4">ZenPulse</Text>
      <Text className="text-gray-500 mb-8">AI Meditation App</Text>
    </View>
  );
}
