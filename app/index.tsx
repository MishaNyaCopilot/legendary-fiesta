import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lock, Play, Sparkles } from "lucide-react-native";
import { useSubscription } from "../context/SubscriptionContext";

const SESSIONS = [
  { id: '1', title: 'Morning Focus', duration: '5 min', isPremium: false, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800' },
  { id: '2', title: 'Deep Sleep', duration: '15 min', isPremium: true, image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&q=80&w=800' },
  { id: '3', title: 'Stress Relief', duration: '10 min', isPremium: true, image: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800' },
  { id: '4', title: 'Quick Reset', duration: '3 min', isPremium: false, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800' },
];

export default function HomeScreen() {
  const { isSubscribed, unsubscribe } = useSubscription();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    if (!isSubscribed) {
      setTimeout(() => {
        router.replace("/paywall");
      }, 0);
    }
  }, [isSubscribed, rootNavigationState?.key]);

  if (!rootNavigationState?.key || !isSubscribed) return null;

  const renderItem = ({ item }: { item: typeof SESSIONS[0] }) => {
    const isLocked = item.isPremium && !isSubscribed;

    return (
      <TouchableOpacity 
        onPress={() => isLocked ? router.push('/paywall') : null}
        className="mb-6 rounded-3xl bg-white shadow-sm overflow-hidden border border-gray-100"
      >
        <Image source={{ uri: item.image }} className="w-full h-40" />
        <View className="p-4 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
            <Text className="text-gray-500">{item.duration}</Text>
          </View>
          {item.isPremium ? (
            <View className="bg-purple-100 p-2 rounded-full">
              <Lock size={20} color="#7C3AED" />
            </View>
          ) : (
            <View className="bg-green-100 p-2 rounded-full">
              <Play size={20} color="#059669" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-3xl font-bold text-gray-900">ZenPulse</Text>
            <Text className="text-gray-500">Find your inner peace</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/vibe')}
            className="bg-purple-600 p-3 rounded-2xl flex-row items-center"
          >
            <Sparkles size={20} color="white" />
            <Text className="text-white font-bold ml-2">Vibe</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={SESSIONS}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View className="h-32" />}
        />
      </View>
      
      {/* Test Logout Button */}
      <TouchableOpacity 
        onPress={unsubscribe}
        className="absolute bottom-10 left-6 right-6 bg-gray-200 p-4 rounded-2xl items-center"
      >
        <Text className="text-gray-600 font-bold">Sign Out (Test Only)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
