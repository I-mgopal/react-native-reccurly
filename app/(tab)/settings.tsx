import { Text, TouchableOpacity, View, Image, ScrollView, Alert } from 'react-native'
import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";

cssInterop(SafeAreaView, { className: "style" });

const Settings = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
      console.error(`Sign-out failed: ${err.message || 'unknown error'}`);
      Alert.alert("Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text className="text-3xl font-sans-bold text-primary mb-8 mt-2">Settings</Text>

        {/* User Profile Card */}
        {user && (
          <View className="border border-border rounded-3xl p-5 mb-8 flex-row items-center bg-card">
            <Image 
              source={{ uri: user.imageUrl }} 
              className="w-14 h-14 rounded-full mr-4 bg-muted"
            />
            <View className="flex-1">
              <Text className="font-sans-bold text-base text-primary">
                {user.fullName || user.firstName || 'User'}
              </Text>
              <Text className="font-sans text-sm text-muted-foreground mt-1">
                {user.primaryEmailAddress?.emailAddress || 'No email provided'}
              </Text>
            </View>
          </View>
        )}

        {/* Account Info Card */}
        {user && (
          <View className="border border-border rounded-3xl p-5 mb-8 bg-card">
            <Text className="font-sans-bold text-base text-primary mb-5">Account</Text>
            
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-sans text-sm text-muted-foreground">Account ID</Text>
              <Text className="font-sans text-sm text-primary">
                {user.id.substring(0, 21)}...
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="font-sans text-sm text-muted-foreground">Joined</Text>
              <Text className="font-sans text-sm text-primary">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '. ') + '.' : 'Unknown'}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity 
          onPress={handleSignOut}
          className="bg-accent py-4 rounded-2xl items-center"
        >
          <Text className="text-primary font-sans-bold text-base">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings