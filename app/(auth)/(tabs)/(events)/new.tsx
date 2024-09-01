import CustomButton from "@/components/Button"
import DateTimePicker from "@/components/DateTimePicker"
import CustomInput from "@/components/Input"
import Text from "@/components/Text"
import { Vstack } from "@/components/Vstack"
import { eventService } from "@/services/event"
import { router, useNavigation } from "expo-router"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export default function NewEvent() {
    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [date, setDate] = useState(new Date())
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    function onChangeDate(date?: Date) {
        setDate(date || new Date());
      }

    const navigation = useNavigation()

    async function onSubmit() {
        setIsSubmitting(true)
        try {
            await eventService.createOne(name, location, date.toISOString())
            Alert.alert("Success", "Event created successfully")
            router.back()
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to  create event")
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        navigation.setOptions({ headerTitle: "New Event" })
    }, [])

    return (
        <Vstack m={20} gap={30} flex={1}>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Name</Text>
                <CustomInput h={48} p={14} placeholder="Name" placeholderTextColor={"darkgray"} value={name} onChangeText={setName} />
            </Vstack>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Location</Text>
                <CustomInput h={48} p={14} placeholder="Location" placeholderTextColor={"darkgray"} value={location} onChangeText={setLocation} />
            </Vstack>
            <Vstack gap={5}>
                <Text ml={10} fontSize={16} color="gray">Date</Text>
                <DateTimePicker
                    currentDate={date}
                    onChange={onChangeDate}

                />

            </Vstack>
            <CustomButton disabled={isSubmitting} onPress={() => onSubmit()} mt={"auto"} isLoading={isSubmitting}>Create Event</CustomButton>
        </Vstack>
    )
}