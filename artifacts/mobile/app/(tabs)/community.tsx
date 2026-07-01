import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Header } from "@/components/Header";
import { useColors } from "@/hooks/useColors";

const WELFARE = [
  {
    id: "1",
    icon: "book" as const,
    title: "Education Fund",
    desc: "Scholarships for deserving students in the Maheshwari community.",
  },
  {
    id: "2",
    icon: "heart" as const,
    title: "Medical Aid",
    desc: "Financial assistance for medical treatment of underprivileged members.",
  },
  {
    id: "3",
    icon: "shield" as const,
    title: "Emergency Relief",
    desc: "Immediate support for families facing hardship or natural disasters.",
  },
  {
    id: "4",
    icon: "home" as const,
    title: "Housing Support",
    desc: "Helping families secure stable housing across Pakistan.",
  },
];

const SERVICES = [
  {
    id: "1",
    icon: "users" as const,
    title: "Marriage Bureau",
    desc: "Connecting Maheshwari families for matrimonial alliances.",
  },
  {
    id: "2",
    icon: "calendar" as const,
    title: "Community Events",
    desc: "Festivals, gatherings, and religious events throughout the year.",
  },
  {
    id: "3",
    icon: "briefcase" as const,
    title: "Business Directory",
    desc: "Discover businesses owned by Dhat Maheshwari members worldwide.",
  },
  {
    id: "4",
    icon: "award" as const,
    title: "Dispute Resolution",
    desc: "Community-led resolution for family and business disputes.",
  },
];

const ACHIEVEMENTS = [
  { num: "500+", label: "Registered Members" },
  { num: "15+", label: "Countries Represented" },
  { num: "20+", label: "Years of Service" },
  { num: "100+", label: "Families Helped" },
];

const SOCIALS = [
  { name: "Facebook", icon: "facebook" as const, color: "#1877F2", url: "https://facebook.com" },
  { name: "Instagram", icon: "instagram" as const, color: "#E1306C", url: "https://instagram.com" },
  { name: "YouTube", icon: "youtube" as const, color: "#FF0000", url: "https://youtube.com" },
  { name: "Twitter/X", icon: "twitter" as const, color: "#1DA1F2", url: "https://twitter.com" },
];

export default function CommunityScreen() {
  const colors = useColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Community Welfare & Services" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}
      >
        {/* Banner */}
        <View style={styles.bannerWrap}>
          <Image
            source={require("@/assets/images/community_hero.png")}
            style={styles.bannerImg}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(100,10,10,0.85)"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Dhat Maheshwari</Text>
            <Text style={styles.bannerSub}>United in Faith · United in Community</Text>
          </View>
        </View>

        {/* Stats strip */}
        <View style={[styles.statsStrip, { backgroundColor: colors.primary }]}>
          {ACHIEVEMENTS.map((a, i) => (
            <View key={a.label} style={styles.statItem}>
              <Text style={[styles.statNum, { color: colors.accent }]}>{a.num}</Text>
              <Text style={styles.statLabel}>{a.label}</Text>
            </View>
          ))}
        </View>

        {/* About */}
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.sectionHeader}>
            <Feather name="info" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              About Our Community
            </Text>
          </View>
          <Text style={[styles.aboutText, { color: colors.mutedForeground }]}>
            The Dhat Maheshwari community is a proud Hindu mercantile community with deep roots in the
            Sindh and Punjab regions of Pakistan. Our community has thrived for centuries, maintaining
            our culture, traditions, and values while contributing to the social and economic fabric
            of Pakistan and our adopted homelands across the world.
          </Text>
        </View>

        {/* Welfare */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>Welfare Programs</Text>
        </View>
        {WELFARE.map((w) => (
          <TouchableOpacity
            key={w.id}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: colors.muted }]}>
              <Feather name={w.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>{w.title}</Text>
              <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>{w.desc}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}

        {/* Services */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>Community Services</Text>
        </View>
        {SERVICES.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.8}
          >
            <View style={[styles.cardIcon, { backgroundColor: colors.muted }]}>
              <Feather name={s.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={[styles.cardTitle, { color: colors.foreground }]}>{s.title}</Text>
              <Text style={[styles.cardDesc, { color: colors.mutedForeground }]}>{s.desc}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}

        {/* Social Media */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>Connect With Us</Text>
        </View>
        <View style={styles.socialGrid}>
          {SOCIALS.map((s) => (
            <TouchableOpacity
              key={s.name}
              style={[
                styles.socialBtn,
                { backgroundColor: s.color },
              ]}
              onPress={() => Linking.openURL(s.url)}
              activeOpacity={0.85}
            >
              <Feather name={s.icon} size={26} color="#fff" />
              <Text style={styles.socialLabel}>{s.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bannerWrap: {
    height: 200,
    position: "relative",
  },
  bannerImg: {
    width: "100%",
    height: "100%",
  },
  bannerContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  bannerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  bannerSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Inter_400Regular",
  },
  statsStrip: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNum: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 2,
  },
  section: {
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  aboutText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  groupHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  groupTitle: {
    fontSize: 19,
    fontFamily: "Inter_700Bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 5,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: { flex: 1, gap: 3 },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 19,
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  socialBtn: {
    flex: 1,
    minWidth: "44%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    gap: 8,
  },
  socialLabel: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
});
