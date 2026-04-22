import { Text, View } from 'react-native'
import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
cssInterop(SafeAreaView, { className: "style" });
const Subscription = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text>Subscription</Text>
    </SafeAreaView>
  )
}

export default Subscription