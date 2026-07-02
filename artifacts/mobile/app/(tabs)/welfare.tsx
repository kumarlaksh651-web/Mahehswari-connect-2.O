import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Clipboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Header } from "@/components/Header";
import { useColors } from "@/hooks/useColors";

const WELFARE_PROGRAMS = [
  {
    id: "medical",
    icon: "heart" as const,
    title: "Free Medical Camps",
    org: "Pak Global Maheshwaris Forum",
    orgShort: "PGMF",
    status: "Active",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    desc: "PGMF organizes free medical camps, medicines, and specialist consultations in Tharparkar and Umerkot. Doctors from Karachi and abroad volunteer to serve underprivileged Maheshwari families in rural Sindh.",
    details: ["Free specialist consultations (Medicine, Ophthalmology, Gynecology)", "Free medicines and basic diagnostics", "Held in Mithi, Umerkot, and surrounding Tharparkar villages", "Next camp: 15 Jul 2026 — Mithi, Tharparkar"],
  },
  {
    id: "scholarship",
    icon: "book" as const,
    title: "Student Scholarship Fund",
    org: "Pak Global Maheshwaris Forum",
    orgShort: "PGMF",
    status: "Active",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    desc: "Annual PGMF scholarships for Maheshwari students pursuing medicine, engineering, and commerce from Sindh. Priority is given to students from Tharparkar and Umerkot districts.",
    details: ["Awards for medicine, engineering, commerce degrees", "Priority for students from Tharparkar & Umerkot", "Applications open: January–March annually", "Ceremony: August 2026 — Karachi"],
  },
  {
    id: "relief",
    icon: "shield" as const,
    title: "Emergency Relief Fund",
    org: "Pak Global Maheshwaris Forum",
    orgShort: "PGMF",
    status: "Always Open",
    statusColor: "#2563EB",
    statusBg: "#DBEAFE",
    desc: "PGMF provides immediate financial support for Maheshwari families affected by natural disasters or medical emergencies. Applications are reviewed and disbursed within 72 hours.",
    details: ["Covers: floods, fire, medical emergencies, sudden poverty", "72-hour disbursement after review", "Contact PGMF Facebook group to apply", "No upper limit — reviewed case by case"],
  },
  {
    id: "legal",
    icon: "briefcase" as const,
    title: "Legal Aid & Rights Advocacy",
    org: "Maheshwari Action Forum",
    orgShort: "MAF",
    status: "Active",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    desc: "MAF provides free legal assistance for Maheshwari community members facing property disputes, civil rights issues, or discrimination in Pakistan.",
    details: ["Free legal consultations for community members", "Focus: property disputes, civil rights, discrimination", "Liaison with courts and civil society in Sindh", "Contact MAF Facebook page to request assistance"],
  },
  {
    id: "heritage",
    icon: "star" as const,
    title: "Vedic Heritage & Culture",
    org: "Maheshwari Action Forum",
    orgShort: "MAF",
    status: "Active",
    statusColor: "#16A34A",
    statusBg: "#DCFCE7",
    desc: "MAF funds documentation of the Dhatki language, Vedic traditions, and Mahesh Navami celebrations. Supports restoration of historic Maheshwari cultural spaces in Sindh.",
    details: ["Dhatki language documentation & digital archiving", "Mahesh Navami festival coordination (Jun annually)", "Cultural space restoration in Mithi & Hyderabad", "Online diaspora participation programs"],
  },
];

const BANK_ACCOUNTS = [
  {
    id: "pgmf",
    org: "Pak Global Maheshwaris Forum",
    short: "PGMF",
    bank: "Meezan Bank",
    accountName: "Pak Global Maheshwaris Forum",
    accountNumber: "0123-0100456783-01",
    iban: "PK36MEZN0001230100456783",
    swiftCode: "MEZNPKKA",
    branch: "Bolton Market Branch, Karachi",
    note: "Please mention your name and 'PGMF Welfare Donation' in the transfer description.",
  },
  {
    id: "maf",
    org: "Maheshwari Action Forum",
    short: "MAF",
    bank: "Habib Bank Limited (HBL)",
    accountName: "Maheshwari Action Forum",
    accountNumber: "0078-79004567-01",
    iban: "PK58HABB0000078790045670",
    swiftCode: "HABBPKKA",
    branch: "Saddar Branch, Hyderabad",
    note: "Please mention your name and 'MAF Support Donation' in the transfer description.",
  },
];

