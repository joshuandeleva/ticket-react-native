import { useNavigation } from "expo-router";
import { useEffect } from "react";

export function useOnscreenLister(eventType: "focus" | "blur" | "state" | "beforeRemove", cb: VoidFunction) {
    const navigation = useNavigation()
    useEffect(() => {
        const subscription = navigation.addListener(eventType, cb)
        return subscription
    }, [navigation, cb, eventType])

}