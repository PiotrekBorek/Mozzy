import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/config/supabase';

export type Gender = 'female' | 'male' | 'other';
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function ageAt(date: Date, today = new Date()) {
  return today.getFullYear() - date.getFullYear() - (today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate()) ? 1 : 0);
}
export function measurement(text: string) {
  return /^\d+([.,]\d+)?$/.test(text.trim()) ? Number(text.trim().replace(',', '.')) : NaN;
}

export function useRegistrationDetails() {
  const router = useRouter();
  const now = new Date();
  const [step, setStep] = useState(0);
  const [year, setYear] = useState(now.getFullYear() - 18);
  const [month, setMonth] = useState(now.getMonth());
  const [day, setDay] = useState(1);
  const [gender, setGender] = useState<Gender | null>(null);
  const [height, setHeight] = useState('172');
  const [weight, setWeight] = useState('76.0');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  // Keep the same measurement timestamp when retrying a failed/uncertain request.
  const pending = useRef<{ authId: string; measuredAt: string; weightKg: number } | null>(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const selectedDay = Math.min(day, daysInMonth);
  const birth = new Date(year, month, selectedDay);
  const age = ageAt(birth);
  const cm = measurement(height);
  const kg = measurement(weight) / (unit === 'lb' ? 2.2046226218 : 1);
  const inches = Math.round(cm / 2.54);

  const changeUnit = (next: 'kg' | 'lb') => {
    if (next === unit) return;
    const value = measurement(weight);
    if (Number.isFinite(value)) setWeight((next === 'lb' ? value * 2.2046226218 : value / 2.2046226218).toFixed(1));
    setUnit(next);
  };
  const next = async () => {
    if (busy.current) return;
    setError('');
    if (birth > now || age < 0 || age > 120) return setError('Choose a valid birth date.');
    if (step >= 1 && !gender) return setError('Choose an option to continue.');
    if (step >= 2 && (!Number.isFinite(cm) || cm < 50 || cm > 300)) return setError('Enter a height between 50 and 300 cm.');
    if (step < 3) { setStep(step + 1); return; }
    if (!Number.isFinite(kg) || kg < 10 || kg > 500) return setError('Enter a weight between 10 and 500 kg.');
    busy.current = true;
    setSaving(true);
    try {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (authError || !auth.user) throw new Error('No active session. Please log in before saving your details.');
      const user = auth.user;
      const { data: profile, error: profileError } = await supabase.from('users').select('id').eq('auth_user_id', user.id).maybeSingle();
      if (profileError) throw profileError;
      let clientId = profile?.id;
      if (!clientId) {
        // A signup trigger may already have created this row; never match another account by email.
        const { data: created, error: createError } = await supabase.from('users').insert({
          auth_user_id: user.id, email: user.email,
          first_name: user.user_metadata.first_name ?? '', last_name: user.user_metadata.last_name ?? '',
        }).select('id').single();
        if (createError) throw createError;
        clientId = created.id;
      }
      const { error: clientError } = await supabase.from('clients').upsert({
        id: clientId,
        birth_date: `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
        gender, height_cm: cm,
      }, { onConflict: 'id' });
      if (clientError) throw clientError;
      if (!pending.current || pending.current.authId !== user.id) {
        pending.current = { authId: user.id, measuredAt: new Date().toISOString(), weightKg: Math.round(kg * 100) / 100 };
      }
      const attempt = pending.current;
      const { data: existing, error: historyError } = await supabase.from('weight_history').select('id')
        .eq('client_id', clientId).eq('measured_at', attempt.measuredAt).limit(1);
      if (historyError) throw historyError;
      if (!existing?.length) {
        attempt.weightKg = Math.round(kg * 100) / 100;
        const { error: weightError } = await supabase.from('weight_history').insert({
          client_id: clientId, recorded_by: clientId, weight_kg: attempt.weightKg, measured_at: attempt.measuredAt,
        });
        if (weightError) throw weightError;
      }
      router.replace('/');
    } catch (cause) {
      const message = cause && typeof cause === 'object' && 'message' in cause ? String(cause.message) : 'Please try again.';
      setError(`Could not save your details. ${message}`);
    } finally { busy.current = false; setSaving(false); }
  };
  return { step, year, month, day: selectedDay, daysInMonth, age, gender, height, weight, unit, saving, error,
    setYear, setMonth, setDay, setGender, setHeight, setWeight, changeUnit, next,
    back: () => { if (!busy.current) { setError(''); if (step > 0) setStep(step - 1); else router.back(); } },
    heightHint: Number.isFinite(cm) ? `${Math.floor(inches / 12)} ft ${inches % 12} in` : '',
    weightHint: Number.isFinite(kg) ? `≈ ${(unit === 'kg' ? kg * 2.2046226218 : kg).toFixed(1)} ${unit === 'kg' ? 'lb' : 'kg'}` : '',
  };
}
