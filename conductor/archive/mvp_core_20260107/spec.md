# Specification: ZenPulse MVP Core

## Overview
This track covers the implementation of the core features required for the ZenPulse AI Meditation App prototype. The goal is to provide a functional flow from subscription simulation to personalized AI-generated content.

## Functional Requirements
1.  **Subscription Paywall:**
    *   Implement a "Glassmorphism" styled paywall.
    *   Display Monthly and Yearly plans.
    *   "Try for Free" button must simulate a successful subscription (setting a global state).
2.  **Meditation Hub:**
    *   Display a list of meditation sessions (cards with images and durations).
    *   Implement locking logic: if `isSubscribed` is false, premium sessions should be greyed out and redirect to the Paywall.
3.  **AI Vibe (Affirmations):**
    *   Mood selection screen with 3 emoji options.
    *   Generate short affirmation/meditation text based on selected mood.
    *   Hybrid AI logic: Use OpenRouter API if `OPENROUTER_API_KEY` exists; otherwise, use mock responses.
    *   Visual "typing" animation for the generated text.

## Non-Functional Requirements
*   **UI/UX:** Minimalist & Clean aesthetic, Material Design patterns, SafeArea support.
*   **Performance:** Fast transitions and responsive layout.

## Acceptance Criteria
*   The app successfully opens to the Paywall if not subscribed.
*   Clicking "Try for Free" unlocks the Meditation Hub.
*   Selecting a mood generates a text affirmation with a typing animation.
*   The layout works across standard iPhone and Android screen sizes.
