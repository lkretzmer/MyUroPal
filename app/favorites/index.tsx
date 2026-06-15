import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import { leaflets } from '../../data/bausLeaflets';

export default function FavoritesScreen() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <View style={styles.content}>
          <Text style={styles.title}>Favorites</Text>
          <Text style={styles.message}>Please sign in to view your favorite leaflets</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // TODO: Load favorites from Firestore
  const favorites: string[] = [];

  const favoriteLeaflets = leaflets.filter((l) => favorites.includes(l.title));

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.content}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>
          {favoriteLeaflets.length} {favoriteLeaflets.length === 1 ? 'leaflet' : 'leaflets'} saved
        </Text>

        {favoriteLeaflets.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No favorite leaflets yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the star icon on any leaflet to add it to your favorites
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoriteLeaflets}
            keyExtractor={(item) => item.category + item.title}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/leaflets/qr',
                    params: { title: item.title, pdfUrl: item.pdfUrl },
                  })
                }
              >
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowChevron}>›</Text>
              </TouchableOpacity>
            )}
          />
        )}
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
    flex: 1,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  message: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  list: {
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 14,
    paddingHorizontal: theme.spacing.md,
  },
  rowTitle: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
    marginRight: theme.spacing.sm,
  },
  rowChevron: {
    fontSize: 22,
    color: theme.colors.textSecondary,
  },
});
