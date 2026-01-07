import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import { SubscriptionProvider } from '../context/SubscriptionContext';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(
      <SubscriptionProvider>
        <HomeScreen />
      </SubscriptionProvider>
    );
    expect(screen.getByText('ZenPulse')).toBeTruthy();
  });
});
