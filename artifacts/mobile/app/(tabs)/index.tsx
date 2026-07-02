import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CallSheet } from "@/components/CallSheet";
import { MemberCard } from "@/components/MemberCard";
import { Member, useMembers } from "@/context/MembersContext";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

const EVENT_PREVIEWS = [
  { id: "e1", title: "Free Medical Camp", org: "PGMF", date: "15 Jul", city: "Mithi", type: "medical" as const },
  { id: "e2", title: "Scholarship Awards", org: "PGMF", date: "20 Aug", city: "Karachi", type: "scholarship" as const },
  { id: "e3", title: "MAF Town Hall", org: "MAF", date: "10 Jul", city: "Hyderabad", type: "meeting" as const },
  { id: "e4", title: "Mahesh Navami Celebration", org: "COMM", date: "28 Jul", city: "Karachi", type: "cultural" as const },
  { id: "e5", title: "Umerkot Welfare Camp", org: "PGMF", date: "5 Sep", city: "Umerkot", type: "medical" as const },
];

const TYPE_META = {
  medical:     { bg: "#FEE2E2", text: "#DC2626", icon: "heart" as const },
  scholarship: { bg: "#FEF9C3", text: "#CA8A04", icon: "book" as const },
  meeting:     { bg: "#E0E7FF", text: "#4338CA", icon: "users" as const },
  cultural:    { bg: "#FCE7F3", text: "#BE185D", icon: "star" as const },
};

const POLL = {
  question: "Which community program should be prioritized in 2026?",
  options: [
    { id: "a", label: "Free Medical Camps" },
    { id: "b", label: "Student Scholarships" },
    { id: "c", label: "Cultural & Heritage Events" },
    { id: "d", label: "Legal Aid Programs" },
  ],
};

