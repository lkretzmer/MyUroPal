import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';

interface Calculator {
  id: string;
  name: string;
  description: string;
  route: string;
}

const calculators: Calculator[] = [
  {
    id: 'mimic',
    name: 'MIMIC Stone Passage',
    description: 'Predicts likelihood of spontaneous ureteral stone passage',
    route: '/scoring/mimic',
  },
  {
    id: 'eortc',
    name: 'EORTC Bladder Cancer Risk',
    description: 'Risk stratification for non-muscle invasive bladder cancer',
    route: '/scoring/eortc',
  },
  {
    id: 'identify',
    name: 'IDENTIFY Haematuria',
    description: 'Risk calculator for haematuria patients',
    route: '/scoring/identify',
  },
  {
    id: 'cpg',
    name: 'Cambridge Prognostic Groups',
    description: 'Prognostic grouping for prostate cancer',
    route: '/scoring/cpg',
  },
];

export default function ScoringIndex() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = calculators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Scoring Systems</Text>

        <TextInput
          style={styles.search}
          placeholder="Search calculators..."
          placeholderTextColor={theme.colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />

        <View style={styles.list}>
          {filtered.map((calc) => (
            <TouchableOpacity
              key={calc.id}
              style={styles.card}
              onPress={() => router.push(calc.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.name}>{calc.name}</Text>
              <Text style={styles.description}>{calc.description}</Text>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <Text style={styles.empty}>No calculators found</Text>
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
  scroll: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  search: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  list: {
    gap: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  empty: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
});
