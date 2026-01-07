import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PaywallScreen from '../app/paywall';
import { SubscriptionProvider } from '../context/SubscriptionContext';

describe('PaywallScreen', () => {
  it('renders title and benefits', () => {
    render(
      <SubscriptionProvider>
        <PaywallScreen />
      </SubscriptionProvider>
    );
    expect(screen.getByText('ZenPulse Premium')).toBeTruthy();
    expect(screen.getByText('Unlimited Meditation Sessions')).toBeTruthy();
  });

  it('renders pricing tiers', () => {
    render(
      <SubscriptionProvider>
        <PaywallScreen />
      </SubscriptionProvider>
    );
    expect(screen.getByText('Monthly')).toBeTruthy();
    expect(screen.getByText('Yearly')).toBeTruthy();
  });
});
