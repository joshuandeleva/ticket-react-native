import { Hstack } from "@/components/HStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { useAuth } from "@/context/AuthContext";
import { ticketService } from "@/services/ticket";
import { Ticket } from "@/types/ticket";
import { UserRole } from "@/types/user";
import { useFocusEffect } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Touchable, TouchableOpacity } from "react-native";

export default function TicketScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const { user } = useAuth();

    function onGoToTicketPage(id: number) {
        router.push({
            pathname: `/(tickets)/ticket/[id]`,
            params: {
                id: id,
            },
        });
    }
    function onGoToCreateTicketPage() {
        router.push(`/(tickets)/new`);
    }
    const fetchTickets = async () => {
        setIsLoading(true);
        try {
            const response = await ticketService.getAll();
            setTickets(response?.data);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch tickets");
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchTickets();
    }, []));

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Tickets",
        })
    }, [navigation])

    return (
        <Vstack flex={1} p={20} pb={0} gap={20}>
            <Hstack alignItems="center" justifyContent="space-between">
                <Text fontSize={18} bold>{tickets.length}</Text>
            </Hstack>
            <FlatList
                keyExtractor={({ id }) => id.toString()}
                data={tickets}
                onRefresh={fetchTickets}
                refreshing={isLoading}
                renderItem={({ item: ticket }) => (
                    <TouchableOpacity disabled={ticket.entered} onPress={() => onGoToTicketPage(ticket.id)}>
                        <Vstack
                            gap={20}
                            h={120}
                            key={ticket.id}
                            style={{ opacity: ticket.entered ? 0.5 : 1 }}
                        >
                            <Hstack>
                                <Vstack
                                    h={120}
                                    w={"69%"}
                                    p={20}
                                    justifyContent="space-between"
                                    style={{
                                        backgroundColor: "white",
                                        borderTopLeftRadius: 20,
                                        borderBottomLeftRadius: 20,
                                        borderTopRightRadius: 5,
                                        borderBottomRightRadius: 5
                                    }}
                                >
                                    <Hstack alignItems="center">
                                        <Text fontSize={22} bold>{ticket.event.name}</Text>
                                        <Text fontSize={22} bold> | </Text>
                                        <Text fontSize={16} bold>{ticket.event.location}</Text>
                                    </Hstack>
                                    <Text fontSize={12}>{new Date(ticket.event.date).toLocaleString()}</Text>
                                </Vstack>
                                <Vstack
                                    h={110}
                                    w={"1%"}
                                    style={{
                                        alignSelf: "center",
                                        borderColor: "lightgray",
                                        borderWidth: 2,
                                        borderStyle: 'dashed',
                                    }}
                                />

                                <Vstack
                                    h={120}
                                    w={"29%"}
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{
                                        backgroundColor: "white",
                                        borderTopRightRadius: 20,
                                        borderBottomRightRadius: 20,
                                        borderTopLeftRadius: 5,
                                        borderBottomLeftRadius: 5,
                                    }}
                                >
                                    <Text fontSize={16} bold>{ticket.entered ? "Used" : "Available"}</Text>
                                    {ticket.entered &&
                                        <Text mt={12} fontSize={10}>{new Date(ticket.updatedAt).toLocaleString()}</Text>
                                    }
                                </Vstack>
                            </Hstack>
                        </Vstack>
                    </TouchableOpacity>
                )}

                ItemSeparatorComponent={() => <Vstack h={20} />}
            />
        </Vstack>

    )
}


const headerRight = () => {
    return (
        <TabBarIcon
            onPress={() => router.push("/(events)/new")}
            name="add-circle-outline"
            size={32}
        />
    )
}