import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import { useSubscription } from '../context/SubscriptionContext';
import { useRouter, useRootNavigationState } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
  useRootNavigationState: () => ({ key: 'test-key' }),
}));

jest.mock('../context/SubscriptionContext', () => ({
  useSubscription: jest.fn(),
}));

describe('MeditationHub', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useSubscription as jest.Mock).mockReturnValue({
      isSubscribed: true,
      unsubscribe: jest.fn(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders session list when subscribed', () => {
    render(<HomeScreen />);
    
    expect(screen.getByText('Morning Focus')).toBeTruthy();
    expect(screen.getByText('Deep Sleep')).toBeTruthy();
  });
});
