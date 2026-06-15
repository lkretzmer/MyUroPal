import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export default function PriapismGuide() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Priapism</Text>
        <Text style={styles.source}>BAUS Consensus Document</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definition</Text>
          <Text style={styles.text}>
            Prolonged penile erection lasting more than 4 hours without sexual stimulation. It persists despite ejaculation and orgasm and requires urgent medical intervention to preserve erectile function.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Classification</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• <Text style={styles.bold}>Ischaemic (low-flow)</Text>: Painful, rigid erection that worsens over time</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• <Text style={styles.bold}>Non-ischaemic (high-flow)</Text>: Painless or uncomfortable, often after perineal trauma</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• <Text style={styles.bold}>Stuttering</Text>: Recurrent prolonged erections, common in sickle cell disease</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical History</Text>
          <Text style={styles.text}>Establish duration and categorize:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Duration {"<"} 48 hours</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Duration 48-72 hours</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Duration {">"} 72 hours</Text>
          </View>
          <Text style={[styles.text, { marginTop: theme.spacing.sm }]}>
            Key points: Onset timing, haematological disorders, current medications, illicit drug use, symptoms of pelvic malignancy, previous episodes, perineal or penile trauma, neurological symptoms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examination</Text>
          <Text style={styles.text}>Perform comprehensive examination including abdomen, rectum, penis, and neurological assessment.</Text>
          <Text style={[styles.text, { marginTop: theme.spacing.sm }]}>
            Ischaemic: Painful rigid erection with increasing pain over time.
          </Text>
          <Text style={styles.text}>
            Non-ischaemic: Painless or uncomfortable, often with evidence of perineal or penile trauma.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investigations</Text>
          <Text style={styles.bold}>Blood Tests:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Full blood count and blood film for haematological disorders</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Autoimmune screen</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Blood gas analysis of corporal aspirate</Text>
          </View>
          <Text style={[styles.bold, { marginTop: theme.spacing.sm }]}>Imaging:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Urgent penile Doppler ultrasound</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• CT or MRI abdomen/pelvis if pelvic malignancy suspected</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Penile MRI for refractory cases to assess cavernosal viability</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Algorithm</Text>
          
          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Duration {"<"} 48 hours</Text>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Provide adequate analgesia and antibiotics</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Perform corporal blood aspiration (diagnostic and therapeutic)</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Instill phenylephrine (200-250µg aliquots, maximum 1000µg)</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• If unsuccessful: Perform distal shunt (Winter or T-shunt)</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• If still unsuccessful: Tunnelling procedure or specialist referral</Text>
            </View>
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Duration 48-72 hours</Text>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Attempt aspiration with phenylephrine if duration uncertain</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Perform distal shunts</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• If unsuccessful: Consider TTT shunt or urgent specialist referral</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• If imaging shows no perfusion: Discuss penile prosthesis</Text>
            </View>
          </View>

          <View style={styles.subsection}>
            <Text style={styles.subsectionTitle}>Duration {">"} 72 hours</Text>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Cavernosal smooth muscle viability unlikely</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Attempt aspiration with phenylephrine if duration uncertain</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Urgent referral to specialist andrology unit</Text>
            </View>
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>• Consider early penile prosthesis insertion</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Non-Ischaemic Priapism</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Initial conservative management</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Duplex compression of fistula if identified</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• If unresolved: Superselective arteriography with absorbable embolization</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stuttering Priapism</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Antiandrogens for idiopathic cases (avoid in prepubertal boys)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Etilefrine for sickle cell disease (named patient basis)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Joint management with haematology team for sickle cell patients</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow-Up</Text>
          <Text style={styles.text}>
            Long-term monitoring for erectile dysfunction. Initial treatment with PDE5 inhibitors or intracavernosal prostaglandins. For refractory cases, consider penile prosthesis in specialist centre.
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Based on BAUS consensus principles. Clinical judgment should always guide management decisions.
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  source: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
  section: {
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.accent,
  },
  subsection: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.xs,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  text: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
  },
  bullet: {
    paddingLeft: theme.spacing.sm,
  },
  bulletText: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 22,
  },
  disclaimer: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: theme.spacing.lg,
  },
});
