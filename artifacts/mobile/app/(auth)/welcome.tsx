import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export default function WelcomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Image
        source={require("@/assets/images/splash.png")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={[
          "rgba(139,26,26,0.55)",
          "rgba(139,26,26,0.88)",
          "rgba(100,10,10,1)",
        ]}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          styles.content,
          { paddingTop: topPad + 50, paddingBottom: botPad + 28 },
        ]}
      >
        <View style={styles.heroSection}>
          <View
            style={[
              styles.logoFrame,
              { borderColor: "rgba(201,168,68,0.6)" },
            ]}
          >
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          <Text style={styles.appName}>Dhat Maheshwari</Text>
          <Text style={[styles.urduName, { color: colors.accent }]}>
            دھت مہیشوری
          </Text>
          <Text style={styles.tagline}>
            Uniting our community across Pakistan and the world
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.accent }]}>500+</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: "rgba(255,255,255,0.3)" }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.accent }]}>15+</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: "rgba(255,255,255,0.3)" }]} />
            <View style={styles.stat}>
              <Text style={[styles.statNum, { color: colors.accent }]}>20+</Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.joinBtn, { backgroundColor: colors.accent }]}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.85}
          >
            <Text style={[styles.joinText, { color: colors.primary }]}>
              Join the Community
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.loginText}>Already a Member? Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          Proudly serving Maheshwari families since 2000
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  heroSection: {
    alignItems: "center",
    gap: 14,
  },
  logoFrame: {
    width: 100,
    height: 100,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: "rgba(255,255,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logo: { width: 80, height: 80 },
  appName: {
    fontSize: 34,
    fontFamily: "Inter_700Bold",
    color: "#fff",
    textAlign: "center",
  },
  urduName: {
    fontSize: 26,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255,255,255,0.78)",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Inter_400Regular",
    paddingHorizontal: 8,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 0,
  },
  stat: { flex: 1, alignItems: "center" },
  statNum: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "Inter_400Regular",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    marginHorizontal: 4,
  },
  actions: { gap: 14 },
  joinBtn: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
  },
  joinText: {
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  loginBtn: {
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  loginText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
  },
  footerNote: {
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
});
