import CustomButton from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import CustomInput from "@/components/Input";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { useOnscreenLister } from "@/hooks/useOnscreenListener";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

export default function EventDetailsScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [eventData, setEventData] = useState<Event | null>(null);

    //onchange
    function updateField(field: keyof Event, value: string | Date) {
        setEventData((prev) => ({
            ...prev!,
            [field]: value,
        }));
    }

    // event details
    const fetchEventDetails = async () => {
        try {
            setIsSubmitting(true);
            const response = await eventService.getOne(Number(id))
            setEventData(response?.data);
        } catch (error) {
            console.error(error);
            router.back();
        } finally {
            setIsSubmitting(false);
        }
    };

    // delete event

    const onDelete = useCallback(async () => {
        if (!eventData) return
        try {
            Alert.alert("Are you sure you want to delete this event?", "", [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        setIsSubmitting(true);
                        await eventService.deleteOne(Number(id))
                        Alert.alert("Success", "Event deleted successfully");
                        router.back();
                    },
                },
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }, [eventData, id]);

    useFocusEffect(useCallback(() => {
        fetchEventDetails();
    }, [id]));

    // onscreen lister for fetching event

   // useOnscreenLister('focus', fetchEventDetails)

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => headerRight(onDelete)
        })
    }, []);


    // update event

    const onUpdate = useCallback(async () => {
        if (!eventData) return
        try {
            setIsSubmitting(true);
            await eventService.updateOne(Number(id),
                eventData.name,
                eventData.location,
                eventData.date,
            )
            Alert.alert("Success", "Event updated successfully");
            router.back();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }, [eventData, id]);

    return (
        <Vstack m={20} gap={30} flex={1}>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Name</Text>
                <CustomInput h={48} p={14} placeholder="Name" placeholderTextColor={"darkgray"} value={eventData?.name} onChangeText={(value) => updateField("name", value)} />
            </Vstack>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Location</Text>
                <CustomInput h={48} p={14} placeholder="Location" placeholderTextColor={"darkgray"} value={eventData?.location} onChangeText={(value) => updateField("location", value)} />
            </Vstack>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Date</Text>
                <DateTimePicker
                    onChange={(date) => updateField('date', date || new Date())}
                    currentDate={new Date(eventData?.date || new Date())}
                />
            </Vstack>
            <CustomButton disabled={isSubmitting} onPress={() => onUpdate()} mt={"auto"} isLoading={isSubmitting}>Save Changes</CustomButton>
        </Vstack>
    )

}


const headerRight = (onPress: VoidFunction) => {
    return (
        <TabBarIcon name="trash" size={34} onPress={onPress} />
    )
}