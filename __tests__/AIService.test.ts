import { generateAffirmation } from '../services/ai';

describe('AIService', () => {
  it('returns a mock response when API key is missing', async () => {
    const originalEnv = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;
    delete process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

    const result = await generateAffirmation('calm');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');

    process.env.EXPO_PUBLIC_OPENROUTER_API_KEY = originalEnv;
  });

  it('handles API calls (mocked)', async () => {
    process.env.EXPO_PUBLIC_OPENROUTER_API_KEY = 'test-key';
    
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        choices: [{ message: { content: 'Test affirmation' } }]
      })
    }) as jest.Mock;

    const result = await generateAffirmation('stressed');
    expect(result).toBe('Test affirmation');
    expect(global.fetch).toHaveBeenCalledWith(
      "https://openrouter.ai/api/v1/chat/completions",
      expect.any(Object)
    );
  });
});
