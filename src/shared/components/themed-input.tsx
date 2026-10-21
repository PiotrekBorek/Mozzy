import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from 'react-native';

const CODE_LENGTH = 6;

interface VerificationInputProps {
  onComplete?: (code: string) => void;
}

export default function VerificationInput({ onComplete }: VerificationInputProps) {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleTextChange = (text: string) => {
    // Filtrowanie tylko cyfr oraz ograniczenie długości
    const sanitizedText = text.replace(/[^0-9]/g, '').slice(0, CODE_LENGTH);
    setCode(sanitizedText);

    if (sanitizedText.length === CODE_LENGTH) {
      Keyboard.dismiss();
      onComplete?.(sanitizedText);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.inputsContainer} onPress={handlePress}>
        {Array.from({ length: CODE_LENGTH }).map((_, index) => {
          const char = code[index] || '';
          const isFilled = index < code.length;
          const isCurrentFocused = index === code.length && isFocused;

          return (
            <View
              key={index}
              style={[
                styles.box,
                isFilled && styles.boxFilled,
                isCurrentFocused && styles.boxFocused,
              ]}
            >
              <Text
                style={[
                  styles.boxText,
                  isFilled && styles.boxTextFilled,
                  isCurrentFocused && styles.boxTextFocused,
                ]}
              >
                {char}
              </Text>
            </View>
          );
        })}
      </Pressable>

      {/* Ukryte pole TextInput do obsługi klawiatury i auto-fill */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleTextChange}
        maxLength={CODE_LENGTH}
        keyboardType="number-pad"
        textContentType="oneTimeCode" // Auto-fill na iOS
        autoComplete="one-time-code" // Auto-fill na Androidzie
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.hiddenInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    gap: 8,
  },
  // Podstawowe style dla pustego pola
  box: {
    width: 48,
    height: 60,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16, // Zaokrąglone rogi zgodne ze zdjęciem
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  // Style dla wpisanych wcześniej cyfr (zielone tło i ramka)
  boxFilled: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  // Style dla aktywnego pola (czarna/ciemna ramka)
  boxFocused: {
    backgroundColor: '#FFFFFF',
    borderColor: '#1E293B',
  },
  // Podstawowy tekst
  boxText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F172A',
  },
  // Tekst dla wpisanych cyfr
  boxTextFilled: {
    color: '#00695C',
  },
  // Tekst dla aktywnej cyfry
  boxTextFocused: {
    color: '#0F172A',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});