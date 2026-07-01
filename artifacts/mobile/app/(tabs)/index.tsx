import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { CallSheet } from "@/components/CallSheet";
import { Header } from "@/components/Header";
import { MemberCard } from "@/components/MemberCard";
import { Member, useMembers } from "@/context/MembersContext";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const [selectedAkka, setSelectedAkka] = useState<string | null>(null);
  const [callMember, setCallMember] = useState<Member | null>(null);
  const [callVisible, setCallVisible] = useState(false);
  const { members, getAkkas } = useMembers();
  const { user } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const akkas = getAkkas();
  const filtered = selectedAkka
    ? members.filter((m) => m.akka === selectedAkka)
    : members;

  function handleCall(member: Member) {
    setCallMember(member);
    setCallVisible(true);
  }

  const ListHeader = (
    <>
      {/* Profile incomplete banner */}
      {user && !user.name && (
        <TouchableOpacity
          style={[styles.incompleteBanner, { backgroundColor: colors.accent }]}
          onPress={() => router.push("/profile")}
          activeOpacity={0.88}
        >
          <View style={styles.incompleteBannerInner}>
            <Feather name="user" size={16} color={colors.primary} />
            <Text style={[styles.incompleteBannerText, { color: colors.primary }]}>
              Complete your profile to connect with the community
            </Text>
          </View>
          <Feather name="arrow-right" size={16} color={colors.primary} />
        </TouchableOpacity>
      )}

      {/* Greeting */}
      <View style={styles.greetingBlock}>
        <Text style={[styles.greetingTitle, { color: colors.foreground }]}>
          {user?.name ? `Jai Jai Maheshwari, ${user.name.split(" ")[0]}` : "Jai Jai Maheshwari"}
        </Text>
        <Text style={[styles.greetingSubtitle, { color: colors.mutedForeground }]}>
          Connect with the Dhat Maheshwari community
        </Text>
      </View>

      {/* Akka filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        <TouchableOpacity
          style={[
            styles.chip,
            { backgroundColor: !selectedAkka ? colors.primary : colors.secondary },
          ]}
          onPress={() => setSelectedAkka(null)}
        >
          <Text
            style={[
              styles.chipText,
              {
                color: !selectedAkka
                  ? colors.primaryForeground
                  : colors.foreground,
              },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {akkas.map((akka) => (
          <TouchableOpacity
            key={akka}
            style={[
              styles.chip,
              {
                backgroundColor:
                  selectedAkka === akka ? colors.primary : colors.secondary,
              },
            ]}
            onPress={() =>
              setSelectedAkka(akka === selectedAkka ? null : akka)
            }
          >
            <Text
              style={[
                styles.chipText,
                {
                  color:
                    selectedAkka === akka
                      ? colors.primaryForeground
                      : colors.foreground,
                },
              ]}
            >
              {akka}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Section title */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Community Members
        </Text>
        <Text style={[styles.sectionCount, { color: colors.mutedForeground }]}>
          {filtered.length} members
        </Text>
      </View>
    </>
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Pakistan & Worldwide" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberCard member={item} onCall={handleCall} />
        )}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="users" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No members found
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
              Try selecting a different akka filter
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
        showsVerticalScrollIndicator={false}
      />

      <CallSheet
        member={callMember}
        visible={callVisible}
        onClose={() => setCallVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  incompleteBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  incompleteBannerInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  incompleteBannerText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    flex: 1,
  },
  greetingBlock: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  greetingTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  greetingSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginTop: 3,
  },
  chipsRow: {
    paddingHorizontal: 16,
    paddingBottom: 4,
    gap: 8,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  sectionCount: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
});
