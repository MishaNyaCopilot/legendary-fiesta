import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text, Button, View } from 'react-native';
import { SubscriptionProvider, useSubscription } from '../context/SubscriptionContext';

const TestComponent = () => {
  const { isSubscribed, subscribe, unsubscribe } = useSubscription();
  return (
    <View>
      <Text testID="status">{isSubscribed ? 'Subscribed' : 'Free'}</Text>
      <Button title="Subscribe" onPress={subscribe} />
      <Button title="Unsubscribe" onPress={unsubscribe} />
    </View>
  );
};

describe('SubscriptionContext', () => {
  it('provides initial subscription status as false', () => {
    render(
      <SubscriptionProvider>
        <TestComponent />
      </SubscriptionProvider>
    );
    expect(screen.getByTestId('status').props.children).toBe('Free');
  });

  it('updates status when subscribe is called', () => {
    render(
      <SubscriptionProvider>
        <TestComponent />
      </SubscriptionProvider>
    );
    fireEvent.press(screen.getByText('Subscribe'));
    expect(screen.getByTestId('status').props.children).toBe('Subscribed');
  });
});
