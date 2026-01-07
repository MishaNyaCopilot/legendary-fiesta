import React, { useEffect, useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import VibeScreen from '../app/vibe';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { generateAffirmation } from '../services/ai';

jest.mock('../services/ai', () => ({
  generateAffirmation: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe('VibeScreen Affirmation', () => {
  it('generates and displays affirmation after selecting mood', async () => {
    (generateAffirmation as jest.Mock).mockResolvedValue('Peace resides within you.');

    render(
      <SubscriptionProvider>
        <VibeScreen />
      </SubscriptionProvider>
    );
    
    fireEvent.press(screen.getByText('Calm'));
    
    await waitFor(() => {
      expect(generateAffirmation).toHaveBeenCalledWith('calm');
    });

    // Since there is a typing animation, the full text might take a moment
    await waitFor(() => {
      expect(screen.getByText(/Peace/)).toBeTruthy();
    }, { timeout: 5000 });
  });
});
