import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GlassView } from '../components/GlassView';
import { ArrowLeft } from 'lucide-react-native';

const MOODS = [
  { id: 'calm', label: 'Calm', emoji: '🌿' },
  { id: 'stressed', label: 'Stressed', emoji: '😫' },
  { id: 'energized', label: 'Energized', emoji: '⚡' },
];

export default function VibeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['#8B5CF6', '#C026D3', '#F43F5E']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <SafeAreaView className="flex-1">
        <View className="p-4 flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft color="white" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <View className="items-center mb-10">
            <Text className="text-white text-3xl font-bold text-center">How are you feeling?</Text>
            <Text className="text-white/80 text-lg mt-2 text-center">Select your vibe for today</Text>
          </View>

          <View className="flex-row justify-between mb-8">
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                onPress={() => setSelectedMood(mood.id)}
                className={`items-center p-4 rounded-3xl w-[30%] ${selectedMood === mood.id ? 'bg-white' : 'bg-white/10'}`}
              >
                <Text className="text-4xl mb-2">{mood.emoji}</Text>
                <Text className={`font-medium ${selectedMood === mood.id ? 'text-purple-600' : 'text-white'}`}>
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {selectedMood && (
             <GlassView className="mt-8">
                <Text className="text-white text-center">Tap to generate your affirmation...</Text>
             </GlassView>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
