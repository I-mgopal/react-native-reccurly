import { Text,View,Image } from "react-native";
import {Link} from "expo-router";
import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constant/images";
import { HOME_USER, HOME_BALANCE } from "@/constant/data";
import {icons} from "@/constant/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs from 'dayjs';
import ListHeading from "@/components/listheading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import {UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS} from "@/constant/data";
import { FlatList } from "react-native";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";

cssInterop(SafeAreaView, { className: "style" });
cssInterop(Link, { className: "style" });

export default function App() {
  const [expanded, setExpanded] = useState<string|null>(null);
  return (
    

<SafeAreaView className="flex-1 bg-background p-5">
  <View className="flex-1">
  <FlatList

  ListHeaderComponent={
    <>
      {/* Header Section */}
  <View className="home-header">
    <View className="home-user">
      <Image source={images.avatar} className="home-avatar" />
      <Text className="home-user-name">Gopal | SWE</Text>
    </View>
    {/* Optional: Add your add-icon here if needed */}
    <Image source={icons.add} className="home-add-icon" />
  </View>

  {/* Balance Card Section (OUTSIDE the header) */}
  <View className="home-balance-card">
    <Text className="home-balance-label">Balance</Text>
    <View className="home-balance-row">
      <Text className="home-balance-amount">
        {formatCurrency(HOME_BALANCE.amount)}
      </Text>
      <Text className="home-balance-date">
        {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
      </Text>
    </View>
  </View>

  {/* Horizontal Scaling List */}
  <View>
  <ListHeading title="Upcoming" />
  <FlatList
  data={UPCOMING_SUBSCRIPTIONS}
  renderItem={({ item }) => (
    <UpcomingSubscriptionCard  { ... item} />
  )}
  keyExtractor={(item) => item.id}
  horizontal
  showsHorizontalScrollIndicator={false}
  ListEmptyComponent={<Text className="home-empty-state">No Upcoming Subscription</Text>}
  />

  </View>

  <View className="mb-4"/>
  <ListHeading title="All Subscription" />

    </>
  }
  data={HOME_SUBSCRIPTIONS}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => (
    <SubscriptionCard {...item} expanded={expanded === item.id}
    onPress={() => {
      setExpanded((currentId) => currentId === item.id ? null : item.id);
    }}
    />
  )}
  extraData={expanded}
   ItemSeparatorComponent={() => <View className="h-4" />}
   ListEmptyComponent={<Text className="home-empty-state">No Subscriptions yet.</Text>}
   contentContainerClassName="pb-20"
  />
  </View>


</SafeAreaView>

  );
}