import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

const RESEND_API_KEY = process.env.EXPO_PUBLIC_RESEND_API_KEY; 
const RESEND_SECONDS = 60;

async function sendEmailViaResend(email: string, code: string) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', 
        to: [email],
        subject: 'Twój kod weryfikacyjny',
        html: `<p>Twój kod weryfikacyjny to: <strong>${code}</strong></p>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Nie udało się wysłać maila przez Resend');
    }
    return { success: true, data };
  } catch (error: any) {
    console.error('Błąd Resend:', error);
    return { success: false, message: error.message };
  }
}

export function useVerification(email: string) {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (email) {
      triggerSendCode(email);
    }
  }, [email]);

  const triggerSendCode = async (targetEmail: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);

    const result = await sendEmailViaResend(targetEmail, code);
    if (!result.success) {
      Alert.alert('Błąd', result.message);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || !email) return;
    await triggerSendCode(email);
    setSecondsLeft(RESEND_SECONDS);
    Alert.alert('Sukces', 'Wysłano nowy kod.');
  };

  const verifyCode = async (inputCode: string) => {
    if (!inputCode || inputCode.length < 6) {
      Alert.alert('Błąd', 'Wprowadź pełny 6-cyfrowy kod.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (inputCode === generatedCode) {
        Alert.alert('Sukces', 'Kod prawidłowy! Zweryfikowano pomyślnie.');
        router.replace('/');
      } else {
        Alert.alert('Błąd', 'Wprowadzony kod jest nieprawidłowy.');
      }
    }, 500);
  };

  return {
    secondsLeft,
    loading,
    handleResend,
    verifyCode,
  };
}
