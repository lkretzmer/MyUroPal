import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { theme } from '../../constants/theme';

export default function MIMICCalculator() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <WebView
        source={{ uri: 'https://bursturologycollaborative.github.io' }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  webview: {
    flex: 1,
  },
});
