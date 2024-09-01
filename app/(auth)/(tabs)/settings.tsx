import CustomButton from "@/components/Button";
import { Vstack } from "@/components/Vstack";
import { useAuth } from "@/context/AuthContext";


export default function SettingsScreens() {
    const { logout } = useAuth()
    return (
        <Vstack flex={1} m={20}>
            <CustomButton onPress={logout}>Logout</CustomButton>
        </Vstack>
    )
}