import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const jobTypes = [
  'Consultant',
  'Trainee (Registrar)',
  'SHO',
  'Nurse',
  'HCA',
  'CNS',
  'Medical Student',
  'Other',
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [hospital, setHospital] = useState('');
  const [country, setCountry] = useState('');
  const [jobType, setJobType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!jobType) {
      Alert.alert('Required', 'Please select your job type');
      return;
    }

    setLoading(true);
    try {
      // Save user profile to Firestore
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          hospital: hospital || null,
          country: country || null,
          jobType,
          createdAt: new Date().toISOString(),
        });
      }
      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to MyUroPal</Text>
        <Text style={styles.subtitle}>
          Please provide some information to help us improve the app
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Hospital/Institution (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter hospital name"
            placeholderTextColor={theme.colors.textSecondary}
            value={hospital}
            onChangeText={setHospital}
          />

          <Text style={styles.label}>Country (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            placeholderTextColor={theme.colors.textSecondary}
            value={country}
            onChangeText={setCountry}
          />

          <Text style={styles.label}>Job Type *</Text>
          <View style={styles.jobTypeGrid}>
            {jobTypes.map((jt) => (
              <TouchableOpacity
                key={jt}
                style={[styles.jobTypeButton, jobType === jt && styles.jobTypeButtonActive]}
                onPress={() => setJobType(jt)}
                activeOpacity={0.7}
              >
                <Text style={[styles.jobTypeText, jobType === jt && styles.jobTypeTextActive]}>
                  {jt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleComplete}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Continue'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/privacy-policy')}
            style={styles.privacyLink}
            activeOpacity={0.7}
          >
            <Text style={styles.privacyText}>View Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  form: {
    gap: theme.spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  jobTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  jobTypeButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 100,
  },
  jobTypeButtonActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  jobTypeText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
  jobTypeTextActive: {
    color: '#FFF',
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyLink: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  privacyText: {
    color: theme.colors.accent,
    fontSize: 14,
  },
});
