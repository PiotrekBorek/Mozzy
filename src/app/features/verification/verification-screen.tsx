import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';

import VerificationInput from '@/shared/components/themed-input';
import { ThemedText } from '@/shared/components/themed-text';
import { Colors } from '@/shared/constants/theme';
import { useVerification } from './verification';

export default function VerificationScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');

  const { secondsLeft, loading, handleResend, verifyCode } = useVerification(email);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ThemedText style={styles.backIcon}>‹</ThemedText>
        </Pressable>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={styles.envelope}>
              <View style={styles.envelopeFlapLeft} />
              <View style={styles.envelopeFlapRight} />
            </View>
          </View>

          <ThemedText style={styles.title}>Check your email</ThemedText>

          <ThemedText style={styles.description}>
            We sent a 6-digit code to{' '}
            <ThemedText style={styles.email}>{email || 'your email'}</ThemedText>.
          </ThemedText>

          <ThemedText style={styles.description}>
            Enter it below to verify your account.
          </ThemedText>

          <VerificationInput onComplete={(completedCode) => setCode(completedCode)} />

          <Pressable
            onPress={handleResend}
            disabled={secondsLeft > 0}
            style={styles.resendButton}
          >
            <ThemedText style={styles.resendText}>Didn't get a code?</ThemedText>
            <ThemedText
              style={[
                styles.resendAction,
                secondsLeft > 0 && styles.resendDisabled,
              ]}
            >
              {secondsLeft > 0
                ? `Resend in 0:${secondsLeft.toString().padStart(2, '0')}`
                : 'Resend code'}
            </ThemedText>
          </Pressable>
        </View>

        <Pressable
          style={[styles.verifyButton, loading && { opacity: 0.7 }]}
          onPress={() => verifyCode(code)}
          disabled={loading}
        >
          <ThemedText style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify & continue'}
          </ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: 
    Colors.light.background 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 24 
  },
  backButton: { 
    width: 38, 
    height: 38, 
    marginTop: 2, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: Colors.light.line, 
    backgroundColor: Colors.light.surface, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  backIcon: { 
    fontSize: 27, 
    lineHeight: 29, 
    color: Colors.light.ink, 
    marginTop: -3 
  },
  content: { 
    marginTop: 26 
  },
  iconContainer: { 
    width: 64, 
    height: 64, 
    borderRadius: 17, 
    backgroundColor: Colors.light.primaryTint, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 21 
  },
  envelope: { 
    width: 21, 
    height: 15, 
    borderWidth: 2, 
    borderColor: Colors.light.primary, 
    position: 'relative', 
    overflow: 'hidden' 
  },
  envelopeFlapLeft: { 
    position: 'absolute', 
    width: 13, 
    height: 2, 
    backgroundColor: Colors.light.primary, 
    left: -1, 
    top: 3, 
    transform: [{ rotate: '34deg' }] 
  },
  envelopeFlapRight: { 
    position: 'absolute', 
    width: 13, 
    height: 2, 
    backgroundColor: Colors.light.primary, 
    right: -1, 
    top: 3, 
    transform: [{ rotate: '-34deg' }] 
  },
  title: { 
    fontSize: 24, 
    lineHeight: 30, 
    fontWeight: '700', 
    color: Colors.light.ink, 
    marginBottom: 8 
  },
  description: { 
    fontSize: 14, 
    lineHeight: 21, 
    color: Colors.light.inkSoft 
  },
  email: { 
    fontSize: 14, 
    lineHeight: 21, 
    fontWeight: '700', 
    color: Colors.light.ink 
  },
  resendButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    minHeight: 44, 
    marginTop: 0 
  },
  resendText: { 
    fontSize: 14, 
    lineHeight: 20, 
    color: Colors.light.inkSoft 
  },
  resendAction: { 
    fontSize: 14, 
    lineHeight: 20, 
    fontWeight: '700', 
    color: Colors.light.primaryDark, 
    marginLeft: 6 
  },
  resendDisabled: { 
    color: Colors.light.primaryDark 
  },
  verifyButton: { 
    height: 51, 
    borderRadius: 15, 
    backgroundColor: Colors.light.ink, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 'auto', 
    marginBottom: 2 
  },
  verifyButtonText: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: Colors.light.white 
  },
});
