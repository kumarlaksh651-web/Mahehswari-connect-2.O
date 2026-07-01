import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
];

interface CountryCodePickerProps {
  selected: Country;
  onChange: (country: Country) => void;
}

export function CountryCodePicker({ selected, onChange }: CountryCodePickerProps) {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.includes(query)
  );

  return (
    <>
      <TouchableOpacity
        style={[
          styles.trigger,
          { backgroundColor: colors.secondary, borderColor: colors.border },
        ]}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.flag}>{selected.flag}</Text>
        <Text style={[styles.code, { color: colors.foreground }]}>
          {selected.code}
        </Text>
        <Feather name="chevron-down" size={14} color={colors.mutedForeground} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => {
          setVisible(false);
          setQuery("");
        }}
      >
        <View
          style={[
            styles.modal,
            { backgroundColor: colors.background, paddingTop: topPad + 12 },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              Select Country
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                setQuery("");
              }}
            >
              <Feather name="x" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: colors.muted,
                color: colors.foreground,
                borderColor: colors.border,
              },
            ]}
            placeholder="Search country..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.name}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.countryRow,
                  { borderBottomColor: colors.border },
                ]}
                onPress={() => {
                  onChange(item);
                  setVisible(false);
                  setQuery("");
                }}
              >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text
                  style={[styles.countryName, { color: colors.foreground }]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[styles.countryCode, { color: colors.mutedForeground }]}
                >
                  {item.code}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  flag: { fontSize: 20 },
  code: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
  modal: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    borderWidth: 1,
    marginBottom: 12,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  countryFlag: { fontSize: 22 },
  countryName: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  countryCode: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
  },
});
