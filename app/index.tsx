import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
import { theme } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';

type Tile = {
  title: string;
  subtitle: string;
  route?: string;
  disabled?: boolean;
};

const tiles: Tile[] = [
  {
    title: 'Reminders',
    subtitle: 'Stent / Nephrostomy / PSA',
    route: '/reminder',
  },
  {
    title: 'BAUS Leaflets',
    subtitle: 'Patient information QR codes',
    route: '/leaflets',
  },
  {
    title: 'Guideline Search',
    subtitle: 'EAU · NICE · AUA · GIRFT',
    route: '/guidelines',
  },
  {
    title: 'Scoring Systems',
    subtitle: 'MIMIC · EORTC · IDENTIFY · CPG',
    route: '/scoring',
  },
  {
    title: 'Emergency Reference',
    subtitle: 'Priapism · Penile Fracture',
    route: '/emergency',
  },
  {
    title: 'Settings',
    subtitle: 'Preferences',
    route: '/settings',
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Svg width={80} height={80} viewBox="0 0 150 150">
              <Rect width="150" height="150" rx="34" fill="#134E5E" />
              <Path d="M84 28 C90 36 108 60 112 86 A37 37 0 1 1 38 86 C42 60 60 36 66 28 C72 44 48 56 54 86 A21 21 0 0 0 96 86 C102 56 78 44 84 28 Z" fill="#2DD4BF" />
            </Svg>
          </View>
          <Text style={styles.brand}>MyUroPal</Text>
          <Text style={styles.tagline}>The urologist's companion</Text>
        </View>

        <View style={styles.grid}>
          {tiles.map((tile) => (
            <TouchableOpacity
              key={tile.title}
              style={[styles.tile, tile.disabled && styles.tileDisabled]}
              activeOpacity={tile.disabled ? 1 : 0.7}
              onPress={() => {
                if (!tile.disabled && tile.route) router.push(tile.route as never);
              }}
            >
              <Text style={[styles.tileTitle, tile.disabled && styles.tileTitleDisabled]}>
                {tile.title}
              </Text>
              <Text style={styles.tileSubtitle}>{tile.subtitle}</Text>
            </TouchableOpacity>
          ))}
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
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: theme.spacing.md,
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: theme.colors.text,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  grid: {
    gap: theme.spacing.md,
  },
  tile: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tileDisabled: {
    opacity: 0.5,
  },
  tileTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.accent,
    marginBottom: theme.spacing.xs,
  },
  tileTitleDisabled: {
    color: theme.colors.textSecondary,
  },
  tileSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});
