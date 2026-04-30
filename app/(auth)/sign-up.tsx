import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from "expo-router";
import { useSignUp } from '@clerk/clerk-expo';

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter an email and a secure password.");
      return;
    }

    setLoading(true);
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Error", "Please enter the 6-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(tab)');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View className="flex-1 px-6 pt-20">
            {/* Logo Section */}
            <View className="flex-row items-center justify-center">
              <View className="w-12 h-12 bg-accent rounded-tr-[24px] rounded-bl-[24px] rounded-tl-none rounded-br-none items-center justify-center mr-3 shadow-sm">
                <Text className="text-white font-sans-bold text-2xl">R</Text>
              </View>
              <View>
                <Text className="text-foreground font-sans-bold text-xl">Recurly</Text>
                <Text className="text-muted-foreground font-sans-medium text-[9px] tracking-widest mt-0.5">SMART BILLING</Text>
              </View>
            </View>

            {/* Header Text */}
            <View className="mt-12 items-center">
              <Text className="text-foreground font-sans-bold text-2xl">
                {pendingVerification ? "Check your email" : "Create an account"}
              </Text>
              <Text className="text-muted-foreground font-sans-regular text-sm mt-2 text-center px-4">
                {pendingVerification 
                  ? "We've sent a verification code to your email address." 
                  : "Join Recurly to start managing your subscriptions"}
              </Text>
            </View>

            {/* Form Card */}
            <View className="bg-card border border-border rounded-[24px] p-6 mt-8">
              
              {!pendingVerification ? (
                <>
                  <View className="mb-4">
                    <Text className="text-foreground font-sans-semibold text-xs mb-2 ml-1">Email</Text>
                    <TextInput
                      className="h-14 border border-border rounded-xl px-4 font-sans-regular text-foreground bg-transparent"
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      value={emailAddress}
                      onChangeText={setEmailAddress}
                    />
                  </View>

                  <View className="mb-6">
                    <Text className="text-foreground font-sans-semibold text-xs mb-2 ml-1">Password</Text>
                    <TextInput
                      className="h-14 border border-border rounded-xl px-4 font-sans-regular text-foreground bg-transparent"
                      placeholder="Enter a strong password"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>

                  <TouchableOpacity
                    className="h-14 bg-accent rounded-xl items-center justify-center shadow-sm"
                    onPress={onSignUpPress}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white font-sans-semibold text-base">
                      {loading ? "Creating account..." : "Sign up"}
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center mt-6">
                    <Text className="text-muted-foreground font-sans-regular text-xs">
                      Already have an account?{' '}
                    </Text>
                    <Link href="/(auth)/sign-in" asChild>
                      <TouchableOpacity>
                        <Text className="text-accent font-sans-semibold text-xs">
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                </>
              ) : (
                <>
                  <View className="mb-6">
                    <Text className="text-foreground font-sans-semibold text-xs mb-2 ml-1">Verification Code</Text>
                    <TextInput
                      className="h-14 border border-border rounded-xl px-4 font-sans-regular text-foreground bg-transparent"
                      placeholder="Enter 6-digit code"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      keyboardType="number-pad"
                      value={code}
                      onChangeText={setCode}
                    />
                  </View>

                  <TouchableOpacity
                    className="h-14 bg-accent rounded-xl items-center justify-center shadow-sm"
                    onPress={onPressVerify}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white font-sans-semibold text-base">
                      {loading ? "Verifying..." : "Verify email"}
                    </Text>
                  </TouchableOpacity>
                </>
              )}

            </View>
            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}