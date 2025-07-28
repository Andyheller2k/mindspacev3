"use client"

import { Ionicons } from "@expo/vector-icons"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  Alert,
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { width, height } = Dimensions.get("window")

interface WelcomeScreenProps {
  onCreateAccount?: () => void
  onLogin?: () => void
  onSkip?: () => void
}

// Custom Checkbox Component
interface CustomCheckboxProps {
  value: boolean
  onValueChange: (value: boolean) => void
  color?: string
  style?: any
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ value, onValueChange, color = "#4EA8FF", style }) => {
  return (
    <TouchableOpacity
      style={[styles.customCheckbox, value && { backgroundColor: color, borderColor: color }, style]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      {value && <Ionicons name="checkmark" size={14} color="#fff" />}
    </TouchableOpacity>
  )
}

// Custom Linear Gradient Component
interface CustomLinearGradientProps {
  colors: string[]
  style?: any
  children: React.ReactNode
}

const CustomLinearGradient: React.FC<CustomLinearGradientProps> = ({ colors, style, children }) => {
  // For simplicity, we'll use the first color as background
  // In a real app, you might want to use react-native-linear-gradient
  return <View style={[{ backgroundColor: colors[0] }, style]}>{children}</View>
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateAccount, onLogin, onSkip }) => {
  const [isChecked, setChecked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const ringRotation1 = useRef(new Animated.Value(0)).current
  const ringRotation2 = useRef(new Animated.Value(0)).current
  const ringRotation3 = useRef(new Animated.Value(0)).current
  const loadingDot1 = useRef(new Animated.Value(0.4)).current
  const loadingDot2 = useRef(new Animated.Value(0.4)).current
  const loadingDot3 = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start()

    // Continuous ring rotation
    const rotateRings = () => {
      Animated.parallel([
        Animated.timing(ringRotation1, {
          toValue: 1,
          duration: 8000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(ringRotation2, {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(ringRotation3, {
          toValue: 1,
          duration: 4000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => {
        ringRotation1.setValue(0)
        ringRotation2.setValue(0)
        ringRotation3.setValue(0)
        rotateRings()
      })
    }

    rotateRings()
  }, [])

  useEffect(() => {
    if (isLoading) {
      const animateLoadingDots = () => {
        Animated.sequence([
          Animated.timing(loadingDot1, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(loadingDot2, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(loadingDot3, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(loadingDot1, {
              toValue: 0.4,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(loadingDot2, {
              toValue: 0.4,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(loadingDot3, {
              toValue: 0.4,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          if (isLoading) animateLoadingDots()
        })
      }
      animateLoadingDots()
    }
  }, [isLoading])

  const handleTermsPress = async (url: string): Promise<void> => {
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Error", "Unable to open link")
      }
    } catch (error) {
      console.error("Error opening link:", error)
      Alert.alert("Error", "Unable to open link")
    }
  }

  const handleCreateAccount = (): void => {
    if (!isChecked) {
      Alert.alert("Terms Required", "Please accept the Terms & Conditions and Privacy Policy to continue.", [
        { text: "OK" },
      ])
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onCreateAccount?.()
      console.log("Navigate to create account")
    }, 2000)
  }

  const handleLogin = (): void => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin?.()
      console.log("Navigate to login")
    }, 1500)
  }

  const handleSkip = (): void => {
    Alert.alert("Skip Welcome?", "You can always create an account later from the settings.", [
      { text: "Cancel", style: "cancel" },
      { text: "Skip", onPress: onSkip },
    ])
  }

  const features = [
    {
      icon: "leaf-outline" as keyof typeof Ionicons.glyphMap,
      title: "1000+ Meditations",
      description: "Guided sessions for every moment",
      color: "#10b981",
    },
    {
      icon: "moon-outline" as keyof typeof Ionicons.glyphMap,
      title: "Sleep Stories",
      description: "Peaceful stories for better rest",
      color: "#8b5cf6",
    },
    {
      icon: "heart-outline" as keyof typeof Ionicons.glyphMap,
      title: "Mindful Living",
      description: "Tools for daily mindfulness",
      color: "#ef4444",
    },
  ]

  const renderFeature = (feature: (typeof features)[0], index: number) => (
    <Animated.View
      key={index}
      style={[
        styles.featureItem,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 50],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.featureIcon, { backgroundColor: feature.color + "20" }]}>
        <Ionicons name={feature.icon} size={24} color={feature.color} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </Animated.View>
  )

  const ring1Rotation = ringRotation1.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const ring2Rotation = ringRotation2.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  })

  const ring3Rotation = ringRotation3.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDB913" />

      {/* Skip Button */}
      {onSkip && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
          {/* Top Section with Custom Gradient */}
          <CustomLinearGradient colors={["#FDB913", "#FFD700"]} style={styles.topSection}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoCircle}>
                <Ionicons name="leaf" size={40} color="#0B0B36" />
              </View>
              <Text style={styles.logoText}>Mindspace</Text>
            </Animated.View>

            {/* Animated Illustration */}
            <Animated.View
              style={[
                styles.illustrationContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: fadeAnim }],
                },
              ]}
            >
              <View style={styles.illustrationCircle}>
                <Ionicons name="person-outline" size={80} color="#0B0B36" />
                <View style={styles.meditationRings}>
                  <Animated.View style={[styles.ring, styles.ring1, { transform: [{ rotate: ring1Rotation }] }]} />
                  <Animated.View style={[styles.ring, styles.ring2, { transform: [{ rotate: ring2Rotation }] }]} />
                  <Animated.View style={[styles.ring, styles.ring3, { transform: [{ rotate: ring3Rotation }] }]} />
                </View>
              </View>
            </Animated.View>
          </CustomLinearGradient>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.contentContainer}>
              {/* Welcome Text */}
              <Animated.View
                style={[
                  styles.welcomeContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <Text style={styles.title}>Welcome to Mindspace</Text>
                <Text style={styles.subtitle}>Your journey to mindfulness and inner peace starts here</Text>
              </Animated.View>

              {/* Features */}
              <View style={styles.featuresContainer}>{features.map(renderFeature)}</View>

              {/* Terms & Conditions */}
              <Animated.View
                style={[
                  styles.checkboxContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <CustomCheckbox value={isChecked} onValueChange={setChecked} color="#4EA8FF" style={styles.checkbox} />
                <View style={styles.termsTextContainer}>
                  <Text style={styles.termsText}>
                    I agree to Mindspace{" "}
                    <Text style={styles.link} onPress={() => handleTermsPress("https://www.mindspace.com/terms")}>
                      Terms & Conditions
                    </Text>{" "}
                    and acknowledge the{" "}
                    <Text
                      style={styles.link}
                      onPress={() => handleTermsPress("https://www.mindspace.com/privacy-policy")}
                    >
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                </View>
              </Animated.View>

              {/* Action Buttons */}
              <Animated.View
                style={[
                  styles.buttonContainer,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={[styles.createButton, (!isChecked || isLoading) && styles.buttonDisabled]}
                  onPress={handleCreateAccount}
                  disabled={!isChecked || isLoading}
                  activeOpacity={0.8}
                >
                  <CustomLinearGradient
                    colors={isChecked ? ["#4EA8FF", "#1E90FF"] : ["#666", "#555"]}
                    style={styles.buttonGradient}
                  >
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <Animated.View style={[styles.loadingDot, { opacity: loadingDot1 }]} />
                        <Animated.View style={[styles.loadingDot, { opacity: loadingDot2 }]} />
                        <Animated.View style={[styles.loadingDot, { opacity: loadingDot3 }]} />
                      </View>
                    ) : (
                      <View style={styles.buttonContent}>
                        <Ionicons name="person-add-outline" size={18} color="#fff" />
                        <Text style={styles.createButtonText}>Create an account</Text>
                      </View>
                    )}
                  </CustomLinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="log-in-outline" size={18} color="#4EA8FF" />
                    <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* Social Proof */}
              <Animated.View
                style={[
                  styles.socialProof,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons key={star} name="star" size={16} color="#FDB913" />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>4.9 • 50M+ downloads</Text>
                </View>
                <Text style={styles.socialProofText}>Join millions finding peace through mindfulness</Text>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDB913",
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  skipText: {
    color: "#0B0B36",
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    flexGrow: 1,
  },
  topSection: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
    minHeight: height * 0.45,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B0B36",
    letterSpacing: 1,
  },
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  meditationRings: {
    position: "absolute",
    width: 200,
    height: 200,
  },
  ring: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "rgba(11, 11, 54, 0.2)",
    borderRadius: 100,
  },
  ring1: {
    width: 160,
    height: 160,
    top: 20,
    left: 20,
  },
  ring2: {
    width: 120,
    height: 120,
    top: 40,
    left: 40,
  },
  ring3: {
    width: 80,
    height: 80,
    top: 60,
    left: 60,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#0B0B36",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    minHeight: height * 0.55,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#a0a0a0",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: "#a0a0a0",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  customCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkbox: {
    marginTop: 2,
  },
  termsTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  termsText: {
    color: "#a0a0a0",
    fontSize: 13,
    lineHeight: 18,
  },
  link: {
    color: "#4EA8FF",
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginBottom: 24,
  },
  createButton: {
    borderRadius: 25,
    marginBottom: 16,
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#2C2C5A",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#4EA8FF",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 2,
  },
  socialProof: {
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#2C2C5A",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    color: "#a0a0a0",
    fontSize: 14,
    fontWeight: "500",
  },
  socialProofText: {
    color: "#666",
    fontSize: 12,
    textAlign: "center",
  },
})

export default WelcomeScreen