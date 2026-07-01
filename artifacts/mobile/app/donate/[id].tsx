import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
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
import { WELFARE_PROGRAMS } from "@/app/(tabs)/welfare";
import { useColors } from "@/hooks/useColors";

const AMOUNTS = [500, 1000, 2000, 5000, 10000];

const BANKS = [
  { id: "hbl", name: "HBL", fullName: "Habib Bank Limited", account: "1742-7901001-01", iban: "PK06HABB0000174279010101", title: "Dhat Maheshwari Community Fund" },
  { id: "mcb", name: "MCB", fullName: "MCB Bank Limited", account: "0044-3200-4620-0001", iban: "PK49MUCB0044320046200001", title: "Dhat Maheshwari Community Fund" },
  { id: "ubl", name: "UBL", fullName: "United Bank Limited", account: "0109-0001-1234-5678", iban: "PK60UNIL0109000112345678", title: "Dhat Maheshwari Community Fund" },
  { id: "alfalah", name: "Bank Alfalah", fullName: "Bank Alfalah Limited", account: "0037-7012-3456-7890", iban: "PK73ALFH0037701234567890", title: "Dhat Maheshwari Community Fund" },
  { id: "meezan", name: "Meezan", fullName: "Meezan Bank Limited", account: "0317-0102-7123-45", iban: "PK59MEZN0003170102712345", title: "Dhat Maheshwari Community Fund" },
  { id: "nbp", name: "NBP", fullName: "National Bank of Pakistan", account: "0000-0123-4567-890", iban: "PK12NBPA0000001234567890", title: "Dhat Maheshwari Community Fund" },
  { id: "scb", name: "Standard Chartered", fullName: "Standard Chartered Pakistan", account: "01-1234567-01", iban: "PK89SCBL0000001234567890", title: "Dhat Maheshwari Community Fund" },
  { id: "habibnm", name: "Habib Metro", fullName: "Habib Metropolitan Bank", account: "0005-6701-2345-6789", iban: "PK21MPBL0005670123456789", title: "Dhat Maheshwari Community Fund" },
  { id: "jsbank", name: "JS Bank", fullName: "JS Bank Limited", account: "9999-0000-1234-5678", iban: "PK84JSBL9999000012345678", title: "Dhat Maheshwari Community Fund" },
  { id: "faysal", name: "Faysal Bank", fullName: "Faysal Bank Limited", account: "0000-0001-2345-6789", iban: "PK23FAYB0000000123456789", title: "Dhat Maheshwari Community Fund" },
  { id: "bankislami", name: "BankIslami", fullName: "BankIslami Pakistan", account: "0003-0012-3456-78", iban: "PK15BKIP0000030012345678", title: "Dhat Maheshwari Community Fund" },
  { id: "askari", name: "Askari Bank", fullName: "Askari Bank Limited", account: "0001-1234-5678-9012", iban: "PK76ASCM0000001234567890", title: "Dhat Maheshwari Community Fund" },
];

const FINTECH = [
  { id: "jazzcash", name: "JazzCash", number: "0300-1234567", icon: "zap" as const, color: "#DD0000" },
  { id: "easypaisa", name: "EasyPaisa", number: "0302-1234567", icon: "credit-card" as const, color: "#007A3D" },
  { id: "nayapay", name: "NayaPay", number: "ID: maheshwarifund", icon: "smartphone" as const, color: "#1E1E2F" },
  { id: "sadapay", name: "SadaPay", number: "ID: maheshwarifund", icon: "dollar-sign" as const, color: "#FF5733" },
  { id: "keenu", name: "Keenu", number: "Account: maheshwarifund", icon: "key" as const, color: "#6C3483" },
];

type PayTab = "bank" | "fintech";

