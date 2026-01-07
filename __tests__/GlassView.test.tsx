import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GlassView } from '../components/GlassView';

describe('GlassView', () => {
  it('renders children correctly', () => {
    render(
      <GlassView>
        <Text>Test Content</Text>
      </GlassView>
    );
    expect(screen.getByText('Test Content')).toBeTruthy();
  });
});
