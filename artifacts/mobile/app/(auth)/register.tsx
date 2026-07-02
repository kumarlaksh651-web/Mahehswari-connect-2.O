import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Animated,
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
import { Country, CountryCodePicker, COUNTRIES } from "@/components/CountryCodePicker";

const AKKAS = ["Bhansali", "Chandak", "Daga", "Dugar", "Kasliwal", "Ladha", "Mansinghka", "Murarka", "Ranka", "Singhvi"];

const STEPS = [
  { label: "Profile", icon: "user" as const },
  { label: "Account", icon: "lock" as const },
];

export default function RegisterScreen() {
  const [step, setStep] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [akka, setAkka] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [city, setCity] = useState("");
  const [qualification, setQualification] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<Country>(COUNTRIES[0]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  function animateStep(direction: 1 | -1, callback: () => void) {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: false }),
      Animated.timing(slideAnim, { toValue: direction * -40, duration: 180, useNativeDriver: false }),
    ]).start(() => {
      callback();
      slideAnim.setValue(direction * 40);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 240, useNativeDriver: false }),
        Animated.timing(slideAnim, { toValue: 0, duration: 240, useNativeDriver: false }),
      ]).start();
    });
  }

  function handleNext() {
    if (!name.trim()) { Alert.alert("Required", "Please enter your full name."); return; }
    if (!akka) { Alert.alert("Required", "Please select your Akka (surname)."); return; }
    animateStep(1, () => setStep(2));
  }

  function handleBack() { animateStep(-1, () => setStep(1)); }

  async function handleRegister() {
    if (!phone.trim()) { Alert.alert("Required", "Please enter your phone number."); return; }
    if (!email.trim()) { Alert.alert("Required", "Please enter your email address."); return; }
    if (password.length < 6) { Alert.alert("Weak Password", "Password must be at least 6 characters."); return; }
    if (password !== confirm) { Alert.alert("Mismatch", "Passwords do not match."); return; }
    setLoading(true);
    const result = await register(email.trim(), password, {
      name: name.trim(),
      fatherName: fatherName.trim(),
      akka,
      country: country.trim(),
      city: city.trim(),
      qualification: qualification.trim(),
      phone: phone.trim(),
      countryCode: phoneCountry.code,
    });
    setLoading(false);
    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Registration Failed", result.error ?? "Something went wrong.");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#8B1A1A" }}>
      {/* Background decoration */}
      <View style={s.bgOrb1} />
      <View style={s.bgOrb2} />
      <View style={s.bgOrb3} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={[s.scroll, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 40 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back button */}
          <TouchableOpacity
            style={s.backBtn}
            onPress={() => step === 2 ? handleBack() : router.back()}
          >
            <View style={s.backBtnInner}>
              <Feather name="arrow-left" size={18} color="#8B1A1A" />
            </View>
          </TouchableOpacity>

          {/* ── Logo section ── */}
          <View style={s.logoSection}>
            <View style={s.logoRingOuter}>
              <View style={s.logoRingInner}>
                <Text style={s.logoText}>ॐ</Text>
              </View>
            </View>
            <Text style={s.urduTitle}>دھت مہیشوری</Text>
            <Text style={s.subTitle}>Dhat Maheshwari Community</Text>
          </View>

          {/* ── Step progress ── */}
          <View style={s.stepsRow}>
            {STEPS.map((st, i) => {
              const idx = i + 1;
              const isDone = idx < step;
              const isActive = idx === step;
              return (
                <View key={st.label} style={s.stepItem}>
                  <View style={[
                    s.stepCircle,
                    isDone && { backgroundColor: "#C9A844", borderColor: "#C9A844" },
                    isActive && { backgroundColor: "#fff", borderColor: "#fff" },
                    !isDone && !isActive && { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)" },
                  ]}>
                    {isDone
                      ? <Feather name="check" size={14} color="#8B1A1A" />
                      : <Feather name={st.icon} size={14} color={isActive ? "#8B1A1A" : "rgba(255,255,255,0.5)"} />
                    }
                  </View>
                  <Text style={[s.stepLabel, { color: isActive ? "#fff" : isDone ? "#C9A844" : "rgba(255,255,255,0.4)" }]}>{st.label}</Text>
                  {i < STEPS.length - 1 && (
                    <View style={[s.stepConnector, { backgroundColor: step > 1 ? "#C9A844" : "rgba(255,255,255,0.2)" }]} />
                  )}
                </View>
              );
            })}
          </View>

          {/* ── Form Card ── */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateX: slideAnim }] }}>
            <View style={s.formCard}>
              <Text style={[s.formTitle, { color: colors.foreground }]}>
                {step === 1 ? "Your Profile" : "Create Account"}
              </Text>
              <Text style={[s.formSub, { color: colors.mutedForeground }]}>
                {step === 1 ? "Tell the community about yourself" : "Set up your login credentials"}
              </Text>

              <View style={s.formFields}>
                {step === 1 ? (
                  <>
                    <Field label="Full Name *" value={name} onChange={setName} placeholder="e.g. Ramesh Kumar Bhansali" colors={colors} icon="user" />
                    <Field label="Father's Name" value={fatherName} onChange={setFatherName} placeholder="e.g. Govind Das Bhansali" colors={colors} icon="users" />

                    {/* Akka selector */}
                    <View>
                      <Text style={[s.fieldLabel, { color: colors.foreground }]}>Surname / Akka *</Text>
                      <Text style={[s.fieldSub, { color: colors.mutedForeground }]}>Select your community akka (gotra)</Text>
                      <View style={s.akkaGrid}>
                        {AKKAS.map((a) => (
                          <TouchableOpacity
                            key={a}
                            style={[
                              s.akkaChip,
                              { borderColor: colors.border, backgroundColor: akka === a ? colors.primary : colors.secondary },
                            ]}
                            onPress={() => setAkka(a)}
                          >
                            {akka === a && <Feather name="check" size={11} color={colors.primaryForeground} />}
                            <Text style={[s.akkaChipText, { color: akka === a ? colors.primaryForeground : colors.foreground }]}>{a}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>

                    <Field label="Country *" value={country} onChange={setCountry} placeholder="e.g. Pakistan, UAE, UK" colors={colors} icon="globe" />
                    <Field label="City" value={city} onChange={setCity} placeholder="e.g. Karachi, Hyderabad, Mithi" colors={colors} icon="map-pin" />
                    <Field label="Qualification / Profession" value={qualification} onChange={setQualification} placeholder="e.g. MBBS, MBA, Gold Trader" colors={colors} icon="briefcase" />

                    <TouchableOpacity style={[s.primaryBtn, { backgroundColor: colors.primary }]} onPress={handleNext} activeOpacity={0.85}>
                      <Text style={[s.primaryBtnText, { color: colors.primaryForeground }]}>Continue</Text>
                      <Feather name="arrow-right" size={18} color={colors.primaryForeground} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    {/* Phone */}
                    <View>
                      <Text style={[s.fieldLabel, { color: colors.foreground }]}>Phone Number *</Text>
                      <View style={s.phoneRow}>
                        <CountryCodePicker selected={phoneCountry} onChange={setPhoneCountry} />
                        <TextInput
                          style={[s.input, s.phoneInput, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
                          placeholder="3XX XXXXXXX"
                          placeholderTextColor={colors.mutedForeground}
                          keyboardType="phone-pad"
                          value={phone}
                          onChangeText={setPhone}
                        />
                      </View>
                    </View>

                    {/* Email */}
                    <View>
                      <Text style={[s.fieldLabel, { color: colors.foreground }]}>Email Address *</Text>
                      <View style={s.inputWrap}>
                        <Feather name="mail" size={16} color={colors.mutedForeground} style={s.inputIcon} />
                        <TextInput
                          style={[s.input, s.inputWithIcon, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
                          placeholder="Enter your email"
                          placeholderTextColor={colors.mutedForeground}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={email}
                          onChangeText={setEmail}
                        />
                      </View>
                    </View>

                    {/* Password */}
                    <View>
                      <Text style={[s.fieldLabel, { color: colors.foreground }]}>Password *</Text>
                      <View style={s.inputWrap}>
                        <Feather name="lock" size={16} color={colors.mutedForeground} style={s.inputIcon} />
                        <TextInput
                          style={[s.input, s.inputWithIcon, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border, paddingRight: 50 }]}
                          placeholder="Minimum 6 characters"
                          placeholderTextColor={colors.mutedForeground}
                          secureTextEntry={!showPass}
                          value={password}
                          onChangeText={setPassword}
                        />
                        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(!showPass)}>
                          <Feather name={showPass ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
                        </TouchableOpacity>
                      </View>
                      {/* Strength indicator */}
                      {password.length > 0 && (
                        <View style={s.strengthRow}>
                          {[0, 1, 2, 3].map((i) => (
                            <View key={i} style={[s.strengthBar, {
                              backgroundColor: password.length > i * 3
                                ? password.length < 6 ? "#EF4444" : password.length < 10 ? "#F59E0B" : "#22C55E"
                                : colors.border
                            }]} />
                          ))}
                          <Text style={[s.strengthText, { color: colors.mutedForeground }]}>
                            {password.length < 6 ? "Weak" : password.length < 10 ? "Good" : "Strong"}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Confirm Password */}
                    <View>
                      <Text style={[s.fieldLabel, { color: colors.foreground }]}>Confirm Password *</Text>
                      <View style={s.inputWrap}>
                        <Feather name="shield" size={16} color={colors.mutedForeground} style={s.inputIcon} />
                        <TextInput
                          style={[s.input, s.inputWithIcon, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border, paddingRight: 50 }]}
                          placeholder="Re-enter your password"
                          placeholderTextColor={colors.mutedForeground}
                          secureTextEntry={!showConfirm}
                          value={confirm}
                          onChangeText={setConfirm}
                        />
                        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
                          <Feather name={showConfirm ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
                        </TouchableOpacity>
                      </View>
                      {confirm.length > 0 && (
                        <View style={s.matchRow}>
                          <Feather name={password === confirm ? "check-circle" : "x-circle"} size={13} color={password === confirm ? "#22C55E" : "#EF4444"} />
                          <Text style={{ fontSize: 12, fontFamily: "Inter_400Regular", color: password === confirm ? "#22C55E" : "#EF4444" }}>
                            {password === confirm ? "Passwords match" : "Passwords do not match"}
                          </Text>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[s.primaryBtn, { backgroundColor: colors.primary, opacity: loading ? 0.75 : 1 }]}
                      onPress={handleRegister}
                      disabled={loading}
                      activeOpacity={0.85}
                    >
                      {loading ? (
                        <ActivityIndicator color={colors.primaryForeground} />
                      ) : (
                        <>
                          <Feather name="check" size={18} color={colors.primaryForeground} />
                          <Text style={[s.primaryBtnText, { color: colors.primaryForeground }]}>Create Account</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Animated.View>

          {/* Footer */}
          <View style={s.footer}>
            <Text style={s.footerText}>Already a member? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <Text style={s.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({ label, value, onChange, placeholder, colors, icon }: any) {
  return (
    <View>
      <Text style={[s.fieldLabel, { color: colors.foreground }]}>{label}</Text>
      <View style={s.inputWrap}>
        <Feather name={icon} size={16} color={colors.mutedForeground} style={s.inputIcon} />
        <TextInput
          style={[s.input, s.inputWithIcon, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  scroll: { flexGrow: 1, paddingHorizontal: 20 },

  // Background orbs
  bgOrb1: { position: "absolute", width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(201,168,68,0.08)", top: -80, right: -80 },
  bgOrb2: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "rgba(255,255,255,0.04)", bottom: 200, left: -60 },
  bgOrb3: { position: "absolute", width: 150, height: 150, borderRadius: 75, backgroundColor: "rgba(201,168,68,0.05)", bottom: 60, right: 20 },

  backBtn: { marginBottom: 16 },
  backBtnInner: { width: 38, height: 38, borderRadius: 19, backgroundColor: "rgba(255,255,255,0.9)", justifyContent: "center", alignItems: "center" },

  logoSection: { alignItems: "center", gap: 8, marginBottom: 28 },
  logoRingOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: "#C9A844", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(201,168,68,0.1)" },
  logoRingInner: { width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.08)", justifyContent: "center", alignItems: "center" },
  logoText: { fontSize: 30, color: "#C9A844" },
  urduTitle: { fontSize: 20, fontFamily: "Inter_700Bold", color: "#C9A844" },
  subTitle: { fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular" },

  stepsRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 0, marginBottom: 24 },
  stepItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  stepLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  stepConnector: { width: 40, height: 2, marginHorizontal: 4, borderRadius: 1 },

  formCard: { backgroundColor: "#fff", borderRadius: 24, padding: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 12 },
  formTitle: { fontSize: 24, fontFamily: "Inter_700Bold", marginBottom: 4 },
  formSub: { fontSize: 14, fontFamily: "Inter_400Regular", marginBottom: 4 },
  formFields: { gap: 18, marginTop: 18 },

  fieldLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold", marginBottom: 6 },
  fieldSub: { fontSize: 11, fontFamily: "Inter_400Regular", marginBottom: 8, marginTop: -2 },

  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: 14, top: 0, bottom: 0, textAlignVertical: "center", zIndex: 1, lineHeight: 50 },
  input: { paddingHorizontal: 16, paddingVertical: 15, borderRadius: 14, fontSize: 15, fontFamily: "Inter_400Regular", borderWidth: 1 },
  inputWithIcon: { paddingLeft: 44 },
  eyeBtn: { position: "absolute", right: 14, top: 0, bottom: 0, justifyContent: "center" },

  phoneRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  phoneInput: { flex: 1 },

  strengthRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  strengthBar: { height: 4, flex: 1, borderRadius: 2 },
  strengthText: { fontSize: 11, fontFamily: "Inter_600SemiBold" },

  matchRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 6 },

  akkaGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  akkaChip: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 13, paddingVertical: 9, borderRadius: 12, borderWidth: 1 },
  akkaChipText: { fontSize: 13, fontFamily: "Inter_600SemiBold" },

  primaryBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 17, borderRadius: 14, gap: 8, marginTop: 4 },
  primaryBtnText: { fontSize: 17, fontFamily: "Inter_700Bold" },

  footer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 },
  footerText: { fontSize: 15, fontFamily: "Inter_400Regular", color: "rgba(255,255,255,0.7)" },
  footerLink: { fontSize: 15, fontFamily: "Inter_700Bold", color: "#C9A844" },
});
