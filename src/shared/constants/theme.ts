/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '../global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    background: '#F5F7F2',
    surface: '#FFFFFF',
    surface2: '#EEF2E9',
 
    // text / ink scale
    ink: '#12151A',
    inkSoft: '#68705F',
    inkFaint: '#A7AE9C',
 
    // primary — actions, confirmed states
    primary: '#1E9B63',
    primaryDark: '#146B45',
    primaryTint: '#E4F5EA',
  
    // accent — highlights, "new" flags
    accent: '#FF7A45',
    accentDark: '#C8551F',
    accentTint: '#FFE9DE',
  
    // borders
    line: '#E3E8DD',
  
    // destructive
    danger: '#E5484D',
    dangerTint: '#FDF3F3',
  
    white: '#FFFFFF',
  },
  dark: {
    background: '#12151A',   // warm near-black, not pure black
    surface: '#1A1E1A',       // card/elevated surface
    surface2: '#242A22',      // chips, stat tiles — one step lighter
  
    ink: '#F2F5EC',           // primary text — warm off-white, not #FFF
    inkSoft: '#A7AE9C',        // secondary text
    inkFaint: '#6B7263',       // placeholders, disabled, faint labels
  
    primary: '#2ECC82',        // brightened for legibility on dark bg
    primaryDark: '#7FE3AC',    // "text-on-tint" role — light green now
    primaryTint: '#163625',    // "tinted surface" role — dark green now
  
    accent: '#FF8B5C',
    accentDark: '#FFB58C',    // text-on-tint role
    accentTint: '#3A2318',    // tinted surface role
  
    line: '#2A2F28',
  
    danger: '#F16A6E',
    dangerTint: '#3A2020',
  
    white: '#FFFFFF',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  default: {
    display: 'SpaceGrotesk',   // → 'SpaceGrotesk-Bold' once loaded
    body: 'SpaceGrotesk',       // → 'Inter-Regular' / 'Inter-SemiBold' once loaded
    mono: 'SpaceGrotesk', 
  }
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 48,
  six: 64,
  seven: 120
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
