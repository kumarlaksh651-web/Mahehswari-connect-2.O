import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Header } from "@/components/Header";
import { useColors } from "@/hooks/useColors";

const SERVICES = [
  {
    id: "pgmf",
    icon: "globe" as const,
    title: "Pak Global Maheshwaris Forum",
    desc: "A premier community network running free medical camps, student scholarships, and interfaith civic initiatives across Pakistan and diaspora worldwide.",
    fb: "https://www.facebook.com/groups/PakGlobalMaheshwaris",
    label: "Facebook Group",
  },
  {
    id: "maf",
    icon: "shield" as const,
    title: "Maheshwari Action Forum",
    desc: "Advocacy platform for Dhat Maheshwari rights, cultural preservation, interfaith dialogue, and legal assistance for community members.",
    fb: "https://www.facebook.com/MaheshwariActionForum",
    label: "Facebook Page",
  },
  {
    id: "mb",
    icon: "users" as const,
    title: "Marriage Bureau",
    desc: "Connecting Dhat Maheshwari families for matrimonial alliances within the community, preserving cultural and traditional values.",
    fb: null,
    label: null,
  },
  {
    id: "bd",
    icon: "briefcase" as const,
    title: "Business Directory",
    desc: "Discover textile, gold, commodity, and healthcare businesses run by Dhat Maheshwari members across Pakistan and abroad.",
    fb: null,
    label: null,
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@dhatmaheshwaripakistan",
    icon: "instagram" as const,
    color: "#E1306C",
    url: "https://www.instagram.com/dhatmaheshwaripakistan",
  },
  {
    name: "Facebook",
    handle: "Dhat Maheshwari Pakistan",
    icon: "facebook" as const,
    color: "#1877F2",
    url: "https://www.facebook.com/dhatmaheshwaripakistan",
  },
];

export default function CommunityScreen() {
  const colors = useColors();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Community • Culture • Legacy" />
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
            colors={["transparent", "rgba(100,10,10,0.9)"]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Dhat Maheshwari</Text>
            <Text style={styles.bannerSub}>
              Tharparkar · Umerkot · Karachi · Hyderabad · Worldwide
            </Text>
          </View>
        </View>

        {/* About */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>
            About Our Community
          </Text>
        </View>
        <View
          style={[
            styles.aboutCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.aboutText, { color: colors.mutedForeground }]}>
            The Dhatki Maheshwari community of Pakistan is an elite, highly traditional Hindu merchant class
            primarily native to the Tharparkar and Umerkot districts of Sindh, with strong urban centers in
            Karachi and Hyderabad. Distinct from any regional tribal or artisan sub-groups, they represent
            the ancestral, aristocratic Vaishya (Baniya) lineage, defining their identity through strict
            cultural purity, traditional business ventures, and their mother tongue, Dhatki — a unique
            Rajasthani-Marwari dialect of the Thar desert.{"\n\n"}
            The community is highly urbanized, holding prominent roles in wholesale textile trading, gold
            markets, commodity imports, and modern healthcare and corporate sectors across Sindh. They are
            distinguished by their steadfast preservation of heritage, practicing absolute vegetarianism and
            strictly adhering to ancient Vedic and Shaivite traditions, with Mahesh Navami serving as their
            most significant community festival.{"\n\n"}
            Highly educated and cohesive, the community leverages powerful digital and professional networks
            like the Pak Global Maheshwaris Forum to run philanthropic medical societies, fund student
            scholarships, and drive impactful interfaith civic initiatives. Through these efforts, they
            maintain an influential socio-economic footprint while firmly safeguarding their distinct
            Dhatki-Maheshwari ancestral legacy.
          </Text>
        </View>

        {/* Community Services */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>
            Community Organizations & Services
          </Text>
        </View>
        {SERVICES.map((s) => (
          <View
            key={s.id}
            style={[styles.serviceCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.serviceTop}>
              <View style={[styles.serviceIcon, { backgroundColor: colors.muted }]}>
                <Feather name={s.icon} size={22} color={colors.primary} />
              </View>
              <View style={styles.serviceText}>
                <Text style={[styles.serviceTitle, { color: colors.foreground }]}>
                  {s.title}
                </Text>
              </View>
            </View>
            <Text style={[styles.serviceDesc, { color: colors.mutedForeground }]}>
              {s.desc}
            </Text>
            {s.fb && (
              <TouchableOpacity
                style={[styles.fbBtn, { backgroundColor: "#1877F2" }]}
                onPress={() => Linking.openURL(s.fb!)}
                activeOpacity={0.85}
              >
                <Feather name="facebook" size={15} color="#fff" />
                <Text style={styles.fbBtnText}>{s.label}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Connect With Us */}
        <View style={styles.groupHeader}>
          <Text style={[styles.groupTitle, { color: colors.foreground }]}>
            Connect With Us
          </Text>
        </View>
        <View style={styles.socialsGrid}>
          {SOCIALS.map((s) => (
            <TouchableOpacity
              key={s.name}
              style={[styles.socialCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => Linking.openURL(s.url)}
              activeOpacity={0.85}
            >
              <View style={[styles.socialIconWrap, { backgroundColor: s.color }]}>
                <Feather name={s.icon} size={24} color="#fff" />
              </View>
              <Text style={[styles.socialName, { color: colors.foreground }]}>{s.name}</Text>
              <Text style={[styles.socialHandle, { color: colors.accent }]}>{s.handle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  bannerWrap: { height: 190, position: "relative" },
  bannerImg: { width: "100%", height: "100%" },
  bannerContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  bannerTitle: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  bannerSub: {
    fontSize: 12,
    color: "rgba(255,255,255,0.82)",
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  groupHeader: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 10,
  },
  groupTitle: {
    fontSize: 19,
    fontFamily: "Inter_700Bold",
  },
  aboutCard: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  aboutText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 23,
  },
  serviceCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  serviceTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceText: { flex: 1 },
  serviceTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  serviceDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  fbBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  fbBtnText: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  socialsGrid: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  socialCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  socialIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  socialName: {
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  socialHandle: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
});
