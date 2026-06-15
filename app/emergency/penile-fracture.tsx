import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../constants/theme';

export default function PenileFractureGuide() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Penile Fracture</Text>
        <Text style={styles.source}>EAU/NICE Guidelines</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Definition</Text>
          <Text style={styles.text}>
            Traumatic rupture of the tunica albuginea of the corpus cavernosum, usually due to blunt trauma to an erect penis. Urological emergency requiring prompt evaluation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical History</Text>
          <Text style={styles.text}>Key points to establish:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Mechanism of injury (typically during intercourse or masturbation)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Timing of injury</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Presence of "snap" or cracking sound</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Immediate detumescence</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Pain and swelling</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Difficulty urinating or visible blood at urethral meatus</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• History of previous penile trauma or surgery</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examination Findings</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• <Text style={styles.bold}>"Rolling sign"</Text>: Hematoma causing penile shaft deviation away from fracture site</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Penile deformity (angulation, swelling, ecchymosis)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Tender palpable defect in tunica albuginea</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Butterfly-shaped hematoma (if Buck's fascia intact)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Scrotal/perineal ecchymosis (if Buck's fascia ruptured)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Assess for urethral injury (blood at meatus, difficulty voiding)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investigations</Text>
          <Text style={styles.bold}>Imaging:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Penile ultrasound (if diagnosis uncertain)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Penile MRI (gold standard for localising fracture and assessing urethral involvement)</Text>
          </View>
          <Text style={[styles.bold, { marginTop: theme.spacing.sm }]}>Urethral evaluation:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Retrograde urethrogram if urethral injury suspected</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Cystoscopy intraoperatively if needed</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          <Text style={styles.bold}>Surgical repair (preferred):</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Early surgical intervention within 24 hours recommended</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Lower rates of erectile dysfunction and penile curvature vs conservative</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Shorter hospital stay</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• If defect can be identified by ultrasound, midline raphe incision onto haematoma can be made instead of degloving</Text>
          </View>
          <Text style={[styles.bold, { marginTop: theme.spacing.sm }]}>Conservative management:</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Consider for minor fractures without urethral injury</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Higher risk of complications (curvature, ED, fistula formation)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Surgical Technique</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Circumferential degloving incision (subcoronal)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Evacuate hematoma</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Identify fracture site(s)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Repair tunica albuginea with absorbable sutures (2-0 or 3-0)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Intraoperative cavernosography if urethral injury suspected</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Repair urethral injury if present</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Close incision with dressing</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Post-Operative Care</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Analgesia and anti-inflammatory medication</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Broad-spectrum antibiotics</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Ice packs to reduce swelling</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Suprapubic or urethral catheter if urethral repair performed</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Counsel regarding sexual abstinence for 4-6 weeks</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Follow-Up</Text>
          <Text style={styles.text}>
            Assessment of erectile function and penile curvature. Consider PDE5 inhibitors if ED develops. Penile prosthesis for refractory ED.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complications</Text>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Erectile dysfunction (10-30%)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Penile curvature/chordee</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Urethral stricture</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Fistula formation (urethrocutaneous, corporourethral)</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Infection</Text>
          </View>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>• Painful nodules</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Based on EAU and NICE guidelines for penile trauma management. Clinical judgment should always guide management decisions.
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
