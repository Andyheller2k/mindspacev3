"use client"

import { Ionicons } from "@expo/vector-icons";
import type { JSX } from "react"; // Import JSX to fix the undeclared variable error
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => never
  triggeredByContent?: string
}

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

const SubscriptionModal = ({ isOpen, onClose, triggeredByContent }: SubscriptionModalProps): JSX.Element => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
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

  const handleSubscribe = async (): Promise<void> => {
    if (!validateForm()) return

    setIsProcessing(true)

    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsProcessing(false)
      onClose()

      Alert.alert(
        "Welcome to Mindspace Premium! 🎉",
        "Your 14-day free trial has started. Enjoy unlimited access to all premium content!",
        [{ text: "Get Started", onPress: () => console.log("Navigate to premium content") }],
      )
    } catch (error) {
      setIsProcessing(false)
      Alert.alert("Error", "Something went wrong. Please try again.")
    }
  }

  const updatePaymentForm = (field: keyof PaymentForm, value: string): void => {
    setPaymentForm((prev) => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)

    if (!matches || matches.length === 0) {
      return v
    }

    const match = matches[0]
    const parts: string[] = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    return parts.join(" ")
  }

  const formatExpiryDate = (value: string): string => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
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
    const displayPrice = isAnnual ? `$${annualMonthlyPrice}/mo` : `$${monthlyPrice}/mo`
    const billedText = isAnnual ? `Billed annually ($${annualPrice})` : "Billed monthly"

    return (
      <TouchableOpacity
        key={plan}
        style={[styles.planCard, selected && styles.selectedPlanCard]}
        onPress={() => setSelectedPlan(plan)}
        activeOpacity={0.8}
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

        {isAnnual && (
          <Text style={styles.savingsText}>Save ${(monthlyPrice * 12 - annualPrice).toFixed(2)} per year</Text>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Modal visible={isOpen} animationType="slide" transparent>
      <KeyboardAvoidingView style={styles.overlay} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Ionicons name="diamond" size={24} color="#f97316" />
                <Text style={styles.modalTitle}>Upgrade to Premium</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Triggered Content */}
            {triggeredByContent && (
              <View style={styles.triggerCard}>
                <Text style={styles.triggerText}>
                  Get unlimited access to {triggeredByContent} and 1000+ more premium content
                </Text>
              </View>
            )}

            {/* Benefits */}
            <View style={styles.benefitsCard}>
              <View style={styles.benefitsHeader}>
                <Ionicons name="star" size={20} color="#f97316" />
                <Text style={styles.benefitsTitle}>What you get with Premium</Text>
              </View>
              {benefits.map(renderBenefit)}
            </View>

            {/* Plans */}
            <Text style={styles.sectionTitle}>Choose your plan</Text>
            <View style={styles.planRow}>{(["annual", "monthly"] as PlanType[]).map(renderPlanCard)}</View>

            {/* Trial Info */}
            <View style={styles.trialCard}>
              <View style={styles.trialHeader}>
                <Ionicons name="shield-checkmark" size={20} color="#3b82f6" />
                <Text style={styles.trialTitle}>14-day free trial</Text>
              </View>
              <Text style={styles.trialText}>
                Try Premium risk-free! Cancel anytime during your trial. After your trial, you will be billed{" "}
                {selectedPlan === "annual" ? "annually" : "monthly"}.
              </Text>
            </View>

            {/* Payment Form */}
            <View style={styles.paymentCard}>
              <Text style={styles.sectionTitle}>Payment Information</Text>

              <TextInput
                style={styles.input}
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={paymentForm.email}
                onChangeText={(value) => updatePaymentForm("email", value)}
              />

              <TextInput
                style={styles.input}
                placeholder="Card number"
                keyboardType="numeric"
                maxLength={19}
                value={paymentForm.cardNumber}
                onChangeText={(value) => updatePaymentForm("cardNumber", formatCardNumber(value))}
              />

              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={5}
                  value={paymentForm.expiryDate}
                  onChangeText={(value) => updatePaymentForm("expiryDate", formatExpiryDate(value))}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="CVC"
                  keyboardType="numeric"
                  maxLength={4}
                  value={paymentForm.cvc}
                  onChangeText={(value) => updatePaymentForm("cvc", value.replace(/[^0-9]/g, ""))}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Cardholder name"
                autoCapitalize="words"
                value={paymentForm.cardholderName}
                onChangeText={(value) => updatePaymentForm("cardholderName", value)}
              />
            </View>

            {/* Subscribe Button */}
            <TouchableOpacity
              onPress={handleSubscribe}
              disabled={isProcessing}
              style={[styles.subscribeBtn, isProcessing && styles.subscribeButtonDisabled]}
              activeOpacity={0.8}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <View style={styles.subscribeContent}>
                  <Ionicons name="card" size={18} color="#fff" />
                  <Text style={styles.subscribeText}>Start 14-day free trial</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By starting your trial, you agree to our Terms of Service and Privacy Policy. You can cancel anytime
              during your trial period.
            </Text>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "95%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  triggerCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fbbf24",
  },
  triggerText: {
    fontSize: 14,
    color: "#92400e",
    textAlign: "center",
    lineHeight: 20,
  },
  benefitsCard: {
    backgroundColor: "#f0fdf4",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  benefitsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginLeft: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#374151",
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 12,
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
    backgroundColor: "#fff",
    position: "relative",
  },
  selectedPlanCard: {
    borderColor: "#f97316",
    backgroundColor: "#fff7ed",
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
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f97316",
    marginBottom: 4,
  },
  planBilling: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 8,
  },
  savingsText: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "500",
  },
  trialCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  trialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e40af",
    marginLeft: 8,
  },
  trialText: {
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 20,
  },
  paymentCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 16,
    shadowColor: "#f97316",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  subscribeButtonDisabled: {
    backgroundColor: "#9ca3af",
  },
  subscribeContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  subscribeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  termsText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default SubscriptionModal