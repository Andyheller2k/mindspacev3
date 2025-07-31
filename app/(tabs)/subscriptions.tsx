import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

type PlanType = "annual" | "monthly"

interface PaymentForm {
  email: string
  cardNumber: string
  expiryDate: string
  cvc: string
  cardholderName: string
}

const benefits = [
  "1000+ guided meditations",
  "200+ sleep stories & sounds",
  "Offline downloads",
  "Advanced progress tracking",
  "Personalized recommendations",
  "Premium focus music",
  "Priority customer support",
  "Cancel anytime",
]

export default function UpgradeScreen() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
  })

  const monthlyPrice = 12.99
  const annualPrice = 69.99
  const annualMonthlyPrice = (annualPrice / 12).toFixed(2)
  const savings = Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100)

  const updatePaymentForm = (field: keyof PaymentForm, value: string): void => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    return v.match(/.{1,4}/g)?.join(" ") || ""
  }

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\D/g, "")
    return v.length < 3 ? v : `${v.slice(0, 2)}/${v.slice(2, 4)}`
  }

  const validateForm = (): boolean => {
    const { email, cardNumber, expiryDate, cvc, cardholderName } = paymentForm
    if (!email || !cardNumber || !expiryDate || !cvc || !cardholderName) {
      Alert.alert("Missing Information", "Please fill in all payment details.")
      return false
    }
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.")
      return false
    }
    if (cardNumber.replace(/\s/g, "").length < 16) {
      Alert.alert("Invalid Card", "Please enter a valid card number.")
      return false
    }
    return true
  }

  const handleSubscribe = async () => {
    if (!validateForm()) return
    setIsProcessing(true)
    try {
      await new Promise((res) => setTimeout(res, 2000))
      Alert.alert("Welcome to Premium!", "Trial started successfully.")
      router.push("/explore")
    } catch (error) {
      Alert.alert("Error", "Something went wrong.")
    } finally {
      setIsProcessing(false)
    }
  }

  const renderBenefit = (benefit: string, index: number) => (
    <View key={index} style={styles.benefitRow}>
      <Ionicons name="checkmark-circle" size={18} color="#10b981" />
      <Text style={styles.benefitText}>{benefit}</Text>
    </View>
  )

  const renderPlanCard = (plan: PlanType) => {
    const isAnnual = plan === "annual"
    const selected = selectedPlan === plan
    const price = isAnnual ? annualPrice : monthlyPrice
    const displayPrice = isAnnual ? `${annualMonthlyPrice}/mo` : `${monthlyPrice}/mo`
    const billedText = isAnnual ? `Billed annually ($${annualPrice})` : "Billed monthly"

    return (
      <TouchableOpacity
        key={plan}
        style={[styles.planCard, selected && styles.selectedPlanCard]}
        onPress={() => setSelectedPlan(plan)}
      >
        {isAnnual && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Save {savings}%</Text>
          </View>
        )}
        <View style={styles.planHeader}>
          <Text style={styles.planTitle}>{isAnnual ? "Annual Plan" : "Monthly Plan"}</Text>
          {selected && <Ionicons name="checkmark-circle" size={20} color="#f97316" />}
        </View>
        <Text style={styles.planPrice}>{displayPrice}</Text>
        <Text style={styles.planBilling}>{billedText}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <LinearGradient colors={["#64748b", "#1e293b"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#f1f5f9" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Upgrade to Premium</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.glassCard}>
          <Text style={styles.sectionTitle}>What you get</Text>
          {benefits.map(renderBenefit)}

          <Text style={styles.sectionTitle}>Choose your plan</Text>
          <View style={styles.planRow}>
            {(["annual", "monthly"] as PlanType[]).map(renderPlanCard)}
          </View>

          <Text style={styles.sectionTitle}>Payment Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#cbd5e1"
            keyboardType="email-address"
            autoCapitalize="none"
            value={paymentForm.email}
            onChangeText={(val) => updatePaymentForm("email", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Card number"
            placeholderTextColor="#cbd5e1"
            keyboardType="numeric"
            maxLength={19}
            value={paymentForm.cardNumber}
            onChangeText={(val) => updatePaymentForm("cardNumber", formatCardNumber(val))}
          />
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/YY"
              placeholderTextColor="#cbd5e1"
              keyboardType="numeric"
              value={paymentForm.expiryDate}
              onChangeText={(val) => updatePaymentForm("expiryDate", formatExpiryDate(val))}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVC"
              placeholderTextColor="#cbd5e1"
              keyboardType="numeric"
              value={paymentForm.cvc}
              onChangeText={(val) => updatePaymentForm("cvc", val.replace(/\D/g, ""))}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Cardholder name"
            placeholderTextColor="#cbd5e1"
            autoCapitalize="words"
            value={paymentForm.cardholderName}
            onChangeText={(val) => updatePaymentForm("cardholderName", val)}
          />

          <TouchableOpacity
            style={[styles.subscribeBtn, isProcessing && { backgroundColor: "#9ca3af" }]}
            onPress={handleSubscribe}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.subscribeText}>Start 14-day Free Trial</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 60,
  },
  scroll: {
    paddingHorizontal: 20,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#f1f5f9",
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#e2e8f0",
  },
  planRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  planCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff33",
    backgroundColor: "#33415555",
  },
  selectedPlanCard: {
    borderColor: "#f97316",
    backgroundColor: "#f9731622",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  planPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f97316",
  },
  planBilling: {
    fontSize: 12,
    color: "#cbd5e1",
  },
  popularBadge: {
    position: "absolute",
    top: -8,
    left: 16,
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff22",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    color: "#f1f5f9",
    backgroundColor: "#33415544",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  subscribeBtn: {
    backgroundColor: "#f97316",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  glassCard: {
    backgroundColor: "#ffffff11",
    padding: 20,
    borderRadius: 20,
    borderColor: "#ffffff22",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
})
