import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { theme } from '../../constants/theme';

interface UserProfile {
  email?: string;
  hospital?: string;
  country?: string;
  jobType?: string;
  createdAt?: string;
}

export default function AnalyticsScreen() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    jobTypes: {} as Record<string, number>,
    countries: {} as Record<string, number>,
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData: UserProfile[] = [];
      const jobTypeCounts: Record<string, number> = {};
      const countryCounts: Record<string, number> = {};

      usersSnapshot.forEach((doc) => {
        const userData = doc.data() as UserProfile;
        usersData.push(userData);

        if (userData.jobType) {
          jobTypeCounts[userData.jobType] = (jobTypeCounts[userData.jobType] || 0) + 1;
        }
        if (userData.country) {
          countryCounts[userData.country] = (countryCounts[userData.country] || 0) + 1;
        }
      });

      setUsers(usersData);
      setStats({
        totalUsers: usersData.length,
        jobTypes: jobTypeCounts,
        countries: countryCounts,
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Moderator Analytics</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Users</Text>
          <Text style={styles.cardValue}>{stats.totalUsers}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Job Types</Text>
          {Object.entries(stats.jobTypes).map(([job, count]) => (
            <View key={job} style={styles.statRow}>
              <Text style={styles.statLabel}>{job}</Text>
              <Text style={styles.statValue}>{count}</Text>
            </View>
          ))}
          {Object.keys(stats.jobTypes).length === 0 && (
            <Text style={styles.empty}>No data yet</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Countries</Text>
          {Object.entries(stats.countries).map(([country, count]) => (
            <View key={country} style={styles.statRow}>
              <Text style={styles.statLabel}>{country}</Text>
              <Text style={styles.statValue}>{count}</Text>
            </View>
          ))}
          {Object.keys(stats.countries).length === 0 && (
            <Text style={styles.empty}>No data yet</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Users</Text>
          {users.slice(0, 5).map((user, index) => (
            <View key={index} style={styles.userRow}>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userJob}>{user.jobType}</Text>
            </View>
          ))}
          {users.length === 0 && (
            <Text style={styles.empty}>No users yet</Text>
          )}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  empty: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
  },
  userJob: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
