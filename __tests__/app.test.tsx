import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(<HomeScreen />);
    expect(screen.getByText('ZenPulse')).toBeTruthy();
  });
});
