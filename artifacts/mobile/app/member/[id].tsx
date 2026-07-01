import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CallSheet } from "@/components/CallSheet";
import { useMembers } from "@/context/MembersContext";
import { useColors } from "@/hooks/useColors";

export default function MemberDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getMember } = useMembers();
  const member = getMember(id ?? "");
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [callVisible, setCallVisible] = useState(false);

  if (!member) {
    return (
      <View
        style={[
          styles.notFound,
          { backgroundColor: colors.background, paddingTop: topPad + 20 },
        ]}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </TouchableOpacity>
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>
          Member not found
        </Text>
      </View>
    );
  }

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: botPad + 32 }}
      >
        {/* Header banner */}
        <View style={[styles.heroBanner, { backgroundColor: colors.primary, paddingTop: topPad + 12 }]}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={[styles.avatarCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
              <Text style={styles.avatarInitials}>{initials}</Text>
              {member.online && (
                <View
                  style={[
                    styles.onlineDot,
                    { borderColor: colors.primary },
                  ]}
                />
              )}
            </View>
            <Text style={styles.memberName}>{member.name}</Text>
            <View style={[styles.akkaBadge, { backgroundColor: colors.accent }]}>
              <Text style={[styles.akkaText, { color: colors.primary }]}>
                {member.akka} Akka
              </Text>
            </View>
            <Text style={styles.onlineStatus}>
              {member.online ? "Online" : "Offline"}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsContainer}>
          <DetailRow
            icon="user"
            label="Father's Name"
            value={member.fatherName}
            colors={colors}
          />
          <DetailRow
            icon="map-pin"
            label="Location"
            value={`${member.city}, ${member.country} ${member.countryFlag}`}
            colors={colors}
          />
          <DetailRow
            icon="book"
            label="Qualification"
            value={member.qualification}
            colors={colors}
          />
          <DetailRow
            icon="phone"
            label="Phone"
            value={`${member.countryCode} ${member.phone}`}
            colors={colors}
          />
          {member.bio && (
            <DetailRow
              icon="info"
              label="About"
              value={member.bio}
              colors={colors}
            />
          )}
        </View>

        {/* Call actions */}
        <View style={styles.callSection}>
          <Text style={[styles.callTitle, { color: colors.foreground }]}>
            Get in Touch
          </Text>
          <View style={styles.callBtns}>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: "#25D366" }]}
              onPress={() => setCallVisible(true)}
            >
              <Feather name="message-circle" size={22} color="#fff" />
              <Text style={styles.callBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: "#0088CC" }]}
              onPress={() => setCallVisible(true)}
            >
              <Feather name="video" size={22} color="#fff" />
              <Text style={styles.callBtnText}>Botim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: colors.primary }]}
              onPress={() => setCallVisible(true)}
            >
              <Feather name="phone-call" size={22} color="#fff" />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CallSheet
        member={member}
        visible={callVisible}
        onClose={() => setCallVisible(false)}
      />
    </View>
  );
}

function DetailRow({
  icon,
  label,
  value,
  colors,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  value: string;
  colors: ReturnType<typeof import("@/hooks/useColors").useColors>;
}) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.border }]}>
      <View style={[styles.rowIconWrap, { backgroundColor: colors.muted }]}>
        <Feather name={icon} size={16} color={colors.primary} />
      </View>
      <View style={styles.rowText}>
        <Text style={[styles.rowLabel, { color: colors.mutedForeground }]}>
          {label}
        </Text>
        <Text style={[styles.rowValue, { color: colors.foreground }]}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  notFound: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    marginTop: 40,
  },
  heroBanner: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  backBtn: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -6,
    marginBottom: 16,
  },
  heroContent: {
    alignItems: "center",
    gap: 10,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatarInitials: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    color: "#fff",
  },
  onlineDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#22C55E",
    borderWidth: 2,
  },
  memberName: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    textAlign: "center",
  },
  akkaBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 14,
  },
  akkaText: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  onlineStatus: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontFamily: "Inter_400Regular",
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  rowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowText: { flex: 1 },
  rowLabel: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  callSection: {
    margin: 16,
    marginTop: 20,
  },
  callTitle: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
    marginBottom: 14,
  },
  callBtns: {
    flexDirection: "row",
    gap: 12,
  },
  callBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    gap: 6,
  },
  callBtnText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
});
