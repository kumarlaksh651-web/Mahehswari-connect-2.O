import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Header } from "@/components/Header";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";

const ACHIEVEMENTS = [
  { id: "a1", title: "Tharparkar Free Medical Camp 2024", body: "PGMF organized a 3-day free medical camp in Mithi, Tharparkar, serving over 1,200 patients. Specialist doctors from Karachi volunteered their services.", date: "Dec 2024", icon: "heart" as const },
  { id: "a2", title: "Scholarship Awards Ceremony 2024", body: "12 deserving Maheshwari students received annual scholarships for medicine and engineering. The ceremony was held in Karachi with community elders and PGMF members worldwide.", date: "Aug 2024", icon: "book" as const },
  { id: "a3", title: "Mahesh Navami Celebrations", body: "The community celebrated Mahesh Navami with traditional rituals, Vedic prayers, and gatherings in Karachi, Hyderabad, and Mithi. Online participation from the global diaspora.", date: "Jun 2024", icon: "star" as const },
  { id: "a4", title: "MAF Interfaith Harmony Initiative", body: "MAF partnered with civil society organizations for interfaith harmony events across Sindh, highlighting the peaceful coexistence of the Maheshwari community in Pakistan.", date: "Apr 2024", icon: "globe" as const },
];

const EVENTS = [
  { id: "e1", title: "Free Medical Camp — Tharparkar", org: "Pak Global Maheshwaris Forum", orgShort: "PGMF", date: "15 Jul 2026", city: "Mithi, Tharparkar", venue: "Maheshwari Community Hall, Near Shiv Mandir, Mithi", conductors: "Dr. Ramesh Bhansali, Dr. Vijay Chandak & PGMF Medical Team", type: "medical" as const },
  { id: "e2", title: "Annual Scholarship Award Ceremony", org: "Pak Global Maheshwaris Forum", orgShort: "PGMF", date: "20 Aug 2026", city: "Karachi", venue: "Avari Towers, Club Road, Karachi", conductors: "PGMF Executive Committee & Community Elders", type: "scholarship" as const },
  { id: "e3", title: "MAF Community Town Hall", org: "Maheshwari Action Forum", orgShort: "MAF", date: "10 Jul 2026", city: "Hyderabad", venue: "Mehran Hotel, Saddar, Hyderabad", conductors: "MAF Advisory Board, Deepak Singhvi & Tarachand Singhvi", type: "meeting" as const },
  { id: "e4", title: "Mahesh Navami Celebration 2026", org: "Community", orgShort: "COMM", date: "28 Jul 2026", city: "Karachi", venue: "Shri Maheshwari Sabha, Lines Area, Karachi", conductors: "Community Elders, Pandit Suresh Daga & Pandit Kishanlal Daga", type: "cultural" as const },
  { id: "e5", title: "Umerkot Medical & Welfare Camp", org: "Pak Global Maheshwaris Forum", orgShort: "PGMF", date: "5 Sep 2026", city: "Umerkot, Sindh", venue: "Umerkot Hindu Panchayat Hall, near Main Chowk", conductors: "PGMF Medical Wing, Dr. Dilip Kumar Ladha (Houston, USA)", type: "medical" as const },
];

const TYPE_META = {
  medical:     { bg: "#FEE2E2", text: "#DC2626", icon: "heart" as const },
  scholarship: { bg: "#FEF9C3", text: "#CA8A04", icon: "book" as const },
  meeting:     { bg: "#E0E7FF", text: "#4338CA", icon: "users" as const },
  cultural:    { bg: "#FCE7F3", text: "#BE185D", icon: "star" as const },
};

const ORGS = [
  { id: "pgmf", name: "Pak Global Maheshwaris Forum", short: "PGMF", desc: "The premier digital community platform connecting Maheshwari families across Pakistan and the global diaspora. Runs free medical camps in Tharparkar and Umerkot, funds student scholarships, and drives interfaith civic initiatives.", services: ["Free medical camps in Tharparkar & Umerkot", "Annual student scholarship awards", "Community emergency relief coordination", "Diaspora networking & reunion events"], fb: "https://www.facebook.com/groups/PakGlobalMaheshwaris", fbLabel: "Join Facebook Group" },
  { id: "maf", name: "Maheshwari Action Forum", short: "MAF", desc: "An advocacy and action platform championing the rights, cultural preservation, and civic participation of the Dhat Maheshwari community in Pakistan and abroad.", services: ["Legal aid and rights advocacy", "Interfaith dialogue programs", "Cultural heritage documentation", "Community representation in civic matters"], fb: "https://www.facebook.com/MaheshwariActionForum", fbLabel: "Follow on Facebook" },
];

