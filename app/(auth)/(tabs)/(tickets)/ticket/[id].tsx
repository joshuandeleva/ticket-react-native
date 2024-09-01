import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { useAuth } from "@/context/AuthContext";
import { ticketService } from "@/services/ticket";
import { Ticket } from "@/types/ticket";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Image } from "react-native";

export default function TicketDetailsScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const { user } = useAuth();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [qrCode, setQrcode] = useState<string | null>(null);


    const fetchTicketDetails = async () => {
        setIsLoading(true);
        try {
            const { data } = await ticketService.getOne(Number(id));
            setTicket(data?.ticket);
            setQrcode(data?.qrcode);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch ticket");
            router.back()
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchTicketDetails();
    }, []));

    useEffect(() => {
        navigation.setOptions({ headerTitle: "" });
      }, [navigation]);
    
      if (!ticket) return null;

    return (
        <Vstack
            alignItems="center"
            m={20}
            p={20}
            gap={20}
            flex={1}
            style={{
                backgroundColor: "white",
                borderRadius: 20
            }}
        >
            <Text fontSize={50} bold>{ticket?.event.name}</Text>
            <Text fontSize={20} bold>{ticket?.event.location}</Text>
            <Text fontSize={16} color="gray">{ticket?.event.date ? new Date(ticket.event.date).toLocaleString() : ''}</Text>

            <Image
                style={{ borderRadius: 20 }}
                width={300}
                height={300}
                source={{ uri: `data:image/png;base64,${qrCode}` }}
            />
        </Vstack>
    )
}