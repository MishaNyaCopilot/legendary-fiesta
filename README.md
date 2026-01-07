# ZenPulse: AI Meditation App Prototype

ZenPulse is a high-end, AI-powered meditation application prototype built using React Native, Expo, and NativeWind.

## Features
- **Smart Paywall:** A premium glassmorphism-styled subscription screen with simulated purchase logic.
- **Meditation Hub:** A curated list of meditation sessions with dynamic locking logic for premium content.
- **AI Vibe:** A personalized affirmation generator that uses mood selection and a hybrid AI service (OpenRouter + Mock fallback).
- **Poetic UI:** Polished typing animations and a minimalist "Zen" aesthetic.

## Tech Stack
- **Framework:** React Native + Expo
- **Navigation:** Expo Router (File-based)
- **Styling:** NativeWind (Tailwind CSS) + expo-blur
- **Icons:** Lucide React Native
- **AI Service:** OpenRouter API (Fallback to high-quality local mocks)
- **Testing:** Jest + React Native Testing Library

## Answers to Control Questions

### С какими специфическими проблемами мобильной верстки ИИ справляется хуже всего?

1.  **Состояние готовности навигации (Race Conditions):** ИИ часто генерирует логику редиректов (например, с главной на Paywall), которая срабатывает слишком рано, до того как Root Layout успевает полностью смонтироваться. Это приводит к ошибке `Attempted to navigate before mounting the Root Layout`.
2.  **Артефакты рендеринга NativeWind на Web:** При использовании прозрачности, размытия (Blur) и теней вместе, ИИ может предлагать стили, которые создают "грязные" прямоугольники или наложение текста (text-behind-text) в браузере, хотя на нативных устройствах это выглядит нормально.
3.  **Устаревшие API:** ИИ все еще часто предлагает использовать стандартный `SafeAreaView` из `react-native`, который является deprecated, вместо более стабильного `react-native-safe-area-context`.
4.  **Сложные перекрытия (Z-index/Absolute):** ИИ склонен использовать абсолютное позиционирование для кнопок (например, Sign Out), что на маленьких экранах приводит к наложению элементов на основной контент.

### Как ты контролировал работу ИИ, чтобы приложение не сломалось на маленьких экранах (iPhone SE vs Pro Max)?

1.  **Использование ScrollView и FlatList:** Я заставлял ИИ оборачивать все экраны в `ScrollView` или использовать `FlatList` с `ListFooterComponent`. Это гарантирует, что даже если экран очень маленький (iPhone SE), пользователь сможет прокрутить до нужной кнопки, и элементы не будут "выдавлены" за пределы видимости.
2.  **Ручной аудит через Device Toolbar:** Я использовал инструменты разработчика Chrome для симуляции различных разрешений (от 320px до 430px ширины). Когда обнаруживались артефакты (например, слишком широкое окно аффирмации на вебе), я добавлял ограничения `max-width` и `self-center`.
3.  **Упрощение стилей для стабильности:** Когда ИИ генерировал слишком сложные Tailwind-классы для динамических состояний (isSelected), которые глючили при перерендере, я заменял их на чистые объекты `style` в `Pressable` или `TouchableOpacity`.
4.  **Проверка SafeArea:** Я вручную проверял импорты и структуру `_layout.tsx`, чтобы убедиться, что `SafeAreaProvider` и `SafeAreaView` правильно обрабатывают "челки" (notches) и индикаторы дома на всех типах устройств.
