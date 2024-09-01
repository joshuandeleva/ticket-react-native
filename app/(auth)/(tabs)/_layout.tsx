import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ComponentProps } from "react";
import { Text } from "react-native";
export  default function TabLayout(){
    const {user} = useAuth();
    const tabs = [
        {
           showFor:[UserRole.Attendee , UserRole.Manager],
           name:"(events)",
           displayName:"Events",
           icons:"calendar",
           options:{
            headerShown: false,
           }
        },
        {
            showFor:[UserRole.Attendee , UserRole.Manager],
            name:"(tickets)",
            displayName:"Tickets",
            icons:"ticket",
            options:{
             headerShown: false,
            }
         },
         {
            showFor:[UserRole.Manager , UserRole.Attendee],
            name:"scan-ticket",
            displayName:"Scan Ticket",
            icons:"scan",
            options:{
             headerShown: true,
        
            }
         },
         {
            showFor:[UserRole.Attendee , UserRole.Manager],
            name:"settings",
            displayName:"Settings",
            icons:"settings",
            options:{
             headerShown: true,
            }
         },
    ]
    return(
        <Tabs>
            {tabs?.map((tab) => (
                <Tabs.Screen key={tab.name} name={tab.name} 
                options={{
                    ...tab.options,
                    headerTitle: tab.displayName, 
                    href: tab.showFor.includes(user?.role!) ? (tab.name as any) : null,
                    tabBarIcon: ({focused}) => (
                       <TabBarIcon name={tab.icons as ComponentProps<typeof Ionicons>["name"]} color={focused ? "blue" : "black"} size={24} />
                    ),
                    tabBarLabel: ({focused}) => (
                        <Text style={{color: focused ? "blue" : "black", fontSize: 12}}>{tab.displayName}</Text>
                    ),
                    // href: tab.showFor.includes(tab.name) ? tab.name : null
                }} />
            ))}

        </Tabs>
    )
}