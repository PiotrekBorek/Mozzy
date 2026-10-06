import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '../shared/components/themed-text';
import { ThemedView } from '../shared/components/themed-view';
import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '../shared/constants/theme';
import { ThemedButton } from '@/shared/components/themed-button';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
          <ThemedText type='subtitle' style={styles.title}>Train smarter.</ThemedText>
          <ThemedView style={styles.heading}>
            <ThemedText type='subtitle' themeColor='ink' style={styles.title}>Schedule</ThemedText>
            <ThemedText type='subtitle' themeColor='primary' style={styles.title}>everything.</ThemedText>
          </ThemedView>
          <ThemedText type='smallBold' style={styles.description} themeColor='inkSoft'>Book sessions, track client progress, and run your coaching business from one clean home screen.</ThemedText>
          <View style={styles.bottomContainer}>
            <ThemedButton type='primary' title="Get Started ->" onPress={() => console.log('Nastepny ekran')}/>
            <ThemedButton type='secondary' title="I already have an account" onPress={() => console.log('Nastepny ekran')}/>
            <ThemedText type='smallBold' style={styles.policyText} themeColor='inkSoft'>By continuing u agree to Mozzy's Terms & Privacy Policy.</ThemedText>
          </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    width: '100%',
    margin: 0,
    padding: 0
  },
  bottomContainer: {
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
    gap: 12
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 265,
    maxWidth: '100%',
    textAlign: 'center',
    flexDirection: 'column',
  },
  heading: {
    width: '100%',
    flexDirection: 'row',
    gap: Spacing.two,
    fontFamily: 'SpaceGrotesk',
    justifyContent: 'center'
  },
  title: {
    fontSize: 35,
    padding:0,
    lineHeight:40,
    marginTop: -4
  },
  description: {
    width: '75%',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24
  },
  policyText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  }
});