export default function DonateScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const program = WELFARE_PROGRAMS.find((p) => p.id === id);
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorCnic, setDonorCnic] = useState("");
  const [payTab, setPayTab] = useState<PayTab>("bank");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedFintech, setSelectedFintech] = useState<string | null>(null);
  const [txnId, setTxnId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = amount ?? (customAmount ? parseInt(customAmount) : null);
  const selectedBankData = BANKS.find((b) => b.id === selectedBank);
  const selectedFintechData = FINTECH.find((f) => f.id === selectedFintech);

  function handleSubmit() {
    if (!donorName.trim()) { Alert.alert("Required", "Please enter your name."); return; }
    if (!donorEmail.trim()) { Alert.alert("Required", "Please enter your email."); return; }
    if (!donorPhone.trim()) { Alert.alert("Required", "Please enter your phone number."); return; }
    if (!finalAmount || finalAmount < 100) { Alert.alert("Amount", "Please select or enter a donation amount (minimum PKR 100)."); return; }
    if (!selectedBank && !selectedFintech) { Alert.alert("Payment", "Please select a payment method."); return; }
    if (!txnId.trim()) { Alert.alert("Transaction ID", "Please enter your transaction ID or reference number after making the transfer."); return; }
    setSubmitted(true);
  }

  if (!program) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background }}>
        <Text style={{ color: colors.foreground, fontFamily: "Inter_600SemiBold" }}>Program not found</Text>
      </View>
    );
  }

  if (submitted) {
    return (
      <View style={[styles.successScreen, { backgroundColor: colors.background, paddingTop: topPad + 20, paddingBottom: botPad + 24 }]}>
        <View style={[styles.successIcon, { backgroundColor: "#DCFCE7" }]}>
          <Feather name="check-circle" size={56} color="#16A34A" />
        </View>
        <Text style={[styles.successTitle, { color: colors.foreground }]}>Thank You!</Text>
        <Text style={[styles.successSub, { color: colors.mutedForeground }]}>
          Your donation of PKR {finalAmount?.toLocaleString()} to{"\n"}
          <Text style={{ fontFamily: "Inter_700Bold", color: colors.primary }}>{program.title}</Text>
          {"\n"}has been received.
        </Text>
        <Text style={[styles.successNote, { color: colors.mutedForeground }]}>
          Our team will verify your payment (TXN: {txnId}) and send a confirmation to {donorEmail} within 24 hours.
        </Text>
        <TouchableOpacity
          style={[styles.doneBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.doneBtnText, { color: colors.primaryForeground }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPad + 12, paddingBottom: botPad + 32 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.foreground} />
          </TouchableOpacity>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>Donate</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Program summary */}
        <View style={[styles.programCard, { backgroundColor: colors.primary }]}>
          <Feather name={program.icon} size={20} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.programTitle, { color: "#fff" }]}>{program.title}</Text>
            <Text style={[styles.programGoal, { color: "rgba(255,255,255,0.7)" }]}>
              Goal: {program.goal}  ·  Raised: {program.raised}
            </Text>
          </View>
        </View>

        {/* Donor Info */}
        <SectionLabel label="Your Information" colors={colors} />
        <View style={styles.form}>
          <FormField label="Full Name *" value={donorName} onChangeText={setDonorName} placeholder="Enter your full name" colors={colors} />
          <FormField label="Email Address *" value={donorEmail} onChangeText={setDonorEmail} placeholder="Enter your email" keyboardType="email-address" colors={colors} />
          <FormField label="Phone Number *" value={donorPhone} onChangeText={setDonorPhone} placeholder="03XX XXXXXXX" keyboardType="phone-pad" colors={colors} />
          <FormField label="CNIC (Optional)" value={donorCnic} onChangeText={setDonorCnic} placeholder="XXXXX-XXXXXXX-X" keyboardType="number-pad" colors={colors} />
        </View>

        {/* Amount */}
        <SectionLabel label="Donation Amount (PKR)" colors={colors} />
        <View style={styles.amountGrid}>
          {AMOUNTS.map((a) => (
            <TouchableOpacity
              key={a}
              style={[
                styles.amountChip,
                {
                  backgroundColor: amount === a ? colors.primary : colors.secondary,
                  borderColor: amount === a ? colors.primary : colors.border,
                },
              ]}
              onPress={() => { setAmount(a); setCustomAmount(""); }}
            >
              <Text style={[styles.amountText, { color: amount === a ? colors.primaryForeground : colors.foreground }]}>
                {a.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={[styles.customInput, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
          placeholder="Or enter custom amount..."
          placeholderTextColor={colors.mutedForeground}
          keyboardType="number-pad"
          value={customAmount}
          onChangeText={(v) => { setCustomAmount(v); setAmount(null); }}
        />

        {/* Payment Method */}
        <SectionLabel label="Payment Method" colors={colors} />
        <View style={[styles.payTabRow, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          {(["bank", "fintech"] as PayTab[]).map((t) => (
            <TouchableOpacity
              key={t}
              style={[
                styles.payTabBtn,
                payTab === t && { backgroundColor: colors.primary },
              ]}
              onPress={() => { setPayTab(t); setSelectedBank(null); setSelectedFintech(null); }}
            >
              <Text style={[styles.payTabText, { color: payTab === t ? colors.primaryForeground : colors.mutedForeground }]}>
                {t === "bank" ? "Bank Transfer" : "Mobile Fintech"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {payTab === "bank" && (
          <>
            <Text style={[styles.payHint, { color: colors.mutedForeground }]}>Select your bank to see account details:</Text>
            <View style={styles.bankGrid}>
              {BANKS.map((b) => (
                <TouchableOpacity
                  key={b.id}
                  style={[
                    styles.bankChip,
                    {
                      backgroundColor: selectedBank === b.id ? colors.primary : colors.secondary,
                      borderColor: selectedBank === b.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedBank(b.id)}
                >
                  <Text style={[styles.bankChipText, { color: selectedBank === b.id ? colors.primaryForeground : colors.foreground }]}>
                    {b.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedBankData && (
              <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.detailHeading, { color: colors.foreground }]}>
                  {selectedBankData.fullName}
                </Text>
                <DetailRow label="Account Title" value={selectedBankData.title} colors={colors} />
                <DetailRow label="Account Number" value={selectedBankData.account} colors={colors} />
                <DetailRow label="IBAN" value={selectedBankData.iban} colors={colors} />
                <Text style={[styles.detailNote, { color: colors.mutedForeground }]}>
                  Please transfer PKR {finalAmount ? finalAmount.toLocaleString() : "___"} and enter the transaction ID below.
                </Text>
              </View>
            )}
          </>
        )}

        {payTab === "fintech" && (
          <>
            <Text style={[styles.payHint, { color: colors.mutedForeground }]}>Select mobile app to see transfer details:</Text>
            <View style={styles.fintechRow}>
              {FINTECH.map((f) => (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.fintechChip,
                    {
                      backgroundColor: selectedFintech === f.id ? colors.primary : colors.secondary,
                      borderColor: selectedFintech === f.id ? colors.primary : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedFintech(f.id)}
                >
                  <Feather name={f.icon} size={14} color={selectedFintech === f.id ? colors.primaryForeground : colors.foreground} />
                  <Text style={[styles.fintechText, { color: selectedFintech === f.id ? colors.primaryForeground : colors.foreground }]}>
                    {f.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedFintechData && (
              <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.detailHeading, { color: colors.foreground }]}>
                  {selectedFintechData.name}
                </Text>
                <DetailRow label="Send To" value={selectedFintechData.number} colors={colors} />
                <Text style={[styles.detailNote, { color: colors.mutedForeground }]}>
                  Send PKR {finalAmount ? finalAmount.toLocaleString() : "___"} and enter the transaction ID below.
                </Text>
              </View>
            )}
          </>
        )}

        {/* Transaction ID */}
        <SectionLabel label="Transaction Reference" colors={colors} />
        <Text style={[styles.txnHint, { color: colors.mutedForeground }]}>
          After completing the transfer, enter your transaction ID or reference number here:
        </Text>
        <TextInput
          style={[styles.txnInput, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
          placeholder="e.g. TXN-0012345678"
          placeholderTextColor={colors.mutedForeground}
          value={txnId}
          onChangeText={setTxnId}
          autoCapitalize="characters"
        />

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, { backgroundColor: colors.accent }]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Feather name="heart" size={18} color={colors.primary} />
          <Text style={[styles.submitText, { color: colors.primary }]}>
            Confirm Donation
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SectionLabel({ label, colors }: { label: string; colors: any }) {
  return (
    <Text style={[styles.sectionLabel, { color: colors.foreground }]}>{label}</Text>
  );
}

function FormField({ label, value, onChangeText, placeholder, keyboardType, colors }: any) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={[styles.fieldLabel, { color: colors.foreground }]}>{label}</Text>
      <TextInput
        style={[styles.fieldInput, { backgroundColor: colors.secondary, color: colors.foreground, borderColor: colors.border }]}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? "default"}
        autoCapitalize="words"
      />
    </View>
  );
}

function DetailRow({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={styles.detailRow}>
      <Text style={[styles.detailLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <Text style={[styles.detailValue, { color: colors.foreground }]} selectable>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16, flexGrow: 1 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  backBtn: { width: 40, height: 40, justifyContent: "center", alignItems: "center", marginLeft: -8 },
  pageTitle: { fontSize: 18, fontFamily: "Inter_700Bold" },
  programCard: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 14, marginBottom: 24 },
  programTitle: { fontSize: 14, fontFamily: "Inter_700Bold" },
  programGoal: { fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 },
  form: { gap: 14, marginBottom: 4 },
  sectionLabel: { fontSize: 16, fontFamily: "Inter_700Bold", marginTop: 20, marginBottom: 10 },
  fieldLabel: { fontSize: 13, fontFamily: "Inter_600SemiBold" },
  fieldInput: { paddingHorizontal: 14, paddingVertical: 14, borderRadius: 12, fontSize: 15, fontFamily: "Inter_400Regular", borderWidth: 1 },
  amountGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 12 },
  amountChip: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, borderWidth: 1 },
  amountText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  customInput: { paddingHorizontal: 14, paddingVertical: 14, borderRadius: 12, fontSize: 15, fontFamily: "Inter_400Regular", borderWidth: 1, marginBottom: 4 },
  payTabRow: { flexDirection: "row", borderRadius: 12, borderWidth: 1, overflow: "hidden", marginBottom: 14 },
  payTabBtn: { flex: 1, paddingVertical: 12, alignItems: "center" },
  payTabText: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  payHint: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 10 },
  bankGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  bankChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  bankChipText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  fintechRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  fintechChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1 },
  fintechText: { fontSize: 13, fontFamily: "Inter_500Medium" },
  detailCard: { padding: 14, borderRadius: 14, borderWidth: 1, gap: 10, marginBottom: 4 },
  detailHeading: { fontSize: 15, fontFamily: "Inter_700Bold" },
  detailRow: { gap: 3 },
  detailLabel: { fontSize: 12, fontFamily: "Inter_400Regular" },
  detailValue: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  detailNote: { fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18 },
  txnHint: { fontSize: 13, fontFamily: "Inter_400Regular", marginBottom: 10 },
  txnInput: { paddingHorizontal: 14, paddingVertical: 14, borderRadius: 12, fontSize: 15, fontFamily: "Inter_500Medium", borderWidth: 1, marginBottom: 4 },
  submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 18, borderRadius: 14, marginTop: 20 },
  submitText: { fontSize: 17, fontFamily: "Inter_700Bold" },
  successScreen: { flex: 1, paddingHorizontal: 28, alignItems: "center", justifyContent: "center", gap: 16 },
  successIcon: { width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center" },
  successTitle: { fontSize: 32, fontFamily: "Inter_700Bold" },
  successSub: { fontSize: 16, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 26 },
  successNote: { fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20, paddingHorizontal: 16 },
  doneBtn: { paddingVertical: 18, paddingHorizontal: 48, borderRadius: 14, marginTop: 8 },
  doneBtnText: { fontSize: 17, fontFamily: "Inter_700Bold" },
});
