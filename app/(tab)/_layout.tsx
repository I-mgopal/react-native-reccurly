import { Tabs, Redirect } from "expo-router";
import {tabs} from '@/constant/data'
import { View, Image } from "react-native";
import { colors, components } from '@/constant/theme'
import clsx from "clsx";
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'


const tabBar = components.tabBar;
const TabLayout = () => 
{
    const { isSignedIn } = useAuth();
    const ICON_VERTICAL_ADJUSTMENT = 1.6;
    const insets = useSafeAreaInsets();

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    const TabBarIcon = ({focused, icon}: TabIconProps) => {
        return(
            <View className="tabs-icon">
                <View className={clsx('tabs-pill', focused && 'tabs-active')}>
                    <Image source={icon} className="tabs-glyph" resizeMode="contain"/>
                </View>
            </View>
        )
    }
    return(
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                height: tabBar.height,
                marginHorizontal: tabBar.horizontalInset,
                borderRadius: tabBar.radius,
                backgroundColor: colors.primary,
                borderTopWidth: 0,
                elevation: 0,
                shadowOpacity: 0,
                
            },
            tabBarItemStyle: {
                paddingVertical: tabBar.height / 2 - tabBar.iconFrame / ICON_VERTICAL_ADJUSTMENT,
                height: tabBar.height,
            },
            tabBarIconStyle: {
                width: tabBar.iconFrame,
                height: tabBar.iconFrame,
                alignItems: 'center',
            },

        }}>
           {
            tabs.map((tab) => (
                <Tabs.Screen 
                key={tab.name} 
                name={tab.name} 
                options={{
                    title : tab.title,
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon focused={focused} icon={tab.icon} />
                    )
                }} />
            ))
           }
        </Tabs>
    )
}

export default TabLayout