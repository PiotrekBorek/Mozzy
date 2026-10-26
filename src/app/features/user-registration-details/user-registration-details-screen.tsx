import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ScrollViewInstance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/shared/constants/theme';
import { Gender, months, useRegistrationDetails } from './user-registration-details';

const c = Colors.light;
const ROW = 44;
const titles = ['When were you born?', 'How do you identify?', 'How tall are you?', 'What’s your weight?'];
const descriptions = [
  'We use this to tailor training plans and to show your age on your coach profile.',
  'Pick the option that fits best. You can change it later in your profile.',
  'Almost done. This helps us keep your profile complete.',
  'Used to personalise your own training plan. Only you can see this.',
];
const options: { value: Gender; title: string; subtitle: string; icon: string }[] = [
  { value: 'female', title: 'Female', subtitle: 'She / her', icon: '♀' },
  { value: 'male', title: 'Male', subtitle: 'He / him', icon: '♂' },
  { value: 'other', title: 'Other', subtitle: 'Or prefer not to say', icon: '⊙' },
];
function Wheel({ label, values, index, onChange }: { label: string; values: string[]; index: number; onChange: (index: number) => void }) {
  const ref = useRef<ScrollViewInstance>(null);
  useEffect(() => { ref.current?.scrollTo({ y: index * ROW, animated: false }); }, [index]);
  const selectOffset = (offset: number) => onChange(Math.max(0, Math.min(values.length - 1, Math.round(offset / ROW))));
  return <View style={s.wheelColumn}>
    <Text style={s.wheelLabel}>{label}</Text>
    <ScrollView ref={ref} style={s.wheel} contentContainerStyle={{ paddingVertical: ROW * 2 }}
      showsVerticalScrollIndicator={false} snapToInterval={ROW} decelerationRate="fast" nestedScrollEnabled
      onMomentumScrollEnd={event => selectOffset(event.nativeEvent.contentOffset.y)}
      onScrollEndDrag={event => { if (!event.nativeEvent.velocity?.y) selectOffset(event.nativeEvent.contentOffset.y); }}>
      {values.map((value, i) => <Pressable key={value} onPress={() => onChange(i)} accessibilityRole="button"
        accessibilityLabel={`${label} ${value}`} accessibilityState={{ selected: i === index }} style={s.wheelRow}>
        <Text style={[s.wheelValue, { opacity: Math.abs(i - index) > 1 ? 0.3 : 1 }]}>{value}</Text>
      </Pressable>)}
    </ScrollView>
  </View>;
}
export default function RegistrationDetailsScreen() {
  const form = useRegistrationDetails();
  const firstYear = new Date().getFullYear() - 120;
  return <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
    <KeyboardAvoidingView style={s.safe} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={s.container}>
        <View style={s.navigation}>
          <Pressable onPress={form.back} disabled={form.saving} style={s.back} accessibilityRole="button" accessibilityLabel="Go back"><Text style={s.backText}>‹</Text></Pressable>
          <View style={s.progress}>{[0, 1, 2, 3].map(i => <View key={i} style={[s.segment, i <= form.step && s.activeSegment]} />)}</View>
          <Text style={s.counter}>{form.step + 1}/4</Text>
        </View>
        <Text style={s.title}>{titles[form.step]}</Text>
        <Text style={s.description}>{descriptions[form.step]}</Text>
        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={s.fields} pointerEvents={form.saving ? 'none' : 'auto'}>
            {form.step === 0 && <>
              <View style={s.wheels}>
                <View pointerEvents="none" style={s.selection} />
                <Wheel label="MONTH" values={months} index={form.month} onChange={form.setMonth} />
                <Wheel label="DAY" values={Array.from({ length: form.daysInMonth }, (_, i) => String(i + 1))} index={form.day - 1} onChange={i => form.setDay(i + 1)} />
                <Wheel label="YEAR" values={Array.from({ length: 121 }, (_, i) => String(firstYear + i))} index={form.year - firstYear} onChange={i => form.setYear(firstYear + i)} />
              </View>
              <Text style={s.age}>You’re {form.age} years old</Text>
            </>}
            {form.step === 1 && options.map(option => {
              const selected = form.gender === option.value;
              return <Pressable key={option.value} onPress={() => form.setGender(option.value)} accessibilityRole="radio" accessibilityState={{ checked: selected }}
                style={[s.genderCard, selected && s.selectedCard]}>
                <View style={[s.genderIcon, selected && { backgroundColor: c.white }]}><Text style={[s.symbol, selected && { color: c.primaryDark }]}>{option.icon}</Text></View>
                <View style={s.genderCopy}><Text style={s.genderTitle}>{option.title}</Text><Text style={s.genderSubtitle}>{option.subtitle}</Text></View>
                <View style={[s.radio, selected && s.checked]}>{selected && <Text style={s.check}>✓</Text>}</View>
              </Pressable>;
            })}
            {form.step === 2 && <>
              <View style={s.measurement}><TextInput accessibilityLabel="Height in centimeters" style={s.number} value={form.height} onChangeText={form.setHeight} keyboardType="decimal-pad" maxLength={6} selectTextOnFocus /><Text style={s.unit}>cm</Text></View>
              <Text style={s.hint}>{form.heightHint}</Text>
            </>}
            {form.step === 3 && <>
              <View style={s.toggle}>{(['kg', 'lb'] as const).map(unit => <Pressable key={unit} onPress={() => form.changeUnit(unit)} accessibilityRole="button" accessibilityState={{ selected: form.unit === unit }} style={[s.toggleButton, form.unit === unit && s.toggleActive]}><Text style={[s.toggleText, form.unit === unit && { color: c.white }]}>{unit}</Text></Pressable>)}</View>
              <View style={s.measurement}><TextInput accessibilityLabel={`Weight in ${form.unit}`} style={s.number} value={form.weight} onChangeText={form.setWeight} keyboardType="decimal-pad" maxLength={7} selectTextOnFocus /><Text style={s.unit}>{form.unit}</Text></View>
              <Text style={s.hint}>{form.weightHint}</Text>
            </>}
          </View>
        </ScrollView>
        {!!form.error && <Text accessibilityRole="alert" style={s.error}>{form.error}</Text>}
        <Pressable onPress={form.next} disabled={form.saving} accessibilityRole="button" style={[s.continue, form.saving && { opacity: 0.5 }]}>
          {form.saving ? <ActivityIndicator color={c.white} /> : <Text style={s.continueText}>{form.step === 3 ? 'Finish' : 'Continue'}  →</Text>}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.background },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16, width: '100%', maxWidth: 520, alignSelf: 'center' },
  navigation: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  back: { width: 34, height: 34, borderRadius: 11, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface, alignItems: 'center', justifyContent: 'center' }, backText: { fontSize: 25, color: c.ink, lineHeight: 28 },
  progress: { flex: 1, flexDirection: 'row', gap: 5 }, segment: { height: 3, flex: 1, backgroundColor: c.line }, activeSegment: { backgroundColor: c.primary },
  counter: { fontFamily: 'IBM-Light', fontSize: 10, color: c.inkFaint }, title: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: c.ink, marginBottom: 6 }, description: { fontFamily: 'Inter', fontSize: 12, lineHeight: 19, color: c.inkSoft },
  content: { flexGrow: 1, justifyContent: 'center', paddingVertical: 30 }, fields: { width: '100%' },
  wheels: { flexDirection: 'row', position: 'relative' }, wheelColumn: { flex: 1 }, wheelLabel: { height: 24, textAlign: 'center', fontFamily: 'IBM-Regular', fontSize: 9, letterSpacing: 1.2, color: c.inkFaint },
  wheel: { height: ROW * 5 }, wheelRow: { height: ROW, justifyContent: 'center', alignItems: 'center' }, wheelValue: { fontFamily: 'IBM-Light', fontSize: 18, color: c.ink },
  selection: { position: 'absolute', top: 24 + ROW * 2, height: ROW, left: 0, right: 0, borderRadius: 12, backgroundColor: c.surface2 },
  age: { alignSelf: 'center', marginTop: 26, paddingVertical: 7, paddingHorizontal: 14, borderRadius: 20, backgroundColor: c.primaryTint, color: c.primaryDark, fontFamily: 'Inter', fontSize: 11 },
  genderCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: c.line, borderRadius: 16, backgroundColor: c.surface, padding: 13, marginVertical: 5, minHeight: 70 }, selectedCard: { borderColor: c.primary, backgroundColor: c.primaryTint },
  genderIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: c.surface2, alignItems: 'center', justifyContent: 'center' }, symbol: { fontSize: 25, color: c.ink }, genderCopy: { flex: 1, marginLeft: 13 }, genderTitle: { fontFamily: 'Inter', fontSize: 13, fontWeight: '600', color: c.ink }, genderSubtitle: { fontFamily: 'Inter', fontSize: 10, color: c.inkSoft, marginTop: 3 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: c.line, alignItems: 'center', justifyContent: 'center' }, checked: { backgroundColor: c.primary, borderColor: c.primary }, check: { color: c.white, fontSize: 13 },
  measurement: { minHeight: 94, borderRadius: 18, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  number: { fontFamily: 'IBM-Medium', fontSize: 46, color: c.ink, textAlign: 'center', minWidth: 100, maxWidth: '80%', paddingVertical: 12 }, unit: { fontFamily: 'Inter', fontSize: 16, marginLeft: 10, color: c.inkSoft }, hint: { textAlign: 'center', fontFamily: 'Inter', fontSize: 11, color: c.inkFaint, marginTop: 10 },
  toggle: { alignSelf: 'center', flexDirection: 'row', borderRadius: 22, padding: 3, backgroundColor: c.surface2, marginBottom: 24 }, toggleButton: { minWidth: 50, paddingVertical: 7, alignItems: 'center', borderRadius: 20 }, toggleActive: { backgroundColor: c.ink }, toggleText: { fontFamily: 'Inter', fontSize: 11, color: c.inkSoft },
  error: { fontFamily: 'Inter', color: c.danger, fontSize: 12, marginBottom: 12 }, continue: { height: 44, borderRadius: 14, backgroundColor: c.ink, justifyContent: 'center', alignItems: 'center' }, continueText: { color: c.white, fontFamily: 'Inter', fontSize: 13, fontWeight: '700' },
});
