import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ThemedButton from '@/shared/components/themed-button';
// Przykład importu zewnętrznej biblioteki lub własnego komponentu:
// import ThemedButton from 'react-native-really-awesome-button'; 
// lub import { ThemedButton } from './components/ThemedButton';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F5F0" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.pulseIconBox}>
            <View style={styles.pulseLineMini} />
          </View>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>
            Train smarter.{'\n'}
            Schedule <Text style={styles.greenText}>everything.</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Book sessions, track client progress,{'\n'}
            and run your coaching business from{'\n'}
            one clean home screen.
          </Text>
        </View>

      </View>

      <View style={styles.footer}>
        <ThemedButton
          title="primary"
          backgroundColor="#111312"
          backgroundActive="#222524"
          borderRadius={20}
          height={56}
          style={styles.buttonWrapper}
          onPress={() => console.log('Get started pressed')}
        >
          <Text style={styles.primaryButtonText}>Get started →</Text>
        </ThemedButton>

        <ThemedButton
          title="secondary"
          backgroundColor="#E8ECE6"
          backgroundActive="#D8DCD6"
          borderRadius={20}
          height={56}
          style={styles.buttonWrapper}
          onPress={() => console.log('I already have an account pressed')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </ThemedButton>

        <Text style={styles.termsText}>
          By continuing you agree to Pulse's{' '}
          <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F0',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  logoContainer: {
    marginBottom: 32,
  },
  pulseIconBox: {
    width: 56,
    height: 56,
    backgroundColor: '#111312',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseLineMini: {
    width: 24,
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111312',
    lineHeight: 40,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  greenText: {
    color: '#168038',
  },
  subtitle: {
    fontSize: 15,
    color: '#686D6A',
    textAlign: 'center',
    lineHeight: 22,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginVertical: 10,
  },
  ecgLineMock: {
    width: '80%',
    height: 2,
    backgroundColor: '#168038',
    position: 'relative',
  },
  ecgSegment: {
    position: 'absolute',
    top: -15,
    left: '35%',
    width: 30,
    height: 30,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#168038',
    transform: [{ rotate: '45deg' }],
  },
  ecgPeakDot: {
    position: 'absolute',
    top: -22,
    left: '39%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
  },
  footer: {
    width: '100%',
    paddingBottom: 20,
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#111312',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#8C918F',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});