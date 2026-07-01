import { Feather } from "@expo/vector-icons";
import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Member } from "@/context/MembersContext";
import { useColors } from "@/hooks/useColors";

interface CallSheetProps {
  member: Member | null;
  visible: boolean;
  onClose: () => void;
}

export function CallSheet({ member, visible, onClose }: CallSheetProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  if (!member) return null;

  const phone = `${member.countryCode}${member.phone}`;
  const phoneNoPlus = phone.replace("+", "");

  async function handleWhatsApp() {
    const waUrl = `whatsapp://send?phone=${phoneNoPlus}`;
    const canOpen = await Linking.canOpenURL(waUrl).catch(() => false);
    if (canOpen) {
      await Linking.openURL(waUrl);
    } else {
      await Linking.openURL(`https://wa.me/${phoneNoPlus}`);
    }
    onClose();
  }

  async function handleBotim() {
    await Linking.openURL("botim://").catch(() => {
      Linking.openURL("https://botim.me");
    });
    onClose();
  }

  async function handlePhone() {
    await Linking.openURL(`tel:${phone}`);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.card,
              paddingBottom: Math.max(insets.bottom, 16) + 8,
            },
          ]}
        >
          <View style={[styles.handle, { backgroundColor: colors.border }]} />

          <View style={[styles.memberAvatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.memberInitial, { color: colors.primaryForeground }]}>
              {member.name[0]}
            </Text>
          </View>

          <Text style={[styles.title, { color: colors.foreground }]}>
            Call {member.name.split(" ")[0]}
          </Text>
          <Text style={[styles.phone, { color: colors.mutedForeground }]}>
            {member.countryFlag} {member.countryCode} {member.phone}
          </Text>

          <View style={styles.options}>
            <TouchableOpacity
              style={[styles.option, { backgroundColor: "#25D366" }]}
              onPress={handleWhatsApp}
            >
              <Feather name="message-circle" size={26} color="#fff" />
              <Text style={styles.optionLabel}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, { backgroundColor: "#0088CC" }]}
              onPress={handleBotim}
            >
              <Feather name="video" size={26} color="#fff" />
              <Text style={styles.optionLabel}>Botim</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.option, { backgroundColor: colors.primary }]}
              onPress={handlePhone}
            >
              <Feather name="phone-call" size={26} color="#fff" />
              <Text style={styles.optionLabel}>Phone</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.cancelBtn, { backgroundColor: colors.muted }]}
            onPress={onClose}
          >
            <Text style={[styles.cancelText, { color: colors.foreground }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 20,
  },
  memberAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  memberInitial: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  phone: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginTop: 4,
    marginBottom: 28,
  },
  options: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  option: {
    width: 94,
    height: 86,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  optionLabel: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  cancelBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
