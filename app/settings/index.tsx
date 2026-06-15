import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { GuidelineSource } from '../../services/guidelineSearch';
import { useAuth } from '../../contexts/AuthContext';
import { deleteUser } from 'firebase/auth';

const STORAGE_KEY = 'preferredGuidelineSources';
const DEFAULT_SOURCES: GuidelineSource[] = ['EAU', 'NICE'];

const allSources: GuidelineSource[] = ['EAU', 'NICE', 'AUA', 'GIRFT'];

const sourceDescriptions: Record<GuidelineSource, string> = {
  EAU: 'European Association of Urology',
  NICE: 'National Institute for Health and Care Excellence',
  AUA: 'American Urological Association',
  GIRFT: 'Getting It Right First Time',
};

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sources, setSources] = useState<GuidelineSource[]>(DEFAULT_SOURCES);

  // TODO: Replace with actual moderator email check
  const isModerator = user?.email === 'l.kretzmer@nhs.net';

  const handleDeleteAccount = () => {
    if (!user) {
      Alert.alert('Error', 'No user logged in');
      return;
    }
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteUser(user);
              logout();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete account');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSources(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load preferences', e);
    }
  };

  const savePreferences = async (newSources: GuidelineSource[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSources));
      setSources(newSources);
    } catch (e) {
      console.error('Failed to save preferences', e);
    }
  };

  const toggleSource = (s: GuidelineSource) => {
    const newSources = sources.includes(s)
      ? sources.filter((x) => x !== s)
      : [...sources, s];
    if (newSources.length > 0) {
      savePreferences(newSources);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferred Guidelines</Text>
          <Text style={styles.sectionSubtitle}>
            Select which guideline sources to search by default
          </Text>

          <View style={styles.sourceList}>
            {allSources.map((s) => {
              const active = sources.includes(s);
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.sourceRow, active && styles.sourceRowActive]}
                  onPress={() => toggleSource(s)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, active && styles.checkboxActive]}>
                    {active && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <View style={styles.sourceInfo}>
                    <Text style={[styles.sourceName, active && styles.sourceNameActive]}>
                      {s}
                    </Text>
                    <Text style={styles.sourceDesc}>{sourceDescriptions[s]}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.note}>
            At least one guideline source must be selected
          </Text>
        </View>

        {isModerator && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Moderator Analytics</Text>
            <Text style={styles.sectionSubtitle}>
              View app usage statistics
            </Text>

            <TouchableOpacity
              style={styles.analyticsButton}
              onPress={() => router.push('/analytics')}
              activeOpacity={0.7}
            >
              <Text style={styles.analyticsButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
          <Text style={styles.note}>
            This will permanently delete your account and all associated data
          </Text>
        </View>
      </View>
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
  section: {
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  sourceList: {
    gap: theme.spacing.sm,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  sourceRowActive: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentLight,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  sourceInfo: {
    flex: 1,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sourceNameActive: {
    color: theme.colors.accent,
  },
  sourceDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  note: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  analyticsButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  analyticsButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
