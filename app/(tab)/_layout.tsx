import { Tabs } from "expo-router";
import {tabs} from '@/constant/data'
import { View } from "react-native";
import {colors, components} from '@/constant/theme'
import clsx from "clsx";
import { Image } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context'


const tabBar = components.tabBar;
const TabLayout = () => 
{
    const insets = useSafeAreaInsets();
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
                paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
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