const SPOTLIGHTS = ["1", "3", "7"];

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [callMember, setCallMember] = useState<Member | null>(null);
  const [callVisible, setCallVisible] = useState(false);
  const [post, setPost] = useState("");
  const [pollVote, setPollVote] = useState<string | null>(null);
  const [pollCounts, setPollCounts] = useState({ a: 47, b: 82, c: 33, d: 24 });

  const { members } = useMembers();
  const { user } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const cities = [...new Set(members.map((m) => m.city))].sort();
  const isSearching = query.trim().length > 0 || selectedCity !== null;

  const filtered = isSearching
    ? members.filter((m) => {
        const q = query.toLowerCase();
        const matchQ = !q || m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.country.toLowerCase().includes(q);
        const matchC = !selectedCity || m.city === selectedCity;
        return matchQ && matchC;
      })
    : [];

  const spotlightMembers = SPOTLIGHTS.map((id) => members.find((m) => m.id === id)).filter(Boolean) as Member[];

  function handleCall(member: Member) { setCallMember(member); setCallVisible(true); }

  function submitPost() {
    if (!post.trim()) return;
    setPost("");
    Alert.alert("Posted!", "Your update has been shared with the community.", [{ text: "Jai Mahesh 🙏" }]);
  }

  function castVote(optId: string) {
    if (pollVote) return;
    setPollVote(optId);
    setPollCounts((p) => ({ ...p, [optId as keyof typeof p]: (p[optId as keyof typeof p] || 0) + 1 }));
  }

  const totalVotes = Object.values(pollCounts).reduce((a, b) => a + b, 0);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "M";

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      {/* ── Gradient Header ── */}
      <LinearGradient colors={[colors.primary, "#5A0808"]} style={s.header}>
        <View style={s.headerTop}>
          <TouchableOpacity onPress={() => router.push("/settings")} activeOpacity={0.8}>
            <View style={[s.avatar, { backgroundColor: colors.accent }]}>
              <Text style={[s.avatarText, { color: colors.primary }]}>{initials}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={s.greeting}>Jai Mahesh 🙏</Text>
            <Text style={s.headerTitle}>Dhat Maheshwari</Text>
          </View>
          <TouchableOpacity style={s.searchIconBtn} onPress={() => router.push("/search")} activeOpacity={0.8}>
            <Feather name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Inline search */}
        <View style={s.searchBar}>
          <Feather name="search" size={15} color="rgba(255,255,255,0.6)" />
          <TextInput
            style={s.searchInput}
            placeholder="Search members by name or city..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Feather name="x" size={15} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          )}
        </View>

        {/* City chips */}
        {isSearching && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.cityChips}>
            {cities.map((c) => (
              <TouchableOpacity
                key={c}
                style={[s.cityChip, selectedCity === c && { backgroundColor: colors.accent }]}
                onPress={() => setSelectedCity(selectedCity === c ? null : c)}
              >
                <Text style={[s.cityChipText, { color: selectedCity === c ? colors.primary : "rgba(255,255,255,0.85)" }]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </LinearGradient>

      {/* ── Search Results ── */}
      {isSearching ? (
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <MemberCard member={item} onCall={handleCall} />}
          ListHeaderComponent={
            <View style={s.resultsRow}>
              <Text style={[s.resultsText, { color: colors.foreground }]}>{filtered.length} member{filtered.length !== 1 ? "s" : ""} found</Text>
              <TouchableOpacity onPress={() => { setQuery(""); setSelectedCity(null); }}>
                <Text style={[s.clearText, { color: colors.primary }]}>Clear</Text>
              </TouchableOpacity>
            </View>
          }
          ListEmptyComponent={
            <View style={s.empty}>
              <Feather name="search" size={36} color={colors.mutedForeground} />
              <Text style={[s.emptyTitle, { color: colors.foreground }]}>No members found</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}>

          {/* ── Call a Member ── */}
          <TouchableOpacity
            style={[s.callBanner, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/search")}
            activeOpacity={0.88}
          >
            <LinearGradient colors={["rgba(255,255,255,0.08)", "transparent"]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
            <View style={[s.callIconWrap, { backgroundColor: colors.accent }]}>
              <Feather name="phone" size={22} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.callBannerTitle}>Call a Community Member</Text>
              <Text style={s.callBannerSub}>Search & connect via WhatsApp, Botim, or phone</Text>
            </View>
            <Feather name="chevron-right" size={20} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>

          {/* ── Upcoming Gatherings ── */}
          <SectionHeader title="Upcoming Gatherings" colors={colors} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.eventsScroll}>
            {EVENT_PREVIEWS.map((ev) => {
              const meta = TYPE_META[ev.type];
              return (
                <View key={ev.id} style={[s.eventCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={[s.eventTypePill, { backgroundColor: meta.bg }]}>
                    <Feather name={meta.icon} size={12} color={meta.text} />
                    <Text style={[s.eventTypeTxt, { color: meta.text }]}>{ev.org}</Text>
                  </View>
                  <Text style={[s.eventCardTitle, { color: colors.foreground }]} numberOfLines={2}>{ev.title}</Text>
                  <View style={s.eventCardMeta}>
                    <Feather name="calendar" size={11} color={colors.mutedForeground} />
                    <Text style={[s.eventCardMetaTxt, { color: colors.mutedForeground }]}>{ev.date}</Text>
                    <Feather name="map-pin" size={11} color={colors.mutedForeground} />
                    <Text style={[s.eventCardMetaTxt, { color: colors.mutedForeground }]}>{ev.city}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* ── Member Spotlights ── */}
          <SectionHeader title="Member Spotlights ✨" colors={colors} />
          {spotlightMembers.map((m) => (
            <View key={m.id} style={[s.spotlightCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <LinearGradient colors={[colors.primary, "#5A0808"]} style={s.spotlightAccent} />
              <View style={s.spotlightBody}>
                <View style={[s.spotlightAvatar, { backgroundColor: colors.primary }]}>
                  <Text style={[s.spotlightInitials, { color: colors.primaryForeground }]}>
                    {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.spotlightName, { color: colors.foreground }]}>{m.name}</Text>
                  <Text style={[s.spotlightLocation, { color: colors.mutedForeground }]}>{m.countryFlag} {m.city}, {m.country}</Text>
                  <Text style={[s.spotlightQual, { color: colors.mutedForeground }]} numberOfLines={1}>{m.qualification}</Text>
                </View>
                <TouchableOpacity style={[s.spotlightCallBtn, { backgroundColor: colors.primary }]} onPress={() => handleCall(m)}>
                  <Feather name="phone" size={16} color={colors.primaryForeground} />
                </TouchableOpacity>
              </View>
              {m.bio ? (
                <Text style={[s.spotlightBio, { color: colors.mutedForeground }]} numberOfLines={2}>{m.bio}</Text>
              ) : null}
            </View>
          ))}

          {/* ── Poll of the Week ── */}
          <SectionHeader title="Poll of the Week 🗳" colors={colors} />
          <View style={[s.pollCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LinearGradient colors={[colors.primary, "#6B1010"]} style={s.pollHeader}>
              <Feather name="bar-chart-2" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={s.pollHeaderText}>Community Poll</Text>
            </LinearGradient>
            <View style={s.pollBody}>
              <Text style={[s.pollQuestion, { color: colors.foreground }]}>{POLL.question}</Text>
              {POLL.options.map((opt) => {
                const count = pollCounts[opt.id as keyof typeof pollCounts];
                const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                const isVoted = pollVote === opt.id;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[s.pollOption, { borderColor: isVoted ? colors.primary : colors.border }]}
                    onPress={() => castVote(opt.id)}
                    disabled={!!pollVote}
                    activeOpacity={0.8}
                  >
                    <View style={[s.pollBar, { width: `${pollVote ? pct : 0}%` as any, backgroundColor: isVoted ? colors.primary : colors.muted }]} />
                    <View style={s.pollOptionRow}>
                      <View style={[s.pollRadio, { borderColor: isVoted ? colors.primary : colors.border, backgroundColor: isVoted ? colors.primary : "transparent" }]}>
                        {isVoted && <View style={s.pollRadioInner} />}
                      </View>
                      <Text style={[s.pollOptionText, { color: colors.foreground }]}>{opt.label}</Text>
                      {pollVote ? <Text style={[s.pollPct, { color: colors.mutedForeground }]}>{pct}%</Text> : null}
                    </View>
                  </TouchableOpacity>
                );
              })}
              <Text style={[s.pollTotal, { color: colors.mutedForeground }]}>{totalVotes} votes · {pollVote ? "Thank you for voting!" : "Tap to vote"}</Text>
            </View>
          </View>

          {/* ── Share a Post ── */}
          <SectionHeader title="Post to Community" colors={colors} />
          <View style={[s.postCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={s.postRow}>
              <View style={[s.postAvatar, { backgroundColor: colors.primary }]}>
                <Text style={[s.postAvatarText, { color: colors.primaryForeground }]}>{initials}</Text>
              </View>
              <TextInput
                style={[s.postInput, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
                placeholder="Share an update with your community..."
                placeholderTextColor={colors.mutedForeground}
                value={post}
                onChangeText={setPost}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity
              style={[s.postBtn, { backgroundColor: colors.primary, opacity: post.trim() ? 1 : 0.45 }]}
              onPress={submitPost}
              activeOpacity={0.85}
            >
              <Feather name="send" size={15} color={colors.primaryForeground} />
              <Text style={[s.postBtnText, { color: colors.primaryForeground }]}>Post Update</Text>
            </TouchableOpacity>
          </View>

          {/* ── Community banner ── */}
          <LinearGradient colors={[colors.primary, "#2A0000"]} style={s.banner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={s.bannerUrdu}>دھت مہیشوری</Text>
            <Text style={s.bannerSub}>Connecting Pakistan's Dhatki Maheshwari community worldwide</Text>
          </LinearGradient>

        </ScrollView>
      )}

      <CallSheet member={callMember} visible={callVisible} onClose={() => setCallVisible(false)} />
    </View>
  );
}

function SectionHeader({ title, colors }: { title: string; colors: any }) {
  return (
    <View style={s.sectionHeader}>
      <Text style={[s.sectionTitle, { color: colors.foreground }]}>{title}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingBottom: 12 },
  headerTop: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 54, paddingBottom: 12, gap: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 14, fontFamily: "Inter_700Bold" },
  greeting: { fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" },
  headerTitle: { fontSize: 17, fontFamily: "Inter_700Bold", color: "#fff" },
  searchIconBtn: { width: 38, height: 38, justifyContent: "center", alignItems: "center" },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.14)", marginHorizontal: 16, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 10, marginBottom: 8 },
  searchInput: { flex: 1, fontSize: 14, fontFamily: "Inter_400Regular", color: "#fff" },
  cityChips: { paddingHorizontal: 16, gap: 8, paddingBottom: 8 },
  cityChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)" },
  cityChipText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },

  callBanner: { flexDirection: "row", alignItems: "center", marginHorizontal: 16, marginTop: 16, marginBottom: 4, borderRadius: 18, padding: 16, gap: 12, overflow: "hidden" },
  callIconWrap: { width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  callBannerTitle: { fontSize: 15, fontFamily: "Inter_700Bold", color: "#fff", marginBottom: 2 },
  callBannerSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },

  sectionHeader: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  sectionTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },

  eventsScroll: { paddingLeft: 16, paddingRight: 8, gap: 10, paddingBottom: 4 },
  eventCard: { width: 170, borderRadius: 16, borderWidth: 1, padding: 14, gap: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  eventTypePill: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: "flex-start" },
  eventTypeTxt: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 0.4 },
  eventCardTitle: { fontSize: 13, fontFamily: "Inter_700Bold", lineHeight: 19 },
  eventCardMeta: { flexDirection: "row", alignItems: "center", gap: 5, flexWrap: "wrap" },
  eventCardMetaTxt: { fontSize: 11, fontFamily: "Inter_400Regular" },

  spotlightCard: { marginHorizontal: 16, marginBottom: 10, borderRadius: 18, borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  spotlightAccent: { height: 4 },
  spotlightBody: { flexDirection: "row", alignItems: "center", padding: 14, gap: 12 },
  spotlightAvatar: { width: 52, height: 52, borderRadius: 26, justifyContent: "center", alignItems: "center" },
  spotlightInitials: { fontSize: 18, fontFamily: "Inter_700Bold" },
  spotlightName: { fontSize: 15, fontFamily: "Inter_700Bold" },
  spotlightLocation: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  spotlightQual: { fontSize: 12, fontFamily: "Inter_400Regular" },
  spotlightCallBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  spotlightBio: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, paddingHorizontal: 14, paddingBottom: 14 },

  pollCard: { marginHorizontal: 16, borderRadius: 18, borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  pollHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  pollHeaderText: { fontSize: 13, fontFamily: "Inter_600SemiBold", color: "rgba(255,255,255,0.9)" },
  pollBody: { padding: 16, gap: 10 },
  pollQuestion: { fontSize: 15, fontFamily: "Inter_700Bold", lineHeight: 22, marginBottom: 4 },
  pollOption: { borderWidth: 1, borderRadius: 12, overflow: "hidden", position: "relative" },
  pollBar: { position: "absolute", top: 0, left: 0, bottom: 0, borderRadius: 12, opacity: 0.18 },
  pollOptionRow: { flexDirection: "row", alignItems: "center", gap: 10, padding: 13 },
  pollRadio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  pollRadioInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#fff" },
  pollOptionText: { flex: 1, fontSize: 13, fontFamily: "Inter_500Medium" },
  pollPct: { fontSize: 12, fontFamily: "Inter_700Bold" },
  pollTotal: { fontSize: 12, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 4 },

  postCard: { marginHorizontal: 16, borderRadius: 18, borderWidth: 1, padding: 14, gap: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  postRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  postAvatar: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  postAvatarText: { fontSize: 14, fontFamily: "Inter_700Bold" },
  postInput: { flex: 1, borderWidth: 1, borderRadius: 12, padding: 12, fontSize: 14, fontFamily: "Inter_400Regular", minHeight: 80, textAlignVertical: "top" },
  postBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingVertical: 13, borderRadius: 12 },
  postBtnText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },

  banner: { marginHorizontal: 16, marginTop: 20, borderRadius: 18, padding: 20, gap: 6 },
  bannerUrdu: { fontSize: 22, fontFamily: "Inter_700Bold", color: "#C9A844" },
  bannerSub: { fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular", lineHeight: 18 },

  resultsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  resultsText: { fontSize: 15, fontFamily: "Inter_700Bold" },
  clearText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyTitle: { fontSize: 18, fontFamily: "Inter_600SemiBold" },
});
