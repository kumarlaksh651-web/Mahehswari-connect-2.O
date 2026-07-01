import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Header } from "@/components/Header";
import { useColors } from "@/hooks/useColors";

export interface WelfareProgram {
  id: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  title: string;
  desc: string;
  raised: string;
  goal: string;
  progress: number;
  tag: string;
}

export const WELFARE_PROGRAMS: WelfareProgram[] = [
  {
    id: "medical",
    icon: "heart",
    title: "Maheshwari Medical Fund",
    desc: "Free medical camps, medicines, and specialist consultations for underprivileged Maheshwari families in Tharparkar and Umerkot districts. Run in collaboration with Pak Global Maheshwaris Forum.",
    raised: "PKR 2.4M",
    goal: "PKR 5M",
    progress: 0.48,
    tag: "Ongoing",
  },
  {
    id: "scholarship",
    icon: "book",
    title: "Student Scholarship Program",
    desc: "Annual scholarships for talented Maheshwari students pursuing higher education in medicine, engineering, commerce, and technology. Priority given to students from rural Sindh.",
    raised: "PKR 1.8M",
    goal: "PKR 3M",
    progress: 0.60,
    tag: "Ongoing",
  },
  {
    id: "relief",
    icon: "shield",
    title: "Emergency Relief Fund",
    desc: "Immediate financial support for Maheshwari families affected by natural disasters, medical emergencies, or sudden economic hardship. Disbursed within 72 hours of application.",
    raised: "PKR 900K",
    goal: "PKR 2M",
    progress: 0.45,
    tag: "Always Open",
  },
  {
    id: "vedic",
    icon: "star",
    title: "Vedic Heritage Preservation",
    desc: "Funding the documentation of Dhatki language, Vedic rituals, Mahesh Navami celebrations, and the restoration of historic Maheshwari temples and community spaces in Sindh.",
    raised: "PKR 650K",
    goal: "PKR 1.5M",
    progress: 0.43,
    tag: "Ongoing",
  },
  {
    id: "elderly",
    icon: "users",
    title: "Elderly Care Program",
    desc: "Monthly stipends, home visits, and medical support for elderly Maheshwari community members who live alone or without family support in Pakistan.",
    raised: "PKR 420K",
    goal: "PKR 1M",
    progress: 0.42,
    tag: "Ongoing",
  },
];

export default function WelfareScreen() {
  const colors = useColors();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Community Welfare Programs" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
      >
        {/* Header info */}
        <View style={[styles.infoBar, { backgroundColor: colors.primary }]}>
          <Feather name="info" size={15} color="rgba(255,255,255,0.85)" />
          <Text style={styles.infoText}>
            All donations go directly to Dhat Maheshwari community programs. Your support matters.
          </Text>
        </View>

        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>
            Ongoing Programs
          </Text>
          <Text style={[styles.groupSub, { color: colors.mutedForeground }]}>
            Tap Donate to contribute to any program
          </Text>
        </View>

        {WELFARE_PROGRAMS.map((program) => (
          <View
            key={program.id}
            style={[
              styles.card,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            {/* Tag */}
            <View style={styles.cardTop}>
              <View style={[styles.iconWrap, { backgroundColor: colors.muted }]}>
                <Feather name={program.icon} size={22} color={colors.primary} />
              </View>
              <View style={[styles.tagBadge, { backgroundColor: "#DCFCE7" }]}>
                <Text style={[styles.tagText, { color: "#16A34A" }]}>{program.tag}</Text>
              </View>
            </View>

            <Text style={[styles.cardTitle, { color: colors.foreground }]}>
              {program.title}
            </Text>
            <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>
              {program.desc}
            </Text>

            {/* Progress bar */}
            <View style={styles.progressSection}>
              <View style={[styles.progressBg, { backgroundColor: colors.muted }]}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.primary,
                      width: `${Math.round(program.progress * 100)}%`,
                    },
                  ]}
                />
              </View>
              <View style={styles.progressLabels}>
                <Text style={[styles.raisedText, { color: colors.primary }]}>
                  Raised: {program.raised}
                </Text>
                <Text style={[styles.goalText, { color: colors.mutedForeground }]}>
                  Goal: {program.goal}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.donateBtn, { backgroundColor: colors.accent }]}
              onPress={() => router.push(`/donate/${program.id}`)}
              activeOpacity={0.85}
            >
              <Feather name="heart" size={16} color={colors.primary} />
              <Text style={[styles.donateBtnText, { color: colors.primary }]}>
                Donate to this Program
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  infoText: {
    flex: 1,
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  groupHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    gap: 3,
  },
  groupTitle: {
    fontSize: 19,
    fontFamily: "Inter_700Bold",
  },
  groupSub: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
  },
  progressSection: { gap: 6 },
  progressBg: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  raisedText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  goalText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  donateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 4,
  },
  donateBtnText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
});
