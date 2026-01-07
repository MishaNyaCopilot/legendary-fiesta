const MOCK_RESPONSES: Record<string, string[]> = {
  calm: [
    "Your breath is a steady anchor in the gentle flow of the day.",
    "Peace resides within you; let it radiate through every action.",
    "You are a quiet observer of your own serenity."
  ],
  stressed: [
    "This moment is a temporary cloud; your inner sun remains bright.",
    "Inhale calm, exhale the weight of the world. You are safe.",
    "Take one step, one breath. You are capable of handling this."
  ],
  energized: [
    "Your vitality is a gift; use it to illuminate the world around you.",
    "Ride the wave of your momentum with grace and purpose.",
    "You are a powerhouse of positive transformation."
  ]
};

const getRandomMock = (mood: string) => {
  const responses = MOCK_RESPONSES[mood] || MOCK_RESPONSES.calm;
  return responses[Math.floor(Math.random() * responses.length)];
};

export const generateAffirmation = async (mood: string): Promise<string> => {
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getRandomMock(mood);
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/auto", // Or a specific free model
        messages: [
          { role: "system", content: "You are a zen meditation assistant. Generate a short, poetic, and serene affirmation (1-2 sentences) based on the user's mood." },
          { role: "user", content: `My mood is: ${mood}` }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Generation Error:", error);
    return getRandomMock(mood);
  }
};
