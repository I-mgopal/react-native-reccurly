import {View, Text, Image} from "react-native";
import {icons} from "@/constant/icons";
import {cssInterop} from "nativewind";
import {formatCurrency} from "@/lib/utils"


export default function UpcomingSubscriptionCard({  name, price, daysLeft, icon, currency}:UpcomingSubscription) {
    return (
        <View className="upcoming-card">
            <View className="upcoming-row">
                <Image source={icon} className="upcoming-icon"/>
                <View>
                    <Text className="upcoming-price">{formatCurrency(price,currency)}</Text>
                    <Text className="upcoming-meta" numberOfLines={1}>{daysLeft > 1 ? `${daysLeft} days` : "Due today"}</Text>
                </View>
            </View>
            <Text className="upcoming-name" numberOfLines={1}>{name}</Text>
        </View>
    );
}