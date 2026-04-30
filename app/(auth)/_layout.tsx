import "@/global.css";
import { Stack, Redirect } from "expo-router";
import { useAuth } from '@clerk/clerk-expo'

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  
  if (isSignedIn) {
    return <Redirect href="/(tab)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
