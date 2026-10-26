import { useState } from 'react';
import { supabase } from '@/config/supabase';

type PendingRegistration = { email: string; password: string; firstName: string; lastName: string };
// Memory only: never put passwords in navigation params or persistent storage.
let pendingRegistration: PendingRegistration | null = null;
let registrationInProgress = false;

export async function completePendingRegistration(email: string) {
  if (registrationInProgress) throw new Error('Rejestracja już trwa.');
  const pending = pendingRegistration;
  if (!pending || pending.email !== email.trim().toLowerCase()) {
    throw new Error('Dane rejestracji wygasły. Wróć do formularza i uzupełnij go ponownie.');
  }
  registrationInProgress = true;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: pending.email,
      password: pending.password,
      options: { data: { first_name: pending.firstName, last_name: pending.lastName } },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Nie udało się utworzyć konta.');
    if (pendingRegistration === pending) pendingRegistration = null;
    if (!data.session) {
      throw new Error('Brak sesji. Zaloguj się lub sprawdź ustawienie Confirm email w Supabase.');
    }
  } finally {
    registrationInProgress = false;
  }
}

interface SignUpErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  general?: string;
}

export function useSignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((visible) => !visible);
    };

  const [confirmPassword, setConfirmPassword] = useState('');

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<SignUpErrors>({});

  // Validate registration form

  const validateForm = (): boolean => {
    const newErrors: SignUpErrors = {};

    // Full name validation

    const nameParts = fullName.trim().split(/\s+/);

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (nameParts.length < 2) {
      newErrors.fullName = 'Please enter your first and last name';
    }

    // Email validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password =
        'Password must contain at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        'Password must contain an uppercase letter';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password =
        'Password must contain a number';
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      newErrors.password =
        'Password must contain a special character';
    }

    // Confirm password

    if (!confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        'Passwords do not match';
    }

    // Terms validation

    if (!acceptedTerms) {
      newErrors.terms =
        'You must accept the Terms of Service';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Register user

  const registerUser = async (): Promise<boolean> => {
    if (loading) return false;

    setErrors({});

    if (!validateForm()) {
      return false;
    }

    setLoading(true);

    try {
      const nameParts = fullName.trim().split(/\s+/);

      const firstName = nameParts[0];

      const lastName = nameParts.slice(1).join(' ');

      const normalizedEmail = email.trim().toLowerCase();

      pendingRegistration = { email: normalizedEmail, password, firstName, lastName };

      return true;
    } catch (error) {
      console.error('Registration error:', error);

      setErrors({
        general: 'Something went wrong. Please try again.',
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,

    email,
    setEmail,

    password,
    isPasswordVisible,

    togglePasswordVisibility,
    setPassword,

    confirmPassword,
    setConfirmPassword,

    acceptedTerms,
    setAcceptedTerms,

    loading,
    errors,

    registerUser,
  };
}
