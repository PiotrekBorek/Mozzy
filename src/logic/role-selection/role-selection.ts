import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert } from 'react-native';

export function useRoleSelection() {
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

  return { handleSelectClient, handleSelectTrainer, handleBack: () => router.back() };
}
