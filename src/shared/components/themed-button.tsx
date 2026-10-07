import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';

interface ThemedButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  backgroundActive?: string;
  textColor?: string;
  borderRadius?: number;
  height?: number;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  disabled?: boolean;
}

export default function ThemedButton({
  onPress,
  title,
  children,
  backgroundColor = '#111312',
  backgroundActive = '#222524',
  textColor = '#FFFFFF',
  borderRadius = 28,
  height = 56,
  style,
  textStyle,
  disabled = false,
}: ThemedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          height,
          borderRadius,
          backgroundColor: isPressed ? backgroundActive : backgroundColor,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {children ? (
        children
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});