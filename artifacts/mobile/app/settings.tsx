import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const [notifEvents, setNotifEvents] = useState(true);
  const [notifDonations, setNotifDonations] = useState(true);
  const [notifMessages, setNotifMessages] = useState(false);
  const [notifNews, setNotifNews] = useState(true);

  async function handleLogout() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/welcome");
        },
      },
    ]);
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.primary, paddingTop: topPad + 10 },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: botPad + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Account card */}
        <TouchableOpacity
          style={[styles.accountCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/profile")}
          activeOpacity={0.88}
        >
          <View style={[styles.accountAvatar, { backgroundColor: colors.accent }]}>
            <Text style={[styles.accountInitials, { color: colors.primary }]}>{initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.accountName}>
              {user?.name || "Complete your profile"}
            </Text>
            <Text style={styles.accountEmail}>{user?.email}</Text>
            {user?.akka ? (
              <Text style={[styles.accountAkka, { color: colors.accent }]}>
                {user.akka} Akka
              </Text>
            ) : null}
          </View>
          <Feather name="chevron-right" size={20} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        {/* Account section */}
        <SectionTitle label="Account" colors={colors} />
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingRow
            icon="user"
            label="Edit Profile"
            sub="Name, photo, akka, city, qualification"
            colors={colors}
            onPress={() => router.push("/profile")}
          />
          <SettingDivider colors={colors} />
          <SettingRow
            icon="lock"
            label="Change Password"
            sub="Update your account password"
            colors={colors}
            onPress={() => Alert.alert("Coming Soon", "Password change will be available soon.")}
          />
          <SettingDivider colors={colors} />
          <SettingRow
            icon="phone"
            label="Phone Number"
            sub={user?.phone ? `${user.countryCode} ${user.phone}` : "Not set"}
            colors={colors}
            onPress={() => router.push("/profile")}
          />
        </View>

        {/* Notifications */}
        <SectionTitle label="Notifications" colors={colors} />
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ToggleRow
            icon="calendar"
            label="Community Events"
            value={notifEvents}
            onChange={setNotifEvents}
            colors={colors}
          />
          <SettingDivider colors={colors} />
          <ToggleRow
            icon="heart"
            label="Welfare Updates"
            value={notifDonations}
            onChange={setNotifDonations}
            colors={colors}
          />
          <SettingDivider colors={colors} />
          <ToggleRow
            icon="message-circle"
            label="Messages"
            value={notifMessages}
            onChange={setNotifMessages}
            colors={colors}
          />
          <SettingDivider colors={colors} />
          <ToggleRow
            icon="bell"
            label="Community News"
            value={notifNews}
            onChange={setNotifNews}
            colors={colors}
          />
        </View>

        {/* Privacy */}
        <SectionTitle label="Privacy" colors={colors} />
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingRow
            icon="eye"
            label="Profile Visibility"
            sub="Visible to all community members"
            colors={colors}
            onPress={() => Alert.alert("Coming Soon", "Privacy settings will be available soon.")}
          />
          <SettingDivider colors={colors} />
          <SettingRow
            icon="phone"
            label="Phone Visibility"
            sub="Visible to members only"
            colors={colors}
            onPress={() => Alert.alert("Coming Soon", "Privacy settings will be available soon.")}
          />
        </View>

        {/* About */}
        <SectionTitle label="About" colors={colors} />
        <View style={[styles.group, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <SettingRow
            icon="info"
            label="About Dhat Maheshwari App"
            sub="Version 1.0.0"
            colors={colors}
            onPress={() => Alert.alert("Dhat Maheshwari Community", "Version 1.0.0\n\nConnecting the Dhatki Maheshwari community of Pakistan worldwide.")}
          />
          <SettingDivider colors={colors} />
          <SettingRow
            icon="mail"
            label="Contact Support"
            sub="Get help from our team"
            colors={colors}
            onPress={() => Alert.alert("Contact", "Email: support@dhatmaheshwari.com")}
          />
          <SettingDivider colors={colors} />
          <SettingRow
            icon="star"
            label="Rate the App"
            sub="Share your feedback"
            colors={colors}
            onPress={() => Alert.alert("Thank You!", "We appreciate your support.")}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={[styles.logoutBtn, { borderColor: colors.destructive }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SectionTitle({ label, colors }: { label: string; colors: any }) {
  return (
    <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{label.toUpperCase()}</Text>
  );
}

function SettingDivider({ colors }: { colors: any }) {
  return <View style={[styles.divider, { backgroundColor: colors.border }]} />;
}

function SettingRow({ icon, label, sub, colors, onPress }: any) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.rowIcon, { backgroundColor: colors.muted }]}>
        <Feather name={icon} size={16} color={colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, { color: colors.foreground }]}>{label}</Text>
        {sub ? <Text style={[styles.rowSub, { color: colors.mutedForeground }]}>{sub}</Text> : null}
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </TouchableOpacity>
  );
}

function ToggleRow({ icon, label, value, onChange, colors }: any) {
  return (
    <View style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: colors.muted }]}>
        <Feather name={icon} size={16} color={colors.primary} />
      </View>
      <Text style={[styles.rowLabel, { color: colors.foreground, flex: 1 }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  backBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginLeft: -6 },
  headerTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: "#fff" },
  scroll: { paddingHorizontal: 16 },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 4,
  },
  accountAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  accountInitials: { fontSize: 20, fontFamily: "Inter_700Bold" },
  accountName: { fontSize: 16, fontFamily: "Inter_700Bold", color: "#fff" },
  accountEmail: { fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },
  accountAkka: { fontSize: 12, fontFamily: "Inter_600SemiBold", marginTop: 2 },
  sectionTitle: { fontSize: 11, fontFamily: "Inter_700Bold", letterSpacing: 0.8, marginTop: 24, marginBottom: 8 },
  group: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  divider: { height: 1, marginLeft: 60 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 14, gap: 12 },
  rowIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  rowLabel: { fontSize: 15, fontFamily: "Inter_500Medium" },
  rowSub: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    marginTop: 24,
  },
  logoutText: { fontSize: 16, fontFamily: "Inter_600SemiBold" },
});
