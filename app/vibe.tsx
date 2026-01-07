import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GlassView } from '../components/GlassView';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react-native';
import { generateAffirmation } from '../services/ai';

const MOODS = [
  { id: 'calm', label: 'Calm', emoji: '🌿' },
  { id: 'stressed', label: 'Stressed', emoji: '😫' },
  { id: 'energized', label: 'Energized', emoji: '⚡' },
];

export default function VibeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [affirmation, setAffirmation] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedMood) {
      handleGenerate();
    }
  }, [selectedMood]);

  useEffect(() => {
    if (affirmation && displayedText.length < affirmation.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(affirmation.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [affirmation, displayedText]);

  const handleGenerate = async () => {
    if (!selectedMood) return;
    
    setIsLoading(true);
    setAffirmation("");
    setDisplayedText("");
    
    try {
      const result = await generateAffirmation(selectedMood);
      setAffirmation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <TouchableOpacity
                  key={mood.id}
                  onPress={() => {
                    if (!isLoading) setSelectedMood(mood.id);
                  }}
                  className="items-center p-4 rounded-3xl w-[30%]"
                  style={{ backgroundColor: isSelected ? 'white' : 'rgba(255,255,255,0.1)' }}
                >
                  <Text className="text-4xl mb-2">{mood.emoji}</Text>
                  <Text 
                    className="font-medium"
                    style={{ color: isSelected ? '#9333ea' : 'white' }}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {(isLoading || displayedText) && (
             <GlassView className="mt-12 min-h-[200px] justify-center items-center">
                {isLoading ? (
                  <View className="items-center">
                    <ActivityIndicator color="white" size="large" />
                    <Text className="text-white/70 mt-6 text-center italic text-lg">Consulting the universe...</Text>
                  </View>
                ) : (
                  <View className="items-center">
                    <Sparkles size={24} color="white" className="mb-4 opacity-60" />
                    <Text className="text-white text-2xl text-center leading-[34px] font-serif italic">
                      {displayedText}
                    </Text>
                  </View>
                )}
             </GlassView>
          )}

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
