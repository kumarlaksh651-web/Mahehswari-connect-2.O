import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";
import {
  Country,
  CountryCodePicker,
  COUNTRIES,
} from "@/components/CountryCodePicker";

const COUNTRIES_MAP: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c])
);

export default function ProfileScreen() {
  const { user, updateProfile, logout } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const [name, setName] = useState(user?.name ?? "");
  const [fatherName, setFatherName] = useState(user?.fatherName ?? "");
  const [akka, setAkka] = useState(user?.akka ?? "");
  const [country, setCountry] = useState(user?.country ?? "Pakistan");
  const [city, setCity] = useState(user?.city ?? "");
  const [qualification, setQualification] = useState(user?.qualification ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [phoneCountry, setPhoneCountry] = useState<Country>(
    COUNTRIES_MAP[user?.countryCode ?? "+92"] ?? COUNTRIES[0]
  );
  const [photo, setPhoto] = useState<string | undefined>(user?.photo);
  const [saving, setSaving] = useState(false);

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? "U";

  async function pickPhoto() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Please allow access to your photos.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }
    setSaving(true);
    await updateProfile({
      name: name.trim(),
      fatherName: fatherName.trim(),
      akka: akka.trim(),
      country: country.trim(),
      city: city.trim(),
      qualification: qualification.trim(),
      phone: phone.trim(),
      countryCode: phoneCountry.code,
      photo,
    });
    setSaving(false);
    Alert.alert("Saved", "Your profile has been updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  }

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

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPad + 12, paddingBottom: botPad + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>
            My Account
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={pickPhoto} style={styles.avatarWrap}>
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={[styles.avatarImg, { borderColor: colors.primary }]}
                contentFit="cover"
              />
            ) : (
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={[styles.avatarInitials, { color: colors.primaryForeground }]}>
                  {initials}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.cameraBtn,
                { backgroundColor: colors.accent, borderColor: colors.background },
              ]}
            >
              <Feather name="camera" size={14} color={colors.primary} />
            </View>
          </TouchableOpacity>
          <Text style={[styles.emailDisplay, { color: colors.mutedForeground }]}>
            {user?.email}
          </Text>
          {user?.verified && (
            <View style={[styles.verifiedBadge, { backgroundColor: "#DCFCE7" }]}>
              <Feather name="check-circle" size={13} color="#16A34A" />
              <Text style={[styles.verifiedText, { color: "#16A34A" }]}>Verified</Text>
            </View>
          )}
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Field
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            colors={colors}
          />
          <Field
            label="Father's Name"
            value={fatherName}
            onChangeText={setFatherName}
            placeholder="Enter father's name"
            colors={colors}
          />
          <Field
            label="Surname / Akka (Gotra)"
            value={akka}
            onChangeText={setAkka}
            placeholder="e.g. Mahajan, Oswal, Gupta"
            colors={colors}
          />
          <Field
            label="Country"
            value={country}
            onChangeText={setCountry}
            placeholder="Enter your country"
            colors={colors}
          />
          <Field
            label="City"
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            colors={colors}
          />
          <Field
            label="Qualification"
            value={qualification}
            onChangeText={setQualification}
            placeholder="e.g. MBA, MBBS, Engineering"
            colors={colors}
          />

          <View>
            <Text style={[styles.label, { color: colors.foreground }]}>
              Phone Number
            </Text>
            <View style={styles.phoneRow}>
              <CountryCodePicker
                selected={phoneCountry}
                onChange={setPhoneCountry}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.phoneInput,
                  {
                    backgroundColor: colors.secondary,
                    color: colors.foreground,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Phone number"
                placeholderTextColor={colors.mutedForeground}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveBtn,
            {
              backgroundColor: colors.primary,
              opacity: saving ? 0.75 : 1,
            },
          ]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.85}
        >
          {saving ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <Text style={[styles.saveBtnText, { color: colors.primaryForeground }]}>
              Save Changes
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutBtn, { borderColor: colors.destructive }]}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={18} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  colors,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  colors: ReturnType<typeof import("@/hooks/useColors").useColors>;
}) {
  return (
    <View>
      <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.secondary,
            color: colors.foreground,
            borderColor: colors.border,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, flexGrow: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
    gap: 8,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  emailDisplay: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  form: { gap: 18, marginBottom: 24 },
  label: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  phoneInput: { flex: 1 },
  saveBtn: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  saveBtnText: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 8,
    marginBottom: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