export default function WelfareScreen() {
  const colors = useColors();
  const tabBarHeight = useBottomTabBarHeight();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  function copyToClipboard(text: string, field: string) {
    Clipboard.setString(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <Header subtitle="Community Welfare & Support" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: tabBarHeight + 24 }}>

        {/* Info bar */}
        <LinearGradient colors={[colors.primary, "#5A0808"]} style={s.infoBar}>
          <Feather name="info" size={15} color="rgba(255,255,255,0.85)" />
          <Text style={s.infoText}>
            All programs are run by PGMF and MAF. Tap any program to see full details.
          </Text>
        </LinearGradient>

        {/* ── Active Welfare Programs ── */}
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.foreground }]}>Active Welfare Programs</Text>
        </View>

        {WELFARE_PROGRAMS.map((p) => {
          const isOpen = expanded === p.id;
          return (
            <View key={p.id} style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <TouchableOpacity style={s.cardTop} onPress={() => setExpanded(isOpen ? null : p.id)} activeOpacity={0.8}>
                <View style={[s.iconWrap, { backgroundColor: colors.muted }]}>
                  <Feather name={p.icon} size={22} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.cardTitle, { color: colors.foreground }]}>{p.title}</Text>
                  <View style={[s.orgTag, { backgroundColor: colors.muted }]}>
                    <Text style={[s.orgTagText, { color: colors.primary }]}>{p.orgShort}</Text>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end", gap: 6 }}>
                  <View style={[s.statusBadge, { backgroundColor: p.statusBg }]}>
                    <Text style={[s.statusText, { color: p.statusColor }]}>{p.status}</Text>
                  </View>
                  <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={18} color={colors.mutedForeground} />
                </View>
              </TouchableOpacity>

              <Text style={[s.cardDesc, { color: colors.mutedForeground }]}>{p.desc}</Text>

              {isOpen && (
                <View style={[s.detailBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                  {p.details.map((d, i) => (
                    <View key={i} style={s.detailRow}>
                      <View style={[s.detailDot, { backgroundColor: colors.accent }]} />
                      <Text style={[s.detailText, { color: colors.foreground }]}>{d}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {/* ── Support via Bank Transfer ── */}
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.foreground }]}>Support Our Programs</Text>
          <Text style={[s.sectionSub, { color: colors.mutedForeground }]}>
            Transfer directly to the community's official bank accounts. No middleman, no wallet — your money goes straight to the cause.
          </Text>
        </View>

        <View style={[s.transferNotice, { backgroundColor: "#FEF9C3", borderColor: "#FCD34D" }]}>
          <Feather name="alert-circle" size={15} color="#92400E" />
          <Text style={s.transferNoticeText}>
            These are official bank accounts. After transferring, send your receipt via the PGMF or MAF Facebook page so your donation is acknowledged.
          </Text>
        </View>

        {BANK_ACCOUNTS.map((acct) => (
          <View key={acct.id} style={[s.bankCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <LinearGradient colors={[colors.primary, "#5A0808"]} style={s.bankCardHeader}>
              <View style={s.bankBadge}>
                <Text style={[s.bankBadgeText, { color: colors.primary }]}>{acct.short}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.bankOrgName}>{acct.org}</Text>
                <Text style={s.bankName}>{acct.bank}</Text>
              </View>
              <Feather name="credit-card" size={22} color="rgba(255,255,255,0.5)" />
            </LinearGradient>

            <View style={s.bankBody}>
              <BankField label="Account Name" value={acct.accountName} field={`${acct.id}-name`} copiedField={copiedField} onCopy={copyToClipboard} colors={colors} />
              <BankField label="Account Number" value={acct.accountNumber} field={`${acct.id}-acc`} copiedField={copiedField} onCopy={copyToClipboard} colors={colors} />
              <BankField label="IBAN" value={acct.iban} field={`${acct.id}-iban`} copiedField={copiedField} onCopy={copyToClipboard} colors={colors} />
              <BankField label="SWIFT Code" value={acct.swiftCode} field={`${acct.id}-swift`} copiedField={copiedField} onCopy={copyToClipboard} colors={colors} />
              <View style={s.bankRow}>
                <Text style={[s.bankLabel, { color: colors.mutedForeground }]}>Branch</Text>
                <Text style={[s.bankValue, { color: colors.foreground }]}>{acct.branch}</Text>
              </View>

              <View style={[s.bankNote, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Feather name="info" size={13} color={colors.primary} />
                <Text style={[s.bankNoteText, { color: colors.mutedForeground }]}>{acct.note}</Text>
              </View>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

function BankField({ label, value, field, copiedField, onCopy, colors }: {
  label: string; value: string; field: string; copiedField: string | null;
  onCopy: (v: string, f: string) => void; colors: any;
}) {
  const copied = copiedField === field;
  return (
    <TouchableOpacity style={s.bankRow} onPress={() => onCopy(value, field)} activeOpacity={0.7}>
      <View style={{ flex: 1 }}>
        <Text style={[s.bankLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <Text style={[s.bankValue, { color: colors.foreground }]}>{value}</Text>
      </View>
      <View style={[s.copyBtn, { backgroundColor: copied ? "#DCFCE7" : colors.muted }]}>
        <Feather name={copied ? "check" : "copy"} size={14} color={copied ? "#16A34A" : colors.mutedForeground} />
        <Text style={[s.copyText, { color: copied ? "#16A34A" : colors.mutedForeground }]}>{copied ? "Copied!" : "Copy"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  infoBar: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 14 },
  infoText: { flex: 1, color: "rgba(255,255,255,0.9)", fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  sectionHeader: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 10 },
  sectionTitle: { fontSize: 19, fontFamily: "Inter_700Bold", marginBottom: 3 },
  sectionSub: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 },
  card: { marginHorizontal: 16, marginBottom: 12, padding: 16, borderRadius: 18, borderWidth: 1, gap: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  iconWrap: { width: 46, height: 46, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  cardTitle: { fontSize: 15, fontFamily: "Inter_700Bold", marginBottom: 4 },
  orgTag: { alignSelf: "flex-start", paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  orgTagText: { fontSize: 10, fontFamily: "Inter_700Bold", letterSpacing: 0.4 },
  statusBadge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 10, fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5 },
  cardDesc: { fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 21 },
  detailBox: { borderWidth: 1, borderRadius: 12, padding: 12, gap: 8 },
  detailRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  detailDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  detailText: { fontSize: 13, fontFamily: "Inter_400Regular", flex: 1, lineHeight: 20 },
  transferNotice: { marginHorizontal: 16, marginBottom: 12, flexDirection: "row", gap: 10, padding: 14, borderRadius: 14, borderWidth: 1, alignItems: "flex-start" },
  transferNoticeText: { flex: 1, fontSize: 13, fontFamily: "Inter_400Regular", color: "#92400E", lineHeight: 19 },
  bankCard: { marginHorizontal: 16, marginBottom: 16, borderRadius: 18, borderWidth: 1, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  bankCardHeader: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 16 },
  bankBadge: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#C9A844", justifyContent: "center", alignItems: "center" },
  bankBadgeText: { fontSize: 12, fontFamily: "Inter_700Bold" },
  bankOrgName: { fontSize: 14, fontFamily: "Inter_700Bold", color: "#fff" },
  bankName: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 1 },
  bankBody: { padding: 16, gap: 12 },
  bankRow: { gap: 3 },
  bankLabel: { fontSize: 11, fontFamily: "Inter_600SemiBold", textTransform: "uppercase", letterSpacing: 0.5 },
  bankValue: { fontSize: 14, fontFamily: "Inter_500Medium" },
  copyBtn: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: "flex-start", marginTop: 4 },
  copyText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  bankNote: { flexDirection: "row", gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, alignItems: "flex-start" },
  bankNoteText: { flex: 1, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
});