const SOCIALS = [
  { name: "Instagram", handle: "@dhatmaheshwaripakistan", icon: "instagram" as const, color: "#E1306C", url: "https://www.instagram.com/dhatmaheshwaripakistan" },
  { name: "Facebook", handle: "Dhat Maheshwari Pakistan", icon: "facebook" as const, color: "#1877F2", url: "https://www.facebook.com/dhatmaheshwaripakistan" },
];

export default function CommunityScreen() {
  const colors = useColors();
  const { user } = useAuth();
  const tabBarHeight = useBottomTabBarHeight();
  const [thoughtInput, setThoughtInput] = useState("");
  const [achievementInput, setAchievementInput] = useState("");

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "M";

  function submitThought() {
    const text = thoughtInput.trim();
    if (!text) return;
    setThoughtInput("");
    Alert.alert("Shared!", "Your thought has been shared with the community.", [{ text: "Jai Mahesh 🙏" }]);
  }

  function submitAchievement() {
    const text = achievementInput.trim();
    if (!text) return;
    setAchievementInput("");
    Alert.alert("Submitted!", "Your community achievement has been submitted for review. Our admins will post it shortly.", [{ text: "Thank you!" }]);
  }

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Community • Culture • Legacy" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}>

        {/* Hero Banner */}
        <View style={s.bannerWrap}>
          <Image source={require("@/assets/images/community_hero.png")} style={s.bannerImg} contentFit="cover" />
          <LinearGradient colors={["transparent", "rgba(100,10,10,0.92)"]} style={StyleSheet.absoluteFill} />
          <View style={s.bannerContent}>
            <Text style={s.bannerTitle}>Dhat Maheshwari</Text>
            <Text style={s.bannerSub}>Tharparkar · Umerkot · Karachi · Hyderabad · Worldwide</Text>
          </View>
        </View>

        {/* About */}
        <SectionTitle title="About Our Community" colors={colors} />
        <View style={[s.aboutCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[s.aboutText, { color: colors.mutedForeground }]}>
            The Dhatki Maheshwari community of Pakistan is an elite, highly traditional Hindu merchant class primarily native to Tharparkar and Umerkot districts of Sindh, with strong urban centers in Karachi and Hyderabad. They represent the ancestral, aristocratic Vaishya (Baniya) lineage, defining their identity through strict cultural purity, traditional business ventures, and their mother tongue — Dhatki, a unique Rajasthani-Marwari dialect of the Thar desert.{"\n\n"}
            Highly educated and cohesive, they leverage powerful networks like PGMF to run philanthropic medical societies, fund student scholarships, and drive impactful interfaith civic initiatives — safeguarding their distinct Dhatki-Maheshwari ancestral legacy.
          </Text>
        </View>

        {/* ── ACHIEVEMENTS (TOP) ── */}
        <SectionTitle title="Community Achievements 🏆" colors={colors} />
        {ACHIEVEMENTS.map((item) => (
          <View key={item.id} style={[s.achieveCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={s.achieveTop}>
              <View style={[s.achieveIcon, { backgroundColor: colors.muted }]}>
                <Feather name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.achieveTitle, { color: colors.foreground }]}>{item.title}</Text>
                <Text style={[s.achieveDate, { color: colors.accent }]}>{item.date}</Text>
              </View>
            </View>
            <Text style={[s.achieveBody, { color: colors.mutedForeground }]}>{item.body}</Text>
          </View>
        ))}

        {/* ── UPCOMING PROGRAMS ── */}
        <SectionTitle title="Upcoming Programs 📅" colors={colors} />
        {EVENTS.map((ev) => {
          const meta = TYPE_META[ev.type];
          const [day, mon, yr] = ev.date.split(" ");
          return (
            <View key={ev.id} style={[s.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={s.eventTop}>
                <View style={[s.dateBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[s.dateBadgeDay, { color: colors.accent }]}>{day}</Text>
                  <Text style={[s.dateBadgeMon, { color: colors.primaryForeground }]}>{mon}</Text>
                  <Text style={[s.dateBadgeYr, { color: "rgba(255,255,255,0.6)" }]}>{yr}</Text>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={s.eventTitleRow}>
                    <View style={[s.typeIcon, { backgroundColor: meta.bg }]}>
                      <Feather name={meta.icon} size={13} color={meta.text} />
                    </View>
                    <Text style={[s.eventTitle, { color: colors.foreground }]} numberOfLines={2}>{ev.title}</Text>
                  </View>
                  <View style={[s.orgBadge, { backgroundColor: colors.muted }]}>
                    <Text style={[s.orgBadgeText, { color: colors.primary }]}>{ev.orgShort}</Text>
                  </View>
                </View>
              </View>
              <View style={[s.eventDetails, { borderTopColor: colors.border }]}>
                <EventDetail icon="map-pin" text={ev.venue} colors={colors} />
                <EventDetail icon="users" text={ev.conductors} colors={colors} />
              </View>
            </View>
          );
        })}

        {/* ── SHARE YOUR THOUGHT ── */}
        <SectionTitle title="Share Your Thought 💬" colors={colors} />
        <View style={[s.inputCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LinearGradient colors={[colors.primary, "#6B1010"]} style={s.inputCardStrip}>
            <Feather name="message-circle" size={15} color="rgba(255,255,255,0.75)" />
            <Text style={s.inputCardStripText}>Say something to the community</Text>
          </LinearGradient>
          <View style={s.inputCardBody}>
            <View style={[s.inputAvatar, { backgroundColor: colors.primary }]}>
              <Text style={[s.inputAvatarText, { color: colors.primaryForeground }]}>{initials}</Text>
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <TextInput
                style={[s.textArea, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
                placeholder="Share a thought, Jai Mahesh! 🙏"
                placeholderTextColor={colors.mutedForeground}
                value={thoughtInput}
                onChangeText={setThoughtInput}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[s.submitBtn, { backgroundColor: colors.primary, opacity: thoughtInput.trim() ? 1 : 0.45 }]}
                onPress={submitThought}
                activeOpacity={0.85}
              >
                <Feather name="send" size={14} color={colors.primaryForeground} />
                <Text style={[s.submitBtnText, { color: colors.primaryForeground }]}>Share with Community</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── SUBMIT A COMMUNITY ACHIEVEMENT ── */}
        <SectionTitle title="Report an Achievement 🌟" colors={colors} />
        <View style={[s.inputCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LinearGradient colors={["#7C4700", "#4A2A00"]} style={s.inputCardStrip}>
            <Feather name="award" size={15} color="rgba(255,255,255,0.75)" />
            <Text style={s.inputCardStripText}>Share a community milestone or achievement</Text>
          </LinearGradient>
          <View style={s.inputCardBody}>
            <View style={[s.inputAvatar, { backgroundColor: "#7C4700" }]}>
              <Feather name="star" size={18} color="#C9A844" />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <TextInput
                style={[s.textArea, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
                placeholder="e.g. PGMF held a medical camp serving 500 families in Umerkot on June 2026..."
                placeholderTextColor={colors.mutedForeground}
                value={achievementInput}
                onChangeText={setAchievementInput}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[s.submitBtn, { backgroundColor: "#7C4700", opacity: achievementInput.trim() ? 1 : 0.45 }]}
                onPress={submitAchievement}
                activeOpacity={0.85}
              >
                <Feather name="upload" size={14} color="#fff" />
                <Text style={[s.submitBtnText, { color: "#fff" }]}>Submit for Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── COMMUNITY ORGANIZATIONS (BOTTOM) ── */}
        <SectionTitle title="Community Organizations" colors={colors} />
        {ORGS.map((org) => (
          <View key={org.id} style={[s.orgCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={s.orgHeader}>
              <View style={[s.orgBadge2, { backgroundColor: colors.primary }]}>
                <Text style={[s.orgShort, { color: colors.primaryForeground }]}>{org.short}</Text>
              </View>
              <Text style={[s.orgName, { color: colors.foreground }]}>{org.name}</Text>
            </View>
            <Text style={[s.orgDesc, { color: colors.mutedForeground }]}>{org.desc}</Text>
            <View style={[s.servicesList, { borderColor: colors.border }]}>
              {org.services.map((svc, i) => (
                <View key={i} style={s.serviceItem}>
                  <View style={[s.serviceDot, { backgroundColor: colors.accent }]} />
                  <Text style={[s.serviceText, { color: colors.foreground }]}>{svc}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={[s.fbBtn, { backgroundColor: "#1877F2" }]}
              onPress={() => Linking.openURL(org.fb)}
              activeOpacity={0.85}
            >
              <Feather name="facebook" size={15} color="#fff" />
              <Text style={s.fbBtnText}>{org.fbLabel}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Connect With Us */}
        <SectionTitle title="Connect With Us" colors={colors} />
        <View style={s.socialsGrid}>
          {SOCIALS.map((soc) => (
            <TouchableOpacity
              key={soc.name}
              style={[s.socialCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => Linking.openURL(soc.url)}
              activeOpacity={0.85}
            >
              <View style={[s.socialIconWrap, { backgroundColor: soc.color }]}>
                <Feather name={soc.icon} size={24} color="#fff" />
              </View>
              <Text style={[s.socialName, { color: colors.foreground }]}>{soc.name}</Text>
              <Text style={[s.socialHandle, { color: colors.accent }]}>{soc.handle}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

function SectionTitle({ title, colors }: { title: string; colors: any }) {
  return <View style={s.sectionHeader}><Text style={[s.sectionTitle, { color: colors.foreground }]}>{title}</Text></View>;
}

function EventDetail({ icon, text, colors }: { icon: any; text: string; colors: any }) {
  return (
    <View style={s.eventDetailRow}>
      <Feather name={icon} size={12} color={colors.mutedForeground} style={{ marginTop: 2 }} />
      <Text style={[s.eventDetailText, { color: colors.mutedForeground }]}>{text}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  bannerWrap: { height: 190, position: "relative" },
  bannerImg: { width: "100%", height: "100%" },
  bannerContent: { position: "absolute", bottom: 16, left: 16, right: 16 },
  bannerTitle: { fontSize: 26, fontFamily: "Inter_700Bold", color: "#fff" },
  bannerSub: { fontSize: 12, color: "rgba(255,255,255,0.82)", fontFamily: "Inter_400Regular", marginTop: 2 },
  sectionHeader: { paddingHorizontal: 16, paddingTop: 22, paddingBottom: 10 },
  sectionTitle: { fontSize: 19, fontFamily: "Inter_700Bold" },
  aboutCard: { marginHorizontal: 16, padding: 16, borderRadius: 16, borderWidth: 1 },
  aboutText: { fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 23 },
  achieveCard: { marginHorizontal: 16, marginBottom: 12, padding: 16, borderRadius: 16, borderWidth: 1, gap: 10 },
  achieveTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  achieveIcon: { width: 46, height: 46, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  achieveTitle: { fontSize: 15, fontFamily: "Inter_700Bold", flex: 1 },
  achieveDate: { fontSize: 12, fontFamily: "Inter_600SemiBold", marginTop: 2 },
  achieveBody: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  eventCard: { marginHorizontal: 16, marginBottom: 12, borderRadius: 18, borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  eventTop: { flexDirection: "row", gap: 12, padding: 14, alignItems: "flex-start" },
  dateBadge: { width: 50, paddingVertical: 8, borderRadius: 12, alignItems: "center", gap: 1 },
  dateBadgeDay: { fontSize: 20, fontFamily: "Inter_700Bold", lineHeight: 24 },
  dateBadgeMon: { fontSize: 10, fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  dateBadgeYr: { fontSize: 9, fontFamily: "Inter_400Regular" },
  eventTitleRow: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
  typeIcon: { width: 24, height: 24, borderRadius: 8, justifyContent: "center", alignItems: "center", marginTop: 1, flexShrink: 0 },
  eventTitle: { fontSize: 14, fontFamily: "Inter_700Bold", flex: 1, lineHeight: 20 },
  orgBadge: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  orgBadgeText: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 0.5 },
  eventDetails: { borderTopWidth: 1, paddingHorizontal: 14, paddingVertical: 10, gap: 6 },
  eventDetailRow: { flexDirection: "row", alignItems: "flex-start", gap: 7 },
  eventDetailText: { fontSize: 12, fontFamily: "Inter_400Regular", flex: 1, lineHeight: 17 },
  inputCard: { marginHorizontal: 16, marginBottom: 4, borderRadius: 18, borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  inputCardStrip: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  inputCardStripText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "rgba(255,255,255,0.85)" },
  inputCardBody: { flexDirection: "row", gap: 10, padding: 14, alignItems: "flex-start" },
  inputAvatar: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  inputAvatarText: { fontSize: 14, fontFamily: "Inter_700Bold" },
  textArea: { borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, fontFamily: "Inter_400Regular", minHeight: 80, textAlignVertical: "top" },
  submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingVertical: 12, borderRadius: 12 },
  submitBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  orgCard: { marginHorizontal: 16, marginBottom: 14, padding: 16, borderRadius: 16, borderWidth: 1, gap: 12 },
  orgHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  orgBadge2: { width: 46, height: 46, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  orgShort: { fontSize: 12, fontFamily: "Inter_700Bold" },
  orgName: { fontSize: 15, fontFamily: "Inter_700Bold", flex: 1 },
  orgDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 },
  servicesList: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  serviceItem: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  serviceDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  serviceText: { fontSize: 13, fontFamily: "Inter_400Regular", flex: 1, lineHeight: 20 },
  fbBtn: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 10, alignSelf: "flex-start" },
  fbBtnText: { color: "#fff", fontSize: 13, fontFamily: "Inter_600SemiBold" },
  socialsGrid: { flexDirection: "row", paddingHorizontal: 16, gap: 12, paddingBottom: 4 },
  socialCard: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: "center", gap: 8 },
  socialIconWrap: { width: 52, height: 52, borderRadius: 26, justifyContent: "center", alignItems: "center" },
  socialName: { fontSize: 14, fontFamily: "Inter_700Bold" },
  socialHandle: { fontSize: 11, fontFamily: "Inter_500Medium", textAlign: "center" },
});
