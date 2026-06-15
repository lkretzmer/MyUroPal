import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from '@react-native-community/voice';
import { theme } from '../../constants/theme';
import {
  GuidelineSource,
  SearchResult,
  searchGuidelines,
} from '../../services/guidelineSearch';

const STORAGE_KEY = 'preferredGuidelineSources';
const DEFAULT_SOURCES: GuidelineSource[] = ['EAU', 'NICE'];

const allSources: GuidelineSource[] = ['EAU', 'NICE', 'AUA', 'GIRFT'];

export default function GuidelineSearch() {
  const [query, setQuery] = useState('');
  const [sources, setSources] = useState<GuidelineSource[]>(DEFAULT_SOURCES);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    loadPreferences();
    
    Voice.onSpeechStart = () => {
      console.log('Speech started');
      setIsRecording(true);
    };
    Voice.onSpeechEnd = () => {
      console.log('Speech ended');
      setIsRecording(false);
    };
    Voice.onSpeechResults = (e) => {
      console.log('Speech results:', e);
      if (e.value && e.value.length > 0) {
        setQuery(e.value[0]);
      }
    };
    Voice.onSpeechError = (e) => {
      console.error('Speech error:', e);
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners).catch(console.error);
    };
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

  const toggleSource = (s: GuidelineSource) => {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleRecording = async () => {
    console.log('Toggle recording called, isRecording:', isRecording);
    
    try {
      if (isRecording) {
        console.log('Stopping recording');
        await Voice.stop();
      } else {
        console.log('Starting recording');
        const isRecognizing = await Voice.isRecognizing();
        console.log('Is recognizing:', isRecognizing);
        
        if (isRecognizing) {
          await Voice.stop();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        await Voice.destroy();
        await new Promise(resolve => setTimeout(resolve, 500));
        await Voice.start('en-US');
      }
    } catch (e) {
      console.error('Toggle recording error:', e);
      setIsRecording(false);
      setError('Failed to access microphone. Please check permissions.');
    }
  };

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    Keyboard.dismiss();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await searchGuidelines(query.trim(), sources);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Search failed.');
    } finally {
      setLoading(false);
    }
  };

  const canSearch = query.trim().length > 0 && sources.length > 0 && !loading;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask a clinical guideline question..."
            placeholderTextColor={theme.colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            multiline
            autoCorrect={false}
          />
          <TouchableOpacity
            style={[styles.micBtn, isRecording && styles.micBtnActive]}
            onPress={toggleRecording}
            activeOpacity={0.7}
          >
            <Text style={styles.micIcon}>{isRecording ? '●' : '🎤'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sourcesRow}>
          {allSources.map((s) => {
            const active = sources.includes(s);
            return (
              <TouchableOpacity
                key={s}
                style={[styles.sourceBox, active && styles.sourceBoxActive]}
                onPress={() => toggleSource(s)}
                activeOpacity={0.7}
              >
                <Text style={[styles.sourceLabel, active && styles.sourceLabelActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.searchBtn, !canSearch && styles.searchBtnDisabled]}
          onPress={handleSearch}
          disabled={!canSearch}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.searchBtnText}>Search Guidelines</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.answer}>{result.answer}</Text>

            {result.citations.length > 0 && (
              <View style={styles.refs}>
                <Text style={styles.refsHeading}>References</Text>
                {result.citations.map((c) => (
                  <TouchableOpacity
                    key={c.url}
                    onPress={() => Linking.openURL(c.url)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.refLink}>{c.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        <Text style={styles.disclaimer}>
          AI-generated summary. Always verify against the original guideline before making
          clinical decisions.
        </Text>
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
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  micBtn: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    width: 48,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micBtnActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  micIcon: {
    fontSize: 20,
  },
  sourcesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  sourceBox: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
  sourceBoxActive: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.accent,
  },
  sourceLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  sourceLabelActive: {
    color: '#FFF',
  },
  searchBtn: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 16,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  searchBtnDisabled: {
    opacity: 0.4,
  },
  searchBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: theme.colors.danger,
    fontSize: 14,
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  answer: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 23,
  },
  refs: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  refsHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  refLink: {
    fontSize: 14,
    color: theme.colors.accent,
    textDecorationLine: 'underline',
  },
  disclaimer: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    lineHeight: 18,
  },
});
