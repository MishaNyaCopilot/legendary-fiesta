# Technology Stack: ZenPulse

## Core Framework
*   **Platform:** **React Native + Expo**.
    *   **Reason:** Provides a rapid development cycle, cross-platform compatibility, and easy testing via Expo Go. It is the ideal choice for a prototype that needs to be delivered quickly.

## UI & Styling
*   **Styling Engine:** **NativeWind**.
    *   **Reason:** Allows for rapid styling using familiar Tailwind CSS utility classes. It handles platform-specific styles efficiently and speeds up the UI implementation process significantly.
*   **Icons:** **Lucide React Native** (or Expo vector icons).
*   **Fonts:** **Expo Google Fonts** (for easy integration of custom typography).

## State Management & Logic
*   **State Management:** **React Context API** (sufficient for MVP complexity) or **Zustand** (if a lightweight global store is needed).
*   **Navigation:** **Expo Router** (file-based routing, modern standard for Expo apps).

## AI & Backend Services
*   **AI Service:** **Hybrid Approach**.
    *   **Primary:** OpenRouter API (Access to free/low-cost models).
    *   **Fallback:** Local Mock Response System.
    *   **Logic:** The app will check for the presence of an `OPENROUTER_API_KEY` in the environment variables. If present, it will fetch real AI responses. If absent, it will seamlessly degrade to a pre-defined set of high-quality mock responses to ensure the app is always demo-ready.
*   **Environment:** `dotenv` configuration (via Expo's built-in env support).

## Development Tools
*   **IDE:** Cursor / VS Code.
*   **Linting/Formatting:** ESLint + Prettier.
*   **Package Manager:** `npm` or `yarn`.
