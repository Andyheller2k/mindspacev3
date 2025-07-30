"use client"

import { Ionicons } from "@expo/vector-icons"
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
  const [selectedPlan, setSelectedPlan] = useState("annual")

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
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4))
    }
    return parts.join(" ")
  }

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\D/g, "")
    if (v.length < 3) return v
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`
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
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Platform.OS === "android" ? 40 : 60 }}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Upgrade to Premium</Text>
        <View style={{ width: 24 }} /> {/* Spacer to center title */}
      </View>

      <ScrollView style={{ paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        {/* Benefits */}
        <Text style={styles.sectionTitle}>What you get</Text>
        {benefits.map(renderBenefit)}

        {/* Plan selection */}
        <Text style={styles.sectionTitle}>Choose your plan</Text>
        <View style={styles.planRow}>
          {(["annual", "monthly"] as PlanType[]).map(renderPlanCard)}
        </View>

        {/* Payment Info */}
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={paymentForm.email}
          onChangeText={(val) => updatePaymentForm("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Card number"
          keyboardType="numeric"
          maxLength={19}
          value={paymentForm.cardNumber}
          onChangeText={(val) => updatePaymentForm("cardNumber", formatCardNumber(val))}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/YY"
            keyboardType="numeric"
            value={paymentForm.expiryDate}
            onChangeText={(val) => updatePaymentForm("expiryDate", formatExpiryDate(val))}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVC"
            keyboardType="numeric"
            value={paymentForm.cvc}
            onChangeText={(val) => updatePaymentForm("cvc", val.replace(/\D/g, ""))}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Cardholder name"
          autoCapitalize="words"
          value={paymentForm.cardholderName}
          onChangeText={(val) => updatePaymentForm("cardholderName", val)}
        />

        {/* Subscribe */}
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
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: "#1f2937",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#1f2937",
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#374151",
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
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  selectedPlanCard: {
    borderColor: "#f97316",
    backgroundColor: "#fff7ed",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  planPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f97316",
  },
  planBilling: {
    fontSize: 12,
    color: "#6b7280",
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
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
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
    marginBottom: 20,
  },
  subscribeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})
