import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function VerifyScreen() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { verifyCode, user } = useAuth();
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  function handleDigit(index: number, value: string) {
    const last = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = last;
    setDigits(newDigits);
    if (last && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(index: number, key: string) {
    if (key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    const code = digits.join("");
    if (code.length < 6) {
      Alert.alert("Incomplete", "Please enter all 6 digits.");
      return;
    }
    setLoading(true);
    const ok = await verifyCode(code);
    setLoading(false);
    if (ok) {
      router.replace("/profile");
    } else {
      Alert.alert("Invalid Code", "Please check the code and try again.");
    }
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: topPad + 16,
          paddingBottom: botPad + 24,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <Feather name="arrow-left" size={24} color={colors.foreground} />
      </TouchableOpacity>

      <View style={styles.iconWrap}>
        <View style={[styles.iconCircle, { backgroundColor: colors.muted }]}>
          <Feather name="mail" size={36} color={colors.primary} />
        </View>
      </View>

      <Text style={[styles.title, { color: colors.primary }]}>
        Verify Your Account
      </Text>
      <Text style={[styles.sub, { color: colors.mutedForeground }]}>
        A verification code has been sent to
      </Text>
      <Text style={[styles.contact, { color: colors.foreground }]}>
        {user?.email ?? "your email"}
      </Text>

      <View style={styles.boxRow}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => { inputRefs.current[i] = r; }}
            style={[
              styles.box,
              {
                backgroundColor: d ? colors.primary : colors.secondary,
                color: d ? colors.primaryForeground : colors.foreground,
                borderColor: d ? colors.primary : colors.border,
              },
            ]}
            value={d}
            onChangeText={(v) => handleDigit(i, v)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
            keyboardType="number-pad"
            maxLength={2}
            textAlign="center"
            selectionColor={colors.accent}
          />
        ))}
      </View>

      <Text style={[styles.hintText, { color: colors.mutedForeground }]}>
        Demo: Enter any 6 digits to verify
      </Text>

      <TouchableOpacity
        style={[
          styles.verifyBtn,
          {
            backgroundColor: colors.primary,
            opacity: loading ? 0.75 : 1,
          },
        ]}
        onPress={handleVerify}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color={colors.primaryForeground} />
        ) : (
          <Text style={[styles.verifyText, { color: colors.primaryForeground }]}>
            Verify Account
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={[styles.resendText, { color: colors.primary }]}>
          Resend Code
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
    marginBottom: 32,
  },
  iconWrap: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  contact: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    marginBottom: 36,
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  box: {
    width: 48,
    height: 58,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  hintText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginBottom: 32,
  },
  verifyBtn: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  verifyText: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  resendBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
  resendText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
