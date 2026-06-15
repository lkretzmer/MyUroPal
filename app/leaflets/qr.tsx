import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export default function LeafletQR() {
  const router = useRouter();
  const { title, pdfUrl } = useLocalSearchParams<{ title: string; pdfUrl: string }>();

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.qrWrap}>
          {pdfUrl ? <QRCode value={pdfUrl} size={280} backgroundColor="#FFFFFF" /> : null}
        </View>

        <Text style={styles.instructions}>
          Ask the patient to scan this code with their phone camera to open the BAUS information
          leaflet.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.back()} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Done</Text>
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
    alignItems: 'center',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  qrWrap: {
    padding: theme.spacing.lg,
    backgroundColor: '#FFF',
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginTop: theme.spacing.md,
  },
  instructions: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    lineHeight: 22,
  },
  button: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 18,
    borderRadius: theme.radius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
