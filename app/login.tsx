import CustomButton from "@/components/Button";
import { Divider } from "@/components/Divider";
import { Hstack } from "@/components/HStack";
import CustomInput from "@/components/Input";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import { Vstack } from "@/components/Vstack";
import { useAuth } from "@/context/AuthContext";
import { AuthCredentials, RegisterCredentials } from "@/services/user";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

export default function Login() {
    const { authenticate, isLoadingAuth } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [authMode, setAuthMode] = useState<"login" | "register">("login");
    async function onAuthenticate() {
        if (authMode === "login") {
            const credentials: AuthCredentials = { email, password };
            await authenticate("login", credentials);
        } else {
            const credentials: RegisterCredentials = { email, password, firstname, lastname };
            await authenticate("register", credentials);
        }
    }
    const onToggleAuthMode = () => {
        setAuthMode(authMode === "login" ? "register" : "login");
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <Vstack flex={1} justifyContent="center" alignItems="center" p={40} gap={40}>
                    <Hstack gap={10}>
                        <Text fontSize={30} bold mb={20}>Ticket Booking</Text>
                        <TabBarIcon name="ticket" size={50} />
                    </Hstack>
                    <Vstack w={"100%"} gap={30}>
                        {authMode && authMode === "register" && <Vstack gap={5}>
                            <Text ml={10} fontSize={14} color="gray">First Name</Text>
                            <CustomInput value={firstname} h={48} p={14} autoCapitalize="none" autoCorrect={false} placeholderTextColor={"darkgrey"} onChangeText={setFirstname} placeholder="first Name" />
                        </Vstack> }
                        {authMode && authMode === "register" &&
                        <Vstack gap={5}>
                            <Text ml={10} fontSize={14} color="gray">Last Name</Text>
                            <CustomInput  value={lastname} h={48} p={14} autoCapitalize="none" autoCorrect={false} placeholderTextColor={"darkgrey"} onChangeText={setLastname} placeholder="Last Name" />
                        </Vstack>}
                        <Vstack gap={5}>
                            <Text ml={10} fontSize={14} color="gray">Email</Text>
                            <CustomInput value={email} h={48} p={14} autoCapitalize="none" autoCorrect={false} placeholderTextColor={"darkgrey"} onChangeText={setEmail} placeholder="Email" />
                        </Vstack>
                        <Vstack gap={5}>
                            <Text ml={10} fontSize={14} color="gray">Password</Text>
                            <CustomInput secureTextEntry value={password} h={48} p={14} autoCapitalize="none" autoCorrect={false} placeholderTextColor={"darkgrey"} onChangeText={setPassword} placeholder="Password" />
                        </Vstack>
                        <CustomButton onPress={() => onAuthenticate()} variant="contained" isLoading={isLoadingAuth}>{authMode === 'login' ? 'Login' : 'Register'}</CustomButton>
                    </Vstack>
                    <Divider w={'90%'} />
                    <Text onPress={onToggleAuthMode} fontSize={16} underline>
                        {authMode === 'login' ? 'Create an account' : 'Login to account'}
                    </Text>
                </Vstack>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
