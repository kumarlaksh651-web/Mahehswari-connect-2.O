import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CallSheet } from "@/components/CallSheet";
import { MemberCard } from "@/components/MemberCard";
import { Member, useMembers } from "@/context/MembersContext";
import { useColors } from "@/hooks/useColors";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedAkka, setSelectedAkka] = useState<string | null>(null);
  const [callMember, setCallMember] = useState<Member | null>(null);
  const [callVisible, setCallVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const { searchMembers, getAkkas } = useMembers();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  const akkas = getAkkas();
  const results = searchMembers(query, selectedAkka);

  function handleCall(member: Member) {
    setCallMember(member);
    setCallVisible(true);
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.primary,
            paddingTop: topPad + 10,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        <TextInput
          ref={inputRef}
          style={[styles.searchInput, { color: "#fff" }]}
          placeholder="Search by name, akka, city..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          autoCorrect={false}
          selectionColor={colors.accent}
        />

        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Feather name="x" size={20} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        )}
      </View>

      {/* Akka filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.chipsBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
        contentContainerStyle={styles.chipsContent}
      >
        <TouchableOpacity
          style={[
            styles.chip,
            {
              backgroundColor: !selectedAkka ? colors.primary : colors.secondary,
            },
          ]}
          onPress={() => setSelectedAkka(null)}
        >
          <Text
            style={[
              styles.chipText,
              { color: !selectedAkka ? colors.primaryForeground : colors.foreground },
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

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <MemberCard member={item} onCall={handleCall} />
        )}
        ListHeaderComponent={
          <View style={styles.resultCount}>
            <Text style={[styles.resultText, { color: colors.mutedForeground }]}>
              {results.length} member{results.length !== 1 ? "s" : ""} found
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="users" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              No members found
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
              Try a different name, akka, or city
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 12,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    paddingVertical: 8,
  },
  chipsBar: {
    borderBottomWidth: 1,
    maxHeight: 52,
  },
  chipsContent: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  resultCount: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  empty: {
    alignItems: "center",
    paddingTop: 80,
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
