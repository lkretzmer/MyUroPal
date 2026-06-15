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

interface Guide {
  id: string;
  name: string;
  description: string;
  route: string;
}

const guides: Guide[] = [
  {
    id: 'priapism',
    name: 'Priapism',
    description: 'BAUS consensus for management of prolonged penile erection',
    route: '/emergency/priapism',
  },
  {
    id: 'penile-fracture',
    name: 'Penile Fracture',
    description: 'EAU/NICE guidelines for penile trauma management',
    route: '/emergency/penile-fracture',
  },
];

export default function EmergencyIndex() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = guides.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Emergency Reference</Text>

        <TextInput
          style={styles.search}
          placeholder="Search guides..."
          placeholderTextColor={theme.colors.textSecondary}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />

        <View style={styles.list}>
          {filtered.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              style={styles.card}
              onPress={() => router.push(guide.route)}
              activeOpacity={0.7}
            >
              <Text style={styles.name}>{guide.name}</Text>
              <Text style={styles.description}>{guide.description}</Text>
            </TouchableOpacity>
          ))}

          {filtered.length === 0 && (
            <Text style={styles.empty}>No guides found</Text>
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
