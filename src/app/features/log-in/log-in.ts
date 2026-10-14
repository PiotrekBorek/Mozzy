import { useState } from 'react';
import { supabase } from '@/config/supabase';

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (email: string, password?: string): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!password || !password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const authenticateUser = async (email: string, password?: string): Promise<boolean> => {
    setLoading(true);
    setErrors({});

    try {
      if (!validateForm(email, password)) {
        setLoading(false);
        return false;
      }

      const normalizedEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password ?? '',
      });

      if (error || !data.user) {
        console.error('Supabase signin failed:', error?.message);
        setErrors({ general: 'Invalid email or password' });
        return false;
      }

      return true;
    } catch (err) {
      console.error('Błąd logowania:', err);
      setErrors({ general: 'Something went wrong. Please try again.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    authenticateUser,
    loading,
    errors,
    setErrors,
  };
}