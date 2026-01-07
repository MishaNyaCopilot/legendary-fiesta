import React from 'react';
import { render, screen } from '@testing-library/react-native';
import VibeScreen from '../app/vibe';
import { SubscriptionProvider } from '../context/SubscriptionContext';

describe('VibeScreen', () => {
  it('renders mood options', () => {
    render(
      <SubscriptionProvider>
        <VibeScreen />
      </SubscriptionProvider>
    );
    
    // Check for the presence of emoji options or their labels
    expect(screen.getByText('Calm')).toBeTruthy();
    expect(screen.getByText('Stressed')).toBeTruthy();
    expect(screen.getByText('Energized')).toBeTruthy();
  });
});
