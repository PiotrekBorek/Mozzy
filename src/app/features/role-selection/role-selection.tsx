import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { email: emailParam } = useLocalSearchParams<{ email?: string | string[] }>();
  const email = (Array.isArray(emailParam) ? emailParam[0] : emailParam)?.trim().toLowerCase();

  const handleSelectClient = () => {
    if (!email) {
      Alert.alert('Brak adresu e-mail', 'Wróć do rejestracji i uzupełnij adres e-mail.');
      return;
    }
    
    router.push({
      pathname: '/features/verification/verification-screen',
      params: { email },
    });
  };

  // Wybór roli trenera
  const handleSelectTrainer = () => {
    console.log('Kliknieto trener');

    /*
    router.push({
      pathname: '/trainer-placeholder',
      params: { role: 'trener' },
    });
    */
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"/>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          {/* Przycisk powrotu w lewym górnym rogu */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={20} color="#111312" />
          </TouchableOpacity>

          {/* Nagłówek */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Kim jesteś?</Text>
            <Text style={styles.subtitle}>
              Wybierz swój profil, abyśmy mogli dopasować aplikację do Twoich potrzeb.
            </Text>
          </View>

          {/* Kontener z kartami wyboru */}
          <View style={styles.cardsContainer}>
            {/* Karta: Klient */}
            <TouchableOpacity
              style={styles.roleCard}
              activeOpacity={0.8}
              onPress={handleSelectClient}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={26} color="#168038" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Klient</Text>
                <Text style={styles.cardDescription}>
                  Chcę trenować, śledzić swoje postępy i współpracować z trenerem.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8C918F" />
            </TouchableOpacity>

            {/* Karta: Trener */}
            <TouchableOpacity
              style={styles.roleCard}
              activeOpacity={0.8}
              onPress={handleSelectTrainer}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="fitness-outline" size={26} color="#168038" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Trener</Text>
                <Text style={styles.cardDescription}>
                  Chcę zarządzać podopiecznymi, tworzyć plany treningowe i monitorować wyniki.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8C918F" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
  },
  topSection: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8ECE6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111312',
    lineHeight: 40,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#686D6A',
    lineHeight: 22,
  },
  cardsContainer: {
    gap: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8ECE6',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111312',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#686D6A',
    lineHeight: 18,
  },
});
