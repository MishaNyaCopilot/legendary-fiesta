import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useRootNavigationState: () => ({ key: 'test-key' }),
}));

describe('HomeScreen Redirection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('redirects to paywall if not subscribed', () => {
    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });

    render(
      <SubscriptionProvider>
        <HomeScreen />
      </SubscriptionProvider>
    );

    jest.runAllTimers();

    expect(replaceMock).toHaveBeenCalledWith('/paywall');
  });
});
