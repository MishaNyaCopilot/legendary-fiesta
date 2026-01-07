import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassViewProps extends ViewProps {
  children: ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassView = ({ 
  children, 
  intensity = 30, 
  tint = 'light',
  style,
  ...props 
}: GlassViewProps) => {
  return (
    <View 
      style={[styles.container, style]} 
      className="overflow-hidden rounded-[40px] border border-white/40 shadow-2xl"
      {...props}
    >
      <BlurView
        intensity={60}
        tint="light"
        style={StyleSheet.absoluteFill}
      />
      <View className="p-8">
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});
