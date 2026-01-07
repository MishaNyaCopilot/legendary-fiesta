import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSubscription } from '../context/SubscriptionContext';
import { GlassView } from '../components/GlassView';

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
    <View className="flex-1">
      <LinearGradient
        colors={['#4F46E5', '#7C3AED', '#DB2777']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View className="items-center mt-10 mb-8">
            <Text className="text-white text-3xl font-bold text-center">Unlock ZenPulse Premium</Text>
            <Text className="text-white/80 text-lg mt-2 text-center">Invest in your peace of mind</Text>
          </View>

          <GlassView className="mb-8">
            {benefits.map((benefit, index) => (
              <View key={index} className="flex-row items-center mb-3">
                <Text className="text-white mr-2">✓</Text>
                <Text className="text-white text-base">{benefit}</Text>
              </View>
            ))}
          </GlassView>

          <View className="flex-row justify-between mb-8">
            <TouchableOpacity 
              onPress={() => setSelectedPlan('monthly')}
              className={`flex-1 mr-2 p-4 rounded-2xl border ${selectedPlan === 'monthly' ? 'bg-white border-white' : 'bg-white/10 border-white/20'}`}
            >
              <Text className={`text-center font-bold ${selectedPlan === 'monthly' ? 'text-purple-700' : 'text-white'}`}>Monthly</Text>
              <Text className={`text-center mt-1 ${selectedPlan === 'monthly' ? 'text-purple-700/70' : 'text-white/60'}`}>$9.99/mo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setSelectedPlan('yearly')}
              className={`flex-1 ml-2 p-4 rounded-2xl border ${selectedPlan === 'yearly' ? 'bg-white border-white' : 'bg-white/10 border-white/20'}`}
            >
              <View className="absolute -top-3 right-0 left-0 items-center">
                <View className="bg-yellow-400 px-2 py-0.5 rounded-full">
                  <Text className="text-[10px] font-bold uppercase">Best Value</Text>
                </View>
              </View>
              <Text className={`text-center font-bold ${selectedPlan === 'yearly' ? 'text-purple-700' : 'text-white'}`}>Yearly</Text>
              <Text className={`text-center mt-1 ${selectedPlan === 'yearly' ? 'text-purple-700/70' : 'text-white/60'}`}>$59.99/yr</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={handleSubscribe}
            className="bg-white p-5 rounded-full shadow-lg items-center"
          >
            <Text className="text-purple-700 text-lg font-bold">Try for Free</Text>
          </TouchableOpacity>
          
          <Text className="text-white/60 text-xs text-center mt-4">
            7-day free trial, then auto-renews. Cancel anytime.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
