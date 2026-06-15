import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';
import { buildReminderICS, ReminderType } from '../../utils/ics';

type Period = { label: string; days: number };

const periods: Period[] = [
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '3 weeks', days: 21 },
  { label: '4 weeks', days: 28 },
  { label: '6 weeks', days: 42 },
  { label: '2 months', days: 60 },
  { label: '3 months', days: 91 },
  { label: '4 months', days: 122 },
  { label: '5 months', days: 152 },
  { label: '6 months', days: 183 },
  { label: '9 months', days: 274 },
  { label: '12 months', days: 365 },
  { label: '18 months', days: 548 },
  { label: '24 months', days: 730 },
];

const reminderTypes: { value: ReminderType; label: string; description: string }[] = [
  {
    value: 'stent',
    label: 'Stent / Nephrostomy',
    description: 'Reminder to confirm removal or contact hospital',
  },
  {
    value: 'psa',
    label: 'PSA Blood Test',
    description: 'Reminder to attend for blood test',
  },
];

export default function ReminderSetup() {
  const router = useRouter();
  const [reminderType, setReminderType] = useState<ReminderType>('stent');
  const [periodIndex, setPeriodIndex] = useState(7); // default 4 months

  const reminderDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + periods[periodIndex].days);
    return d;
  }, [periodIndex]);

  const formattedDate = reminderDate.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleGenerate = () => {
    const ics = buildReminderICS(reminderType, reminderDate);
    router.push({ pathname: '/reminder/qr', params: { ics, type: reminderType, date: formattedDate } });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.body}>
        <View style={styles.instructions}>
          <Text style={styles.instructionsText}>
            Set when the patient needs a reminder, then generate a QR code for the patient to scan with their phone.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Reminder Type</Text>
          <View style={styles.segmented}>
            {reminderTypes.map((rt) => {
              const active = reminderType === rt.value;
              return (
                <TouchableOpacity
                  key={rt.value}
                  style={[styles.segment, active && styles.segmentActive]}
                  onPress={() => setReminderType(rt.value)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>
                    {rt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.helper}>
            {reminderTypes.find((r) => r.value === reminderType)?.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Reminder Period</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={periodIndex}
              onValueChange={(v) => setPeriodIndex(v)}
              itemStyle={styles.pickerItem}
            >
              {periods.map((p, i) => (
                <Picker.Item key={p.label} label={p.label} value={i} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Reminder will be set for</Text>
          <Text style={styles.previewDate}>{formattedDate}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate} activeOpacity={0.85}>
        <Text style={styles.generateBtnText}>Generate QR Code</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  body: {
    gap: theme.spacing.xl,
  },
  instructions: {
    backgroundColor: theme.colors.accentLight,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  instructionsText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  section: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: theme.colors.accent,
  },
  segmentLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text,
  },
  segmentLabelActive: {
    color: '#FFF',
  },
  helper: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.xs,
  },
  pickerWrap: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    height: Platform.OS === 'ios' ? 180 : 56,
    justifyContent: 'center',
  },
  pickerItem: {
    fontSize: 20,
    color: theme.colors.text,
  },
  preview: {
    backgroundColor: theme.colors.accentLight,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  previewDate: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  generateBtn: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 18,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  generateBtnText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
