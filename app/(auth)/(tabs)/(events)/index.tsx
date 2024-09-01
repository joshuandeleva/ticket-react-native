import CustomButton from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Hstack } from "@/components/HStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { useAuth } from "@/context/AuthContext";
import { useOnscreenLister } from "@/hooks/useOnscreenListener";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { UserRole } from "@/types/user";
import { useFocusEffect } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";

export default function EventsScreen() {
    const {user} = useAuth()
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setisLoading] = useState<boolean>(false)
    const navigation = useNavigation()
    const fetchEvents =async () => {
        setisLoading(true)
        try {
            const response = await eventService.getAll()
            setEvents(response.data)
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Something went wrong")
        } finally {
            setisLoading(false)
        }
    }

   // useOnscreenLister("focus" , fetchEvents)

   useFocusEffect(useCallback(() => {
    fetchEvents()
   }, []))

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Events",
            headerRight: user?.role === UserRole.Attendee ? headerRight : null
        })
    }, [navigation , user])

    const onGotToEventPage = (eventId: number) => {
        if(user?.role === UserRole.Attendee){
            router.push({
                pathname: "/(events)/event/[id]",
                params: {
                    id: eventId
                }
            })
        } else {

        }
    }

    const  buyTicket = (eventId: number) => {
        try{
            // buy ticket
            Alert.alert("Success", "Ticket purchased successfully")
        }catch(error){
            Alert.alert("Error","Failed to buy ticket")
        }finally{

        }
    }

    return (
        <Vstack flex={1} p={20} pb={0} gap={20}>
            <Hstack alignItems="center" justifyContent="center">
                <Text fontSize={18} bold>{events?.length} Events</Text>
            </Hstack>
            <FlatList
                data={events}
                keyExtractor={({ id }) => id.toString()}
                onRefresh={fetchEvents}
                refreshing={isLoading}
                ItemSeparatorComponent={() => <Vstack h={20} />}
                renderItem={({ item: event }) => (
                    <Vstack key={event.id} p={20} gap={20} style={{ backgroundColor: "#fff", borderRadius: 20 }}>
                        <TouchableOpacity onPress={() => onGotToEventPage(event.id)}>
                            <Hstack alignItems="center" justifyContent="space-between">
                                <Hstack alignItems="center">
                                    <Text fontSize={16} bold>{event.name}</Text>
                                    <Text fontSize={26} bold> | </Text>
                                    <Text fontSize={16} bold>{event.location}</Text>
                                </Hstack>
                                {user?.role === UserRole.Attendee && <TabBarIcon name="chevron-forward" size={20} />}
                            </Hstack>
                        </TouchableOpacity>
                        <Divider/>
                        <Hstack alignItems="center" justifyContent="space-between">
                            <Text fontSize={16} color="gray" bold>Sold :{event.totalTicketsPurchased}</Text>
                            <Text fontSize={16} color="green" bold>Entered :{event.totalTicketsEntered}</Text>
                        </Hstack>
                        {user?.role === UserRole.Attendee && (
                            <Vstack>
                                <CustomButton onPress={() => buyTicket(event.id)} disabled={isLoading} variant="outlined">Buy Ticket</CustomButton>
                            </Vstack>
                        )}
                        <Text fontSize={16} color="gray" bold>Date :{event.createdAt}</Text>
                    </Vstack>
                )}
            />
        </Vstack>
    )
}


const headerRight = () => {
    return (
       <TabBarIcon
             onPress={() =>router.push("/(events)/new")}
             name="add-circle-outline"
             size={32}
         />
    )
}