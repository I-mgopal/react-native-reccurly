import {View, Text, TouchableOpacity} from "react-native";


type ListHeadingProps = {
  title: string;
  onPressViewAll?: () => void;
};

export default function ListHeading({title, onPressViewAll}:ListHeadingProps) {
    return (
        <View className="list-head">
            <Text className="list-title">{title}</Text>
            
             <TouchableOpacity
                className="list-action"
                onPress={onPressViewAll}
                accessibilityRole="button"
                accessibilityLabel="View all items"
            > 
                <Text className="list-action-text">View All</Text>
            </TouchableOpacity>
        </View>
    );
}