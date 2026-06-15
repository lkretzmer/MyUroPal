import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../constants/theme';
import { categories, leaflets } from '../../data/bausLeaflets';

export default function LeafletBrowser() {
  const router = useRouter();
  const { user } = useAuth();
  const [category, setCategory] = useState<string>('Favorites');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const allCategories = ['Favorites', ...categories];
  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    if (searching) {
      const q = query.trim().toLowerCase();
      // Search across ALL categories
      return leaflets.filter((l) => l.title.toLowerCase().includes(q));
    }
    if (category === 'Favorites') {
      return leaflets.filter((l) => favorites.has(l.title));
    }
    return leaflets.filter((l) => l.category === category);
  }, [category, query, searching, favorites]);

  const toggleFavorite = (leafletTitle: string) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    const newFavorites = new Set(favorites);
    if (newFavorites.has(leafletTitle)) {
      newFavorites.delete(leafletTitle);
    } else {
      newFavorites.add(leafletTitle);
    }
    setFavorites(newFavorites);
    // TODO: Save to Firestore
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search all leaflets..."
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {!searching && (
        <View style={styles.tabsWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
            {allCategories.map((c) => {
              const active = c === category;
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.tab, active && styles.tabActive]}
                  onPress={() => setCategory(c)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{c}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.category + item.title}
        ListEmptyComponent={
          <Text style={styles.empty}>No leaflets match your search.</Text>
        }
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
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>{item.title}</Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(item.title)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              activeOpacity={0.7}
            >
              <Text style={[styles.favoriteIcon, favorites.has(item.title) && styles.favoriteIconActive]}>
                {favorites.has(item.title) ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.rowChevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchWrap: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  empty: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontSize: 15,
    marginTop: theme.spacing.xl,
  },
  tabsWrap: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  tabs: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tabActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  tabLabelActive: {
    color: '#FFF',
  },
  list: {
    padding: theme.spacing.md,
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
  rowContent: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  rowTitle: {
    fontSize: 15,
    color: theme.colors.text,
  },
  favoriteButton: {
    padding: theme.spacing.sm,
  },
  favoriteIcon: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  favoriteIconActive: {
    color: '#FFD700',
  },
  rowChevron: {
    fontSize: 22,
    color: theme.colors.textSecondary,
  },
});
