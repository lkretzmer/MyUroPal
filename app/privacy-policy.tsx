import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.date}>Last updated: June 2026</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>1. Introduction</Text>
          <Text style={styles.text}>
            MyUroPal ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use our mobile application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. Information We Collect</Text>
          <Text style={styles.subheading}>Account Information:</Text>
          <Text style={styles.text}>• Email address (for authentication and account recovery)</Text>
          <Text style={styles.subheading}>Professional Information:</Text>
          <Text style={styles.text}>• Hospital/Institution (optional)</Text>
          <Text style={styles.text}>• Country (optional)</Text>
          <Text style={styles.text}>• Job type (Nurse, HCA, CNS, Trainee, Consultant, etc.)</Text>
          <Text style={styles.subheading}>Usage Data:</Text>
          <Text style={styles.text}>• App usage patterns (for audit and improvement purposes)</Text>
          <Text style={styles.text}>• Leaflet views and guideline searches</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. How We Use Your Information</Text>
          <Text style={styles.text}>We use your information solely for:</Text>
          <Text style={styles.text}>• Providing and maintaining your account</Text>
          <Text style={styles.text}>• Analyzing app usage for audit purposes</Text>
          <Text style={styles.text}>• Improving the app's functionality and user experience</Text>
          <Text style={styles.text}>• Understanding which features are most useful to healthcare professionals</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>4. Data Storage and Security</Text>
          <Text style={styles.text}>
            Your data is stored securely using Firebase (Google's cloud platform). We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>5. Data Retention</Text>
          <Text style={styles.text}>
            We retain your personal information only as long as necessary for the purposes outlined in this policy. You may request deletion of your account and associated data at any time through the app's settings.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>6. Your Rights</Text>
          <Text style={styles.text}>Under GDPR, you have the right to:</Text>
          <Text style={styles.text}>• Access your personal data</Text>
          <Text style={styles.text}>• Correct inaccurate data</Text>
          <Text style={styles.text}>• Request deletion of your data</Text>
          <Text style={styles.text}>• Withdraw consent at any time</Text>
          <Text style={styles.text}>• Data portability</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>7. Third-Party Services</Text>
          <Text style={styles.text}>
            We use Firebase (Google) for authentication, database storage, and analytics. Google's privacy policy applies to data processed through their services.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>8. Children's Privacy</Text>
          <Text style={styles.text}>
            This app is intended for healthcare professionals. We do not knowingly collect information from children under 18.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>9. Changes to This Policy</Text>
          <Text style={styles.text}>
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this screen.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>10. Contact Us</Text>
          <Text style={styles.text}>
            If you have questions about this privacy policy or your personal data, please contact us through the app's settings or at: [your email address]
          </Text>
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
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  date: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  section: {
    gap: theme.spacing.sm,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginTop: theme.spacing.sm,
  },
  text: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
});
