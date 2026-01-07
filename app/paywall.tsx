import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSubscription } from '../context/SubscriptionContext';
import { GlassView } from '../components/GlassView';
import { X } from 'lucide-react-native';

const benefits = [
  "Unlimited Meditation Sessions",
  "AI-Powered Personalized Affirmations",
  "Offline Access to Your Favorites",
  "Exclusive New Content Weekly"
];

export default function PaywallScreen() {
  const router = useRouter();
  const { subscribe } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const handleSubscribe = () => {
    subscribe();
    router.replace('/');
  };

  return (
    <View className="flex-1 bg-purple-900">
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1536412597336-ade7b523ec3f?auto=format&fit=crop&q=80&w=1000' }}
        style={StyleSheet.absoluteFill}
        opacity={0.6}
      />
      <LinearGradient
        colors={['transparent', 'rgba(79, 70, 229, 0.8)', 'rgba(124, 58, 237, 0.9)']}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView className="flex-1">
        <View className="p-4 flex-row justify-end">
          <TouchableOpacity onPress={() => router.back()} className="bg-black/20 p-2 rounded-full">
            <X color="white" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <View className="items-center mb-8">
            <Text className="text-white text-4xl font-bold text-center">ZenPulse Premium</Text>
            <Text className="text-white/80 text-xl mt-2 text-center italic">Elevate your mindfulness journey</Text>
          </View>

          <GlassView className="mb-8">
            {benefits.map((benefit, index) => (
              <View key={index} className="flex-row items-center mb-4">
                <View className="bg-white/20 p-1 rounded-full mr-3">
                  <Text className="text-white text-xs">✓</Text>
                </View>
                <Text className="text-white text-lg font-medium">{benefit}</Text>
              </View>
            ))}
          </GlassView>

          <View className="flex-row justify-between mb-8">
            <TouchableOpacity 
              onPress={() => setSelectedPlan('monthly')}
              className={`flex-1 mr-2 p-5 rounded-3xl border-2 ${selectedPlan === 'monthly' ? 'bg-white border-white' : 'bg-white/10 border-white/20'}`}
            >
              <Text className={`text-center font-bold text-lg ${selectedPlan === 'monthly' ? 'text-purple-700' : 'text-white'}`}>Monthly</Text>
              <Text className={`text-center mt-1 ${selectedPlan === 'monthly' ? 'text-purple-700/70' : 'text-white/60'}`}>$9.99/mo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setSelectedPlan('yearly')}
              className={`flex-1 ml-2 p-5 rounded-3xl border-2 ${selectedPlan === 'yearly' ? 'bg-white border-white' : 'bg-white/10 border-white/20'}`}
            >
              <View className="absolute -top-4 right-0 left-0 items-center">
                <View className="bg-yellow-400 px-3 py-1 rounded-full shadow-lg">
                  <Text className="text-[10px] font-black uppercase text-purple-900">Best Value</Text>
                </View>
              </View>
              <Text className={`text-center font-bold text-lg ${selectedPlan === 'yearly' ? 'text-purple-700' : 'text-white'}`}>Yearly</Text>
              <Text className={`text-center mt-1 ${selectedPlan === 'yearly' ? 'text-purple-700/70' : 'text-white/60'}`}>$59.99/yr</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={handleSubscribe}
            activeOpacity={0.8}
            className="bg-white p-6 rounded-[30px] shadow-xl items-center mb-6"
          >
            <Text className="text-purple-700 text-xl font-black uppercase tracking-wider">Try for Free</Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-center space-x-6">
            <TouchableOpacity><Text className="text-white/40 text-xs underline">Terms of Service</Text></TouchableOpacity>
            <TouchableOpacity><Text className="text-white/40 text-xs underline">Privacy Policy</Text></TouchableOpacity>
            <TouchableOpacity><Text className="text-white/40 text-xs underline">Restore Purchase</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
