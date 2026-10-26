import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';

import { useRouter } from 'expo-router';

import ThemedButton from '@/shared/components/themed-button';
import { Colors } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';

import { useSignUp } from './sign-up';

export default function SignUpScreen() {
  const router = useRouter();

  const {
  fullName,
  setFullName,

  email,
  setEmail,

  password,
  setPassword,

  isPasswordVisible,
  togglePasswordVisibility,

  confirmPassword,
  setConfirmPassword,

  acceptedTerms,
  setAcceptedTerms,

  loading,
  errors,
  registerUser,
} = useSignUp();

const handleSignUp = async () => {
  const success = await registerUser();

  if (success) {
    router.push({
      pathname: '../role-selection/role-selection',
      params: { email },
    });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.topSection}>

          {/* Back button */}

          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          {/* Header */}

          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              Create your account
            </Text>

            <Text style={styles.subtitle}>
              Set up your coaching profile in under a minute.
            </Text>
          </View>

          {/* Form */}

          <View style={styles.formContainer}>

            {/* Full name */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Full name
              </Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>♙</Text>

                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Jordan Blake"
                  placeholderTextColor="#8C918F"
                  autoCapitalize="words"
                />
              </View>
              {errors.fullName && (
                    <Text style={styles.errorText}>
                        {errors.fullName}
                    </Text>
                )}
            </View>

            {/* Email */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email
              </Text>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>✉</Text>

                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="jordan.blake@gmail.com"
                  placeholderTextColor="#8C918F"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              {errors.email && (
                    <Text style={styles.errorText}>
                        {errors.email}
                    </Text>
                )}
            </View>

            {/* Password row */}

            <View style={styles.passwordRow}>
                {/* Password */}
                <View style={styles.passwordGroup}>
                    <Text style={styles.label}>Password</Text>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, { paddingRight: 40 }]}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        placeholderTextColor="#8C918F"
                        secureTextEntry={!isPasswordVisible}
                    />

                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                        accessibilityRole="button"
                        accessibilityLabel={
                        isPasswordVisible ? 'Hide password' : 'Show password'
                        }
                    >
                        <Ionicons
                        name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color="#8C918F"
                        />
                    </TouchableOpacity>
                    </View>

                    {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                </View>

                {/* Confirm — always hidden */}
                <View style={styles.passwordGroup}>
                    <Text style={styles.label}>Confirm</Text>

                    <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="••••••••"
                        placeholderTextColor="#8C918F"
                        secureTextEntry
                    />
                    </View>

                    {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}
                </View>
            </View>

            {/* Terms checkbox */}

            <Pressable
              style={styles.termsContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked,
                ]}
              >
                {acceptedTerms && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <Text style={styles.termsText}>
                I agree to the Terms of Service and Privacy Policy,
                and confirm I'm a licensed or practicing trainer.
              </Text>
            </Pressable>

            {errors.terms && (
                    <Text style={styles.errorText}>
                        {errors.terms}
                    </Text>
                )}

            {/* Create account button */}

            {errors.general && (
                <Text style={styles.errorText}>
                    {errors.general}
                </Text>
            )}
            <ThemedButton
                title={loading ? 'Creating account...' : 'Create account'}
                backgroundColor="#111312"
                backgroundActive="#222524"
                borderRadius={16}
                height={52}
                style={styles.buttonWrapper}
                disabled={loading}
                onPress={handleSignUp}
            />

          </View>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already coaching on Pulse?{' '}
            <Text
              style={styles.footerLink}
              onPress={() =>
                router.push('./features/log-in-screen/log-in-screen')
              }
            >
              Log in
            </Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 24,
  },

  topSection: {
    flex: 1,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.line,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  backIcon: {
    fontSize: 27,
    color: Colors.light.ink,
    lineHeight: 29,
    marginTop: -3,
  },

  headerContainer: {
    marginBottom: 26,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.light.ink,
    marginBottom: 6,
    letterSpacing: -0.5,
    fontFamily: 'SpaceGrotesk-Bold',
  },

  subtitle: {
    fontSize: 14,
    color: Colors.light.inkSoft,
    lineHeight: 21,
  },

  formContainer: {
    gap: 16,
  },

  inputGroup: {
    gap: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.inkSoft,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: 15,
    paddingHorizontal: 14,
    height: 45,
  },

  inputIcon: {
    fontSize: 16,
    color: Colors.light.inkFaint,
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.ink,
    paddingVertical: 0,
  },

  passwordRow: {
    flexDirection: 'row',
    gap: 12,
  },

  passwordGroup: {
    flex: 1,
    gap: 6,
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
    marginBottom: 6,
  },

  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.line,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },

  checkboxChecked: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  termsText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: Colors.light.inkSoft,
  },

  buttonWrapper: {
    width: '100%',
    marginTop: 0,
  },

  footer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 0,
  },

  footerText: {
    fontSize: 13,
    color: Colors.light.inkSoft,
  },

  footerLink: {
    color: Colors.light.primaryDark,
    fontWeight: '700',
  },

  errorText: {
  fontSize: 12,
  color: Colors.light.danger,
  marginTop: 4,
},

eyeIcon: {
  position: 'absolute',
  right: 12,
  top: 0,
  bottom: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
